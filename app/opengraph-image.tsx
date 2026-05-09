import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fff8ef",
          color: "#241811",
          padding: "72px",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px"
          }}
        >
          <div
            style={{
              width: "92px",
              height: "92px",
              borderRadius: "28px",
              background: "#241811",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: 800
            }}
          >
            CR
          </div>
          <div style={{ fontSize: "44px", fontWeight: 800 }}>ChairRadar</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.02 }}>
            Find a haircut near you fast.
          </div>
          <div style={{ marginTop: "28px", maxWidth: "920px", color: "#6f6257", fontSize: "30px", lineHeight: 1.35 }}>
            Barbershops, salons, walk-ins, same-day options, booking links, phone numbers, hours, and directions.
          </div>
        </div>
        <div style={{ color: "#bf5a2a", fontSize: "28px", fontWeight: 700 }}>
          chairradar.com
        </div>
      </div>
    ),
    size
  );
}
