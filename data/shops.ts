export type Shop = {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  distance: string;
  nextAvailable: string;
  priceFrom: number;
  rating: number;
  reviewCount: number;
  specialties: string[];
  openNow: boolean;
  walkInsAvailable: boolean;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
};

export const shops: Shop[] = [
  {
    id: "trim-tap",
    name: "OpenChair Studio",
    neighborhood: "Downtown",
    address: "125 Market Street, Downtown",
    distance: "0.4 mi",
    nextAvailable: "Today at 12:15 PM",
    priceFrom: 28,
    rating: 4.9,
    reviewCount: 214,
    specialties: ["Skin fades", "Walk-ins", "Beard trim"],
    openNow: true,
    walkInsAvailable: true,
    hours: {
      weekdays: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "11:00 AM - 4:00 PM"
    }
  },
  {
    id: "northside-fade-house",
    name: "Northside Fade House",
    neighborhood: "North End",
    address: "88 North Avenue, North End",
    distance: "0.9 mi",
    nextAvailable: "Today at 1:00 PM",
    priceFrom: 32,
    rating: 4.8,
    reviewCount: 167,
    specialties: ["Kids cuts", "Line ups", "Textured crop"],
    openNow: true,
    walkInsAvailable: true,
    hours: {
      weekdays: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "Closed"
    }
  },
  {
    id: "main-street-barbers",
    name: "Main Street Barbers",
    neighborhood: "River District",
    address: "402 Main Street, River District",
    distance: "1.3 mi",
    nextAvailable: "Today at 2:30 PM",
    priceFrom: 25,
    rating: 4.7,
    reviewCount: 301,
    specialties: ["Classic cuts", "Buzz cut", "Senior cuts"],
    openNow: true,
    walkInsAvailable: false,
    hours: {
      weekdays: "8:00 AM - 6:00 PM",
      saturday: "8:00 AM - 3:00 PM",
      sunday: "Closed"
    }
  },
  {
    id: "copper-chair-co",
    name: "Copper Chair Co.",
    neighborhood: "West Market",
    address: "17 Copper Lane, West Market",
    distance: "1.8 mi",
    nextAvailable: "Today at 4:45 PM",
    priceFrom: 36,
    rating: 4.9,
    reviewCount: 118,
    specialties: ["Scissor cuts", "Curly hair", "Consultations"],
    openNow: false,
    walkInsAvailable: false,
    hours: {
      weekdays: "11:00 AM - 7:00 PM",
      saturday: "10:00 AM - 5:00 PM",
      sunday: "12:00 PM - 4:00 PM"
    }
  },
  {
    id: "east-block-cuts",
    name: "East Block Cuts",
    neighborhood: "East Village",
    address: "240 East Block Road, East Village",
    distance: "2.1 mi",
    nextAvailable: "Tomorrow at 9:30 AM",
    priceFrom: 24,
    rating: 4.6,
    reviewCount: 142,
    specialties: ["Quick trims", "Walk-ins", "Students"],
    openNow: false,
    walkInsAvailable: true,
    hours: {
      weekdays: "9:30 AM - 6:30 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Closed"
    }
  },
  {
    id: "atlas-barber-lounge",
    name: "Atlas Barber Lounge",
    neighborhood: "Midtown",
    address: "610 Atlas Plaza, Midtown",
    distance: "2.7 mi",
    nextAvailable: "Tomorrow at 10:00 AM",
    priceFrom: 40,
    rating: 4.8,
    reviewCount: 89,
    specialties: ["Hot towel", "Premium service", "Beard sculpt"],
    openNow: true,
    walkInsAvailable: false,
    hours: {
      weekdays: "10:00 AM - 7:00 PM",
      saturday: "10:00 AM - 5:00 PM",
      sunday: "12:00 PM - 4:00 PM"
    }
  }
];
