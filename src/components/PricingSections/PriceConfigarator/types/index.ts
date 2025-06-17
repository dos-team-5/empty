// Types
export type PlanType = 'basic' | 'premium';

export type Pricing = {
  [key: string]: number; // allows dynamic pricing names
};

export interface PricingTier {
  tier1: number;
  tier2: number;
  tier3: number;
  tier4: number;
}

export interface PlanConfig {
  installationFee: number;
  pricing: PricingTier;
  features: (string | { [key: string]: string[] })[];
}

export interface AddonConfig {
  id: string;
  label: string;
  subLabel?: string;
  features: string[];
  availableFor: PlanType[];
  pricing?: Pricing;
}
