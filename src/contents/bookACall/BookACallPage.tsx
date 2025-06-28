export interface TitleSection {
  title: string;
  subtitle1: string;
  subtitle2: string;
}

export interface DiscoverHowToSection {
  title: string;
  data: {
    title: string;
    description: string;
  }[];
}
export interface BookACallPageContent {
  titleSection: TitleSection;
  discoverHowToSection: DiscoverHowToSection;
}

export const getBookACallPageContent: Record<
  'en' | 'fr',
  BookACallPageContent
> = {
  en: {
    titleSection: {
      title: 'Lowest CPM in OOH. Period.',
      subtitle1:
        'Our CPM is the lowest in out-of-home and rivals digital. We’ll show you how to drive high-value impressions for a fraction of the cost of traditional OOH, with digital-level performance.',
      subtitle2:
        'Re-target your real-world audience online for results that scale fast, without the usual media buying headaches.',
    },
    discoverHowToSection: {
      title: "In 20 Minutes You'll discover how to...",
      data: [
        {
          title: 'Unlock full attribution from your ads',
          description: 'Track scans, leads, and conversions with Scan & Spin',
        },

        {
          title: 'Analyze your impression data',
          description:
            ' Get weekly reports powered by real GPS and device tracking',
        },
        {
          title: 'Cut your CPM and boost ROI',
          description:
            'Leverage our high-volume model for the lowest CPM in OOH',
        },
        {
          title: 'Scale as you go',
          description: ' Launch with one car or expand to hundreds in days',
        },
        {
          title: 'Get Citywide visibility',
          description:
            'Get seen across the city without paying billboard prices.',
        },
        {
          title: 'Own 100% share of voice',
          description: 'On each vehicle, no competition',
        },
      ],
    },
  },

  fr: {
    titleSection: {
      title: 'Le CPM le plus bas en affichage extérieur. Point final.',
      subtitle1:
        'Notre CPM est le plus bas en affichage extérieur et rivalise avec le numérique. Nous vous montrerons comment générer des impressions de grande valeur pour une fraction du coût de l’affichage extérieur traditionnel, avec des performances de niveau numérique.',
      subtitle2:
        'Reciblez votre audience du monde réel en ligne pour des résultats qui évoluent rapidement, sans les habituels casse-têtes d’achat média.',
    },
    discoverHowToSection: {
      title: 'En 20 minutes, vous découvrirez comment...',
      data: [
        {
          title: 'Obtenez une attribution complète de vos publicités',
          description:
            'Suivez les scans, les prospects et les conversions avec Scan & Spin',
        },
        {
          title: 'Analysez vos données d’impression',
          description:
            'Recevez des rapports hebdomadaires basés sur le suivi GPS et des appareils',
        },
        {
          title: 'Réduisez votre CPM et augmentez votre ROI',
          description:
            'Tirez parti de notre modèle à haut volume pour le CPM le plus bas en affichage extérieur',
        },
        {
          title: 'Évoluez à votre rythme',
          description:
            'Lancez avec une seule voiture ou passez à des centaines en quelques jours',
        },
        {
          title: 'Obtenez une visibilité à l’échelle de la ville',
          description:
            'Soyez vu dans toute la ville sans payer le prix des panneaux d’affichage',
        },
        {
          title: 'Bénéficiez d’une part de voix exclusive',
          description: 'Sur chaque véhicule, sans concurrence',
        },
      ],
    },
  },
};
