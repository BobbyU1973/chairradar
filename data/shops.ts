export type Shop = {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  distance: string;
  availabilitySummary: string;
  priceFrom: number | null;
  rating: number | null;
  reviewCount: number | null;
  specialties: string[];
  openNow: boolean;
  walkInsAvailable: boolean;
  hoursSummary: string[];
  phone: string;
  callUrl: string;
  bookingUrl: string | null;
  websiteUrl: string;
  bookingLabel: string;
  claimed: boolean;
  sponsored: boolean;
};

export const regionalSearchTerms = [
  "28117",
  "28115",
  "28031",
  "28036",
  "28078",
  "28037",
  "28166",
  "28625",
  "28677",
  "28269",
  "28216",
  "mooresville",
  "lake norman",
  "cornelius",
  "davidson",
  "huntersville",
  "denver",
  "troutman",
  "statesville",
  "charlotte"
];

export const shops: Shop[] = [
  {
    id: "diesel-barbershop-mooresville",
    name: "Diesel Barbershop Mooresville Town Square",
    neighborhood: "Town Square",
    address: "137 Center Square Drive, Suite C",
    city: "Mooresville",
    state: "NC",
    zip: "28117",
    distance: "28117 area",
    availabilitySummary: "Walk-ins available and appointments available online",
    priceFrom: 45,
    rating: null,
    reviewCount: null,
    specialties: ["Men's haircuts", "Beard trim", "Shaves"],
    openNow: true,
    walkInsAvailable: true,
    hoursSummary: [
      "Sunday: 11:00 AM - 5:00 PM",
      "Monday - Friday: 10:00 AM - 8:00 PM",
      "Saturday: 9:00 AM - 7:00 PM"
    ],
    phone: "(980) 444-5217",
    callUrl: "tel:+19804445217",
    bookingUrl: "https://www.dieselbarbershop.com/location/mooresville-nc-mooresville-town-square",
    websiteUrl: "https://www.dieselbarbershop.com/location/mooresville-nc-mooresville-town-square",
    bookingLabel: "Book on shop site",
    claimed: true,
    sponsored: true
  },
  {
    id: "datre-hair-co",
    name: "Datre Hair Co.",
    neighborhood: "Kilson Drive",
    address: "111 Kilson Dr, Suite 107",
    city: "Mooresville",
    state: "NC",
    zip: "28117",
    distance: "28117 area",
    availabilitySummary: "New clients and loyal clients can book online",
    priceFrom: 27,
    rating: null,
    reviewCount: null,
    specialties: ["Haircuts", "Blowouts", "Color services"],
    openNow: true,
    walkInsAvailable: false,
    hoursSummary: [
      "Sunday - Monday: Closed",
      "Tuesday - Thursday: 9:00 AM - 9:00 PM",
      "Friday: 9:00 AM - 5:00 PM",
      "Saturday: 9:00 AM - 3:00 PM"
    ],
    phone: "(980) 777-5258",
    callUrl: "tel:+19807775258",
    bookingUrl: "https://www.datrehairco.com/",
    websiteUrl: "https://www.datrehairco.com/",
    bookingLabel: "Open booking page",
    claimed: true,
    sponsored: false
  },
  {
    id: "shears-and-beers-langtree",
    name: "Shears and Beers at Langtree",
    neighborhood: "Langtree",
    address: "119 Landings Dr, Suite 101",
    city: "Mooresville",
    state: "NC",
    zip: "28117",
    distance: "28117 area",
    availabilitySummary: "Instant confirmation available through the booking page",
    priceFrom: 31,
    rating: 5,
    reviewCount: 1,
    specialties: ["Men's haircuts", "Student cuts", "Beard detail"],
    openNow: true,
    walkInsAvailable: false,
    hoursSummary: [
      "Sunday: Closed",
      "Monday: 10:00 AM - 5:00 PM",
      "Tuesday: 11:00 AM - 4:00 PM",
      "Wednesday: 10:00 AM - 5:00 PM",
      "Thursday: Closed",
      "Friday - Saturday: 10:00 AM - 3:00 PM"
    ],
    phone: "(704) 237-3592",
    callUrl: "tel:+17042373592",
    bookingUrl: "https://www.shearsandbeers.com/locations/",
    websiteUrl: "https://www.shearsandbeers.com/locations/",
    bookingLabel: "Book at Langtree",
    claimed: false,
    sponsored: false
  },
  {
    id: "vizzions-studio",
    name: "Vizzions Studio",
    neighborhood: "Phenix Salon Suites",
    address: "591-E River Highway, Room 102",
    city: "Mooresville",
    state: "NC",
    zip: "28117",
    distance: "28117 area",
    availabilitySummary: "Book online or text the studio directly",
    priceFrom: null,
    rating: null,
    reviewCount: null,
    specialties: ["Haircuts", "Makeup", "Private studio appointments"],
    openNow: false,
    walkInsAvailable: false,
    hoursSummary: [
      "Monday - Tuesday: 10:00 AM - 6:00 PM",
      "Wednesday - Thursday: 10:00 AM - 4:00 PM",
      "Friday - Sunday: Closed"
    ],
    phone: "(704) 746-5088",
    callUrl: "tel:+17047465088",
    bookingUrl: "https://www.vizzionsstudio.com/booking",
    websiteUrl: "https://www.vizzionsstudio.com/",
    bookingLabel: "Open booking page",
    claimed: false,
    sponsored: false
  },
  {
    id: "salon-vanilla",
    name: "Salon Vanilla",
    neighborhood: "Town Center Drive",
    address: "110 Town Center Drive",
    city: "Mooresville",
    state: "NC",
    zip: "28117",
    distance: "28117 area",
    availabilitySummary: "Book now on the salon site or call the salon directly",
    priceFrom: null,
    rating: 4.7,
    reviewCount: 50,
    specialties: ["Hair styling", "Color", "Cuts"],
    openNow: true,
    walkInsAvailable: false,
    hoursSummary: [
      "Public site shows current-day hours and booking access online.",
      "Use the salon site or call ahead to confirm today's opening times."
    ],
    phone: "(704) 632-5424",
    callUrl: "tel:+17046325424",
    bookingUrl: "https://salonvanilla.co/",
    websiteUrl: "https://salonvanilla.co/",
    bookingLabel: "Book on shop site",
    claimed: true,
    sponsored: false
  },
  {
    id: "valeria-salon",
    name: "VALERIA SALON",
    neighborhood: "River Highway",
    address: "590 River Hwy E, Suite 125",
    city: "Mooresville",
    state: "NC",
    zip: "28117",
    distance: "28117 area",
    availabilitySummary: "Book online through the public Booksy page",
    priceFrom: 35,
    rating: 5,
    reviewCount: 16,
    specialties: ["Cuts", "Men's haircuts", "Color"],
    openNow: true,
    walkInsAvailable: false,
    hoursSummary: [
      "See the Booksy page for the latest appointment calendar.",
      "Use Booksy or call ahead for current open slots."
    ],
    phone: "(704) 642-5166",
    callUrl: "tel:+17046425166",
    bookingUrl: "https://booksy.com/en-us/1233169_valeria-salon_hair-salon_26782_mooresville",
    websiteUrl: "https://booksy.com/en-us/1233169_valeria-salon_hair-salon_26782_mooresville",
    bookingLabel: "Book on Booksy",
    claimed: false,
    sponsored: false
  }
];
