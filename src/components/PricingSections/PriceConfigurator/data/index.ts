import { AddonConfig, Currency, PlanConfig, PlanType } from '../types';

// Constants
export const PLAN_CONFIGS: Record<PlanType, PlanConfig> = {
  basic: {
    installationFee: 66.0,
    pricing: { tier1: 269.0, tier2: 250.0, tier3: 241.0, tier4: 232.0 },
    features: [
      '40+ hours of exposure per car per week',
      'Ads displayed across high-traffic areas in the city',
      {
        'Weekly Reports:': [
          'Heatmap of coverage',
          'Estimated CPM',
          'Estimated impressions',
          'Hours driven',
          'Proof of ad delivery',
        ],
      },
    ],
  },

  premium: {
    installationFee: 210,
    pricing: { tier1: 303.0, tier2: 282.0, tier3: 271.0, tier4: 261.0 },
    features: [
      '95-99% confidence rate in impression accuracy',
      'Industry-leading measurement technology',
      {
        'Comprehensive report includes:': [
          'Total impressions by neighborhood',
          'Hourly impression breakdown',
          'Daily and weekly impression trends',
        ],
      },
    ],
  },
};

export const ADDONS: AddonConfig[] = [
  {
    id: 'scanAndSpin',
    label: 'Add Scan & Spin ',
    subLabel: 'Add Scan & Spin Engagement',
    availableFor: ['basic', 'premium'],
    samePrice: true,
    pricing: {
      'spin & scan':
        '$0.50 per device collected through ID Snatch - (Scan & Spin)',
      // 'geo fencing':
      //   '$0.01 per device collected through Device ID PassBack - (Geofencing)',
    },
    features: [
      'Device IDs collected for retargeting & attribution',
      'QR codes placed on vehicle exteriors',
      'Users scan for deals or promo codes',
      'High-intent leads from real-world interaction',
      'Email capture',
      {
        pricing: [
          ' $0.50 per device collected through ID Snatch - (Scan & Spin).',
          // '$0.01 per device collected through Device ID PassBack - (Geofencing).',
        ],
      },
    ],
  },
  {
    id: 'deviceIdPassBack',
    label: 'Add ID Snatch',
    subLabel: 'Passive Device ID Capture & PassBack',
    availableFor: ['premium'],
    samePrice: true,
    pricing: {
      // 'spin & scan':
      //   '$0.50 per device collected through Device ID PassBack - (Scan & Spin)',
      'geo fencing':
        '$0.01 per device collected through ID Snatch - (Geofencing)',
    },
    features: [
      'Personal device information collected via WiFi and Bluetooth proximity',
      'IDs collected without any user interaction',
      'Filtered by radius, signal strength, and location',
      'Used for audience modeling and retargeting',
      'Fully privacy-compliant (USA, Canada, Europe)',
      {
        pricing: [
          // ' $0.50 per device collected through Device ID PassBack - (Scan & Spin).',
          '$0.01 per device collected through ID Snatch - (Geofencing).',
        ],
      },
    ],
  },
];

export const CAR_COUNT_TIERS = [
  { min: 1, max: 20, tier: 'tier1' as const },
  { min: 21, max: 50, tier: 'tier2' as const },
  { min: 51, max: 100, tier: 'tier3' as const },
  { min: 101, max: Infinity, tier: 'tier4' as const },
];

// Car count options for slider
export const CAR_OPTIONS = [
  { cars: 1, label: '1' },
  { cars: 5, label: '5' },
  { cars: 10, label: '10' },
  { cars: 15, label: '15' },
  { cars: 25, label: '25' },
  { cars: 50, label: '50' },
  { cars: 75, label: '75' },
  { cars: 100, label: '100+' },
];

export const MONTH_OPTIONS = [
  { month: 1, label: '1' },
  { month: 2, label: '2' },
  { month: 3, label: '3' },
  { month: 4, label: '4' },
  { month: 5, label: '5' },
  { month: 6, label: '6' },
  { month: 7, label: '7' },
  { month: 8, label: '8' },
  { month: 9, label: '9' },
  { month: 10, label: '10' },
  { month: 11, label: '11' },
  { month: 12, label: '12' },
];

export const currencyOptions: { label: string; value: Currency }[] = [
  { label: 'USD', value: 'usd' },
  { label: 'CAD', value: 'cad' },
];
