#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = (process.env.CHAIRRADAR_SITE_URL ?? "https://chairradar.com").replace(/\/$/, "");
const MAX_SITEMAP_PAGES_TO_CRAWL = Number(process.env.SEO_CHECK_MAX_PAGES ?? 25);

const legacyOutboundUrls = [
  `${SITE_URL}/api/outbound?shopId=hudson-salon-huntersville&action=call_shop&source=local_haircuts_inline_phone`
];

const seedPublicUrls = [
  `${SITE_URL}/`,
  `${SITE_URL}/locations`,
  `${SITE_URL}/nc`,
  `${SITE_URL}/search`,
  `${SITE_URL}/haircuts/huntersville-nc`,
  `${SITE_URL}/haircuts/raleigh-nc`,
  `${SITE_URL}/haircuts/charlotte-nc`,
  `${SITE_URL}/shop/hudson-salon-huntersville-huntersville-nc`
];

const allowedLegacyStatuses = new Set([400, 404, 405, 410]);
const scanTargets = ["app", "components", "data", "lib", "README.md"];
const ignoredDirs = new Set([".git", ".next", "node_modules"]);
const codePatterns = [
  "/api/outbound",
  "/api/outbound?",
  'href="/api/outbound',
  "href={'/api/outbound",
  "href={`/api/outbound",
  "action=call_shop",
  "action=visit_website"
];

const checks = [];
const warnings = [];
const safeCodeReferences = [];
const testedUrls = new Set();

function pass(name, details = "") {
  checks.push({ ok: true, name, details });
}

function fail(name, details = "") {
  checks.push({ ok: false, name, details });
}

function warn(message) {
  warnings.push(message);
}

function normalizePublicUrl(value) {
  const url = new URL(value, SITE_URL);
  url.hash = "";
  url.search = "";

  const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
  return `${url.origin}${pathname}`;
}

function isPublicCanonicalUrl(value) {
  try {
    const url = new URL(value);

    if (url.origin !== SITE_URL) {
      return false;
    }

    if (url.pathname.startsWith("/api/")) {
      return false;
    }

    if (url.search || url.hash) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

async function fetchText(url, options = {}) {
  testedUrls.add(url);

  const response = await fetch(url, {
    redirect: "manual",
    headers: {
      "User-Agent": "ChairRadar SEO health check"
    },
    ...options
  });

  const text = await response.text();

  return {
    response,
    text
  };
}

function getHeader(response, name) {
  return response.headers.get(name) ?? response.headers.get(name.toLowerCase()) ?? "";
}

function parseSitemapUrls(xml) {
  return Array.from(xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi), (match) => match[1].trim());
}

function extractCanonical(html) {
  const relFirst = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  const hrefFirst = html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);

  return relFirst?.[1] ?? hrefFirst?.[1] ?? null;
}

function hasPublicNoindex(html, response) {
  const robotsHeader = getHeader(response, "x-robots-tag").toLowerCase();
  const metaNoindex = /<meta\b[^>]*(?:name|property)=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);

  return robotsHeader.includes("noindex") || metaNoindex;
}

function extractAnchorHrefs(html) {
  return Array.from(html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi), (match) => match[1]);
}

async function validateRobots() {
  const url = `${SITE_URL}/robots.txt`;
  const { response, text } = await fetchText(url);

  if (response.status === 200) {
    pass("robots.txt returns 200", url);
  } else {
    fail("robots.txt returns 200", `${url} returned ${response.status}`);
    return;
  }

  if (/Disallow:\s*\/api\/?/i.test(text)) {
    pass("robots.txt disallows /api/", "Found Disallow: /api/");
  } else {
    fail("robots.txt disallows /api/", "Missing Disallow: /api/");
  }

  if (/Sitemap:\s*https:\/\/chairradar\.com\/sitemap\.xml/i.test(text)) {
    pass("robots.txt references sitemap.xml", `${SITE_URL}/sitemap.xml`);
  } else {
    warn("robots.txt did not include the expected https://chairradar.com/sitemap.xml line.");
  }
}

async function validateSitemap() {
  const url = `${SITE_URL}/sitemap.xml`;
  const { response, text } = await fetchText(url);

  if (response.status === 200) {
    pass("sitemap.xml returns 200", url);
  } else {
    fail("sitemap.xml returns 200", `${url} returned ${response.status}`);
    return [];
  }

  const urls = parseSitemapUrls(text);

  if (urls.length > 0) {
    pass("sitemap.xml contains URLs", `${urls.length} URLs found`);
  } else {
    fail("sitemap.xml contains URLs", "No <loc> entries found.");
  }

  const outboundUrls = urls.filter((item) => item.includes("/api/outbound"));
  const apiUrls = urls.filter((item) => new URL(item).pathname.startsWith("/api/"));
  const nonCanonicalUrls = urls.filter((item) => !isPublicCanonicalUrl(item));

  if (outboundUrls.length === 0) {
    pass("sitemap.xml contains no /api/outbound URLs");
  } else {
    fail("sitemap.xml contains no /api/outbound URLs", outboundUrls.join(", "));
  }

  if (apiUrls.length === 0) {
    pass("sitemap.xml contains no /api/ URLs");
  } else {
    fail("sitemap.xml contains no /api/ URLs", apiUrls.join(", "));
  }

  if (nonCanonicalUrls.length === 0) {
    pass("sitemap.xml contains only canonical public URLs");
  } else {
    fail("sitemap.xml contains only canonical public URLs", nonCanonicalUrls.join(", "));
  }

  return urls;
}

async function validateLegacyOutboundUrls() {
  for (const url of legacyOutboundUrls) {
    const { response } = await fetchText(url);
    const location = getHeader(response, "location");
    const robots = getHeader(response, "x-robots-tag").toLowerCase();
    const isRedirect = response.status >= 300 && response.status < 400;

    if (!isRedirect) {
      pass("legacy /api/outbound URL does not redirect", `${url} returned ${response.status}`);
    } else {
      fail("legacy /api/outbound URL does not redirect", `${url} redirected to ${location || "unknown"}`);
    }

    if (!location || (!location.startsWith("tel:") && !location.startsWith("http"))) {
      pass("legacy /api/outbound URL does not redirect to tel or vendor destination", url);
    } else {
      fail("legacy /api/outbound URL does not redirect to tel or vendor destination", `${url} -> ${location}`);
    }

    if (allowedLegacyStatuses.has(response.status)) {
      pass("legacy /api/outbound URL returns intentional non-indexable status", `${url} returned ${response.status}`);
    } else {
      fail("legacy /api/outbound URL returns intentional non-indexable status", `${url} returned ${response.status}`);
    }

    if (robots.includes("noindex") && robots.includes("nofollow")) {
      pass("legacy /api/outbound URL has X-Robots-Tag noindex, nofollow", url);
    } else {
      fail("legacy /api/outbound URL has X-Robots-Tag noindex, nofollow", `${url} header was "${robots || "missing"}"`);
    }
  }
}

async function validatePublicPage(url) {
  const { response, text } = await fetchText(url);
  const expectedCanonical = normalizePublicUrl(url);

  if (response.status === 200) {
    pass("public page returns 200", url);
  } else {
    fail("public page returns 200", `${url} returned ${response.status}`);
    return;
  }

  const anchors = extractAnchorHrefs(text);
  const crawlableOutboundAnchors = anchors.filter((href) => href.includes("/api/outbound"));

  if (crawlableOutboundAnchors.length === 0 && !text.includes("/api/outbound?")) {
    pass("public page does not expose crawlable /api/outbound links", url);
  } else {
    fail(
      "public page does not expose crawlable /api/outbound links",
      `${url} leaked ${crawlableOutboundAnchors.join(", ") || "/api/outbound? in HTML"}`
    );
  }

  const canonical = extractCanonical(text);

  if (!canonical) {
    fail("public page has canonical tag", `${url} missing canonical`);
  } else if (normalizePublicUrl(canonical) === expectedCanonical) {
    pass("public page canonical is self-referencing", `${url} -> ${canonical}`);
  } else {
    fail("public page canonical is self-referencing", `${url} canonical was ${canonical}; expected ${expectedCanonical}`);
  }

  if (!hasPublicNoindex(text, response)) {
    pass("public page is not noindex", url);
  } else {
    fail("public page is not noindex", `${url} contains noindex`);
  }
}

async function crawlPublicPages(sitemapUrls) {
  const urls = Array.from(
    new Set([
      ...seedPublicUrls,
      ...sitemapUrls.slice(0, MAX_SITEMAP_PAGES_TO_CRAWL)
    ].map(normalizePublicUrl))
  );

  for (const url of urls) {
    await validatePublicPage(url);
  }
}

async function walkFiles(targetPath) {
  const resolved = path.resolve(process.cwd(), targetPath);
  const entries = await readdir(resolved, { withFileTypes: true }).catch(() => null);

  if (!entries) {
    return [resolved];
  }

  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...await walkFiles(path.join(targetPath, entry.name)));
      }
      continue;
    }

    if (entry.isFile() && /\.(mjs|js|jsx|ts|tsx|md|json)$/.test(entry.name)) {
      files.push(path.join(resolved, entry.name));
    }
  }

  return files;
}

function classifyCodeHit(file, line) {
  const normalizedFile = file.replaceAll("\\", "/");

  if (normalizedFile.endsWith("lib/outboundClientTracking.ts") && line.includes('"/api/outbound"')) {
    return "safe background tracking endpoint";
  }

  if (normalizedFile.endsWith("README.md")) {
    return "safe documentation reference";
  }

  if (/<a\b|href=/.test(line)) {
    return "unsafe crawlable link candidate";
  }

  return "review";
}

async function validateCodebasePatterns() {
  const files = (await Promise.all(scanTargets.map(walkFiles))).flat();
  const hits = [];

  for (const file of files) {
    const content = await readFile(file, "utf8").catch(() => "");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      const matchedPatterns = codePatterns.filter((pattern) => line.includes(pattern));

      if (matchedPatterns.length > 0) {
        hits.push({
          file: path.relative(process.cwd(), file),
          line: index + 1,
          pattern: matchedPatterns.join(", "),
          classification: classifyCodeHit(file, line),
          text: line.trim()
        });
      }
    });
  }

  const unsafeHits = hits.filter((hit) => hit.classification === "unsafe crawlable link candidate");
  const reviewHits = hits.filter((hit) => hit.classification === "review");

  if (unsafeHits.length === 0) {
    pass("local codebase has no crawlable /api/outbound anchor links");
  } else {
    fail(
      "local codebase has no crawlable /api/outbound anchor links",
      unsafeHits.map((hit) => `${hit.file}:${hit.line} ${hit.text}`).join("\n")
    );
  }

  if (reviewHits.length === 0) {
    pass("local codebase outbound references are classified as safe");
  } else {
    warn(
      `Review remaining outbound pattern references:\n${reviewHits
        .map((hit) => `  - ${hit.file}:${hit.line} [${hit.pattern}] ${hit.text}`)
        .join("\n")}`
    );
  }

  hits
    .filter((hit) => hit.classification !== "unsafe crawlable link candidate" && hit.classification !== "review")
    .forEach((hit) => {
      safeCodeReferences.push(`${hit.file}:${hit.line} (${hit.classification})`);
    });
}

function printReport() {
  const failed = checks.filter((check) => !check.ok);
  const passed = checks.filter((check) => check.ok);

  console.log("\nChairRadar SEO Health Check");
  console.log("===========================");
  console.log(`Site: ${SITE_URL}`);
  console.log(`Result: ${failed.length === 0 ? "PASS" : "FAIL"}`);
  console.log(`Checks: ${passed.length} passed, ${failed.length} failed, ${warnings.length} warnings`);

  if (failed.length > 0) {
    console.log("\nFailed checks");
    failed.forEach((check) => {
      console.log(`- ${check.name}${check.details ? `: ${check.details}` : ""}`);
    });
  }

  if (warnings.length > 0) {
    console.log("\nWarnings");
    warnings.forEach((message) => {
      console.log(`- ${message}`);
    });
  }

  if (safeCodeReferences.length > 0) {
    console.log("\nSafe code references");
    safeCodeReferences.forEach((message) => {
      console.log(`- ${message}`);
    });
  }

  console.log("\nURLs tested");
  Array.from(testedUrls).forEach((url) => {
    console.log(`- ${url}`);
  });

  console.log("\nRecommended next action");
  if (failed.length === 0) {
    console.log("- No code action needed. In Google Search Console, use Validate Fix for the old /api/outbound redirect-error issue and let recrawl finish.");
  } else {
    console.log("- Fix the failed checks above before using Validate Fix in Google Search Console.");
  }

  process.exitCode = failed.length === 0 ? 0 : 1;
}

async function main() {
  try {
    await validateRobots();
    const sitemapUrls = await validateSitemap();
    await validateLegacyOutboundUrls();
    await crawlPublicPages(sitemapUrls);
    await validateCodebasePatterns();
  } catch (error) {
    fail("seo health check crashed", error instanceof Error ? error.stack ?? error.message : String(error));
  } finally {
    printReport();
  }
}

await main();
