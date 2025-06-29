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
      title: 'CPM le plus bas en affichage extérieur. Point.',
      subtitle1:
        'Notre CPM est le plus bas de la publicité extérieure et rivalise avec le digital. Nous vous montrerons comment générer des impressions à forte valeur ajoutée pour une fraction du coût de la publicité extérieure traditionnelle, avec des performances de niveau digital.',
      subtitle2:
        "Reciblez votre public réel en ligne pour obtenir des résultats évolutifs rapidement, sans les maux de tête habituels liés à l'achat de médias.",
    },
    discoverHowToSection: {
      title: 'En 20 minutes, vous découvrirez comment...',
      data: [
        {
          title: "Débloquez l'attribution complète de vos annonces",
          description:
            'Suivez les analyses, les prospects et les conversions avec Scan & Spin',
        },
        {
          title: "Analysez vos données d'impression",
          description:
            "Obtenez des rapports hebdomadaires alimentés par un véritable GPS et un suivi d'appareil",
        },
        {
          title: 'Réduisez votre CPM et augmentez votre ROI',
          description:
            'Tirez parti de notre modèle à volume élevé pour le CPM le plus bas en OOH',
        },
        {
          title: 'Évoluez au fur et à mesure',
          description:
            'Lancez-vous avec une seule voiture ou développez-la à des centaines en quelques jours',
        },
        {
          title: 'Obtenez une visibilité dans toute la ville',
          description:
            "Soyez visible dans toute la ville sans payer le prix des panneaux d'affichage.",
        },
        {
          title: 'Avoir une part de voix de 100%',
          description: 'Sur chaque véhicule, pas de concurrence',
        },
      ],
    },
  },
};
