// Types
export type PlanType = 'basic' | 'premium';

export interface PricingTier {
  tier1: number;
  tier2: number;
  tier3: number;
  tier4: number;
}

export interface PlanConfig {
  installationFee: number;
  pricing: PricingTier;
  features: string[];
}

export interface AddonConfig {
  id: string;
  label: string;
  features: string[];
  availableFor: PlanType[];
}
