// Data types for DAWN Sunrays Tracker

export interface LeaderboardEntry {
  "Discord Name": string;
  "Sun Rays": number;
}

export interface SunrayRecord {
  Date: string;
  "Discord Name": string;
  Type: string;
  "Sun Rays": number;
  Notes: string;
  FIELD6: null;
}

export interface ProcessedUser {
  username: string;
  sunrays: number;
  tier: TierType;
  globalRank: number;
}

export type TierType = 
  | "Dawn Ascendant" 
  | "Solar Sentinel" 
  | "Keeper of the Flame" 
  | "Luminary" 
  | "Architect" 
  | "Beacon" 
  | "Trailblazer" 
  | "Newcomer";

export interface TierConfig {
  name: TierType;
  minSunrays: number;
  maxSunrays: number;
  image: string;
  description: string;
}

export const TIER_CONFIGS: TierConfig[] = [
  { name: "Dawn Ascendant", minSunrays: 35, maxSunrays: Infinity, image: "/assets/Dawn Ascendant.jpg", description: "The pinnacle of dedication" },
  { name: "Solar Sentinel", minSunrays: 30, maxSunrays: 34, image: "/assets/Solar Sentinel.jpg", description: "Guardian of the light" },
  { name: "Keeper of the Flame", minSunrays: 25, maxSunrays: 29, image: "/assets/Keeper of the Flame.jpg", description: "Protecting the fire within" },
  { name: "Luminary", minSunrays: 20, maxSunrays: 24, image: "/assets/Luminary.jpg", description: "Shining bright among peers" },
  { name: "Architect", minSunrays: 15, maxSunrays: 19, image: "/assets/Architect.jpg", description: "Building the foundation" },
  { name: "Beacon", minSunrays: 10, maxSunrays: 14, image: "/assets/Beacon.jpg", description: "Guiding others forward" },
  { name: "Trailblazer", minSunrays: 5, maxSunrays: 9, image: "/assets/Trailblazer.jpg", description: "Paving new paths" },
  { name: "Newcomer", minSunrays: 1, maxSunrays: 4, image: "/assets/Newcomer.jpg", description: "First steps to the stars" },
];

export interface WeeklyWinnersData {
  [weekKey: string]: SunrayRecord[];
}

export interface EventCategory {
  name: string;
  winners: SunrayRecord[];
}

// Tier calculation function - STRICT LOGIC
export function calculateTier(sunrays: number): TierType {
  if (sunrays >= 35) return "Dawn Ascendant";
  if (sunrays >= 30) return "Solar Sentinel";
  if (sunrays >= 25) return "Keeper of the Flame";
  if (sunrays >= 20) return "Luminary";
  if (sunrays >= 15) return "Architect";
  if (sunrays >= 10) return "Beacon";
  if (sunrays >= 5) return "Trailblazer";
  return "Newcomer";
}

// Get tier config by tier name
export function getTierConfig(tier: TierType): TierConfig {
  return TIER_CONFIGS.find(t => t.name === tier) || TIER_CONFIGS[7];
}

// Get tier color for styling
export function getTierColor(tier: TierType): string {
  const colors: Record<TierType, string> = {
    "Dawn Ascendant": "#FFD700",
    "Solar Sentinel": "#FF8C00",
    "Keeper of the Flame": "#FF4500",
    "Luminary": "#FFA500",
    "Architect": "#DAA520",
    "Beacon": "#F4A460",
    "Trailblazer": "#DEB887",
    "Newcomer": "#CD853F",
  };
  return colors[tier];
}
