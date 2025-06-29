// Reusable for both languages
type HeroSection = {
  title: {
    line1: string;
    line2: string;
  };
  description: string;
  button: string;
};

type AboutScanSpinSection = {
  title: string;
  description: string;
};

type CardDataItem = {
  id: number;
  logo: string;
  title: string;
  content: string;
};

type WhyScanSpinSection = {
  title: string;
  cardData: CardDataItem[];
};

type AttributionPageLanguageContent = {
  heroSection: HeroSection;
  aboutScanSpinSection: AboutScanSpinSection;
  whyScanSpinSection: WhyScanSpinSection;
};

export type LanguageCode = 'fr' | 'en';

export type AttributionPageContent = Record<
  LanguageCode,
  AttributionPageLanguageContent
>;

export const attributionPageContent: AttributionPageContent = {
  en: {
    heroSection: {
      title: {
        line1: "Know Exactly Who's Engaging",
        line2: 'with Your OOH Campaign',
      },
      description:
        "Scan & Spin is a QR-powered tool that tracks real-time engagement with your out-of-home ads. By offering instant, interactive rewards, it provides clear insights into who’s interacting with your brand and how those interactions drive real-world conversions. No other OOH solution offers this level of precision and ROI tracking. Each user's information is collected, enabling you to retarget them with pinpoint accuracy.",
      button: 'Book A Call',
    },
    aboutScanSpinSection: {
      title: 'How It Works: The Scan & Spin Journey',
      description:
        "Scan & Spin delivers the kind of engagement you'd get if you hired dozens of people to hand out coupons across the city. But instead of guessing who took one, each person is tracked individually and can be re-targeted again and again. ",
    },
    whyScanSpinSection: {
      title: 'Why Scan & Spin? Your Key Advantages',
      cardData: [
        {
          id: 1,
          logo: '/giftDetails/engagement.svg',
          title: 'Real Engagement',
          content:
            ' Branded QR codes on rideshare vehicles invite scans for instant rewards like discounts or free products, creating welcomed interaction in high-traffic areas.',
        },
        {
          id: 2,
          logo: '/giftDetails/verified.svg',
          title: 'Verified Attribution',
          content:
            ' Every interaction is geo-verified, time-stamped, and linked to a unique digital ID. This provides precise engagement data, eliminating estimated impressions and tracking in-store redemption.',
        },
        {
          id: 3,
          logo: '/EMPTY-Logo.png',
          title: 'none',
          content: ' none',
        },
        {
          id: 4,
          logo: '/giftDetails/audiance.svg',
          title: 'Retargetable Audiences',
          content:
            ' Capture high-intent users for retargeting via email, SMS, or loyalty campaigns. Digital IDs from real-world interactions offer precision targeting, outperforming OOH and digital ads.',
        },
        {
          id: 5,
          logo: '/giftDetails/mobileFirst.svg',
          title: 'Mobile-First & Shareable',
          content:
            'The mobile-optimized experience, centered on an interactive prize wheel, boosts engagement and social sharing, increasing reach and brand memorability.',
        },
        {
          id: 6,
          logo: '/giftDetails/measure.svg',
          title: 'Measurable ROI',
          content:
            'Scan & Spin links physical visibility to digital performance, transforming out-of-home advertising into a trackable, data-driven channel for conversions and customer acquisition.',
        },
      ],
    },
  },
  fr: {
    heroSection: {
      title: {
        line1: 'Connaissez exactement qui est engagé qui',
        line2: "s'engage avec votre campagne OOH ",
      },
      description:
        "Scan & Spin est un outil basé sur le QR code qui suit l'engagement en temps réel avec vos publicités extérieures. En proposant des récompenses instantanées et interactives, il fournit des informations claires sur les interactions avec votre marque et sur la manière dont ces interactions génèrent des conversions concrètes. Aucune autre solution OOH n'offre un tel niveau de précision et de suivi du retour sur investissement. Les informations de chaque utilisateur sont collectées, ce qui vous permet de les recibler avec une précision extrême.",
      button: 'Réserver un Appel',
    },
    aboutScanSpinSection: {
      title: 'Comment Cela Fonctionne : La Journée de Scan & Spin',
      description:
        "Scan & Spin offre le même niveau d'engagement que si vous engagiez des dizaines de personnes pour distribuer des coupons à travers la ville. Mais au lieu de deviner qui en a pris un, chaque personne est suivie individuellement et peut être reciblée à l'infini.",
    },
    whyScanSpinSection: {
      title: 'Pourquoi Scan & Spin ? Vos principaux avantages',
      cardData: [
        {
          id: 1,
          logo: '/giftDetails/engagement.svg',
          title: 'Un véritable engagement',
          content:
            'Les codes QR de marque sur les véhicules de covoiturage invitent à scanner pour obtenir des récompenses instantanées telles que des remises ou des produits gratuits, créant ainsi une interaction bienvenue dans les zones à fort trafic.',
        },
        {
          id: 2,
          logo: '/giftDetails/verified.svg',
          title: 'Attribution vérifiée',
          content:
            'Chaque interaction est géo-vérifiée, horodatée et associée à un identifiant numérique unique. Cela permet d obtenir des données dengagement précises, d éliminer les impressions estimées et de suivre les échanges en magasin.',
        },
        {
          id: 3,
          logo: '/EMPTY-Logo.png',
          title: 'none',
          content: ' none',
        },
        {
          id: 4,
          logo: '/giftDetails/audiance.svg',
          title: 'Audiences reciblables',
          content:
            " Captez les utilisateurs à forte intention d'achat pour le reciblage par e-mail, 'SMS' ou campagnes de fidélisation. Les identifiants numériques issus d'interactions réelles offrent un ciblage précis, plus performant que la publicité extérieure et numérique.",
        },
        {
          id: 5,
          logo: '/giftDetails/mobileFirst.svg',
          title: 'Mobile-First et partageable',
          content:
            "L'expérience optimisée pour mobile, centrée sur une roue de prix interactive, stimule l'engagement et le partage social, augmentant ainsi la portée et la mémorisation de la marque.",
        },
        {
          id: 6,
          logo: '/giftDetails/measure.svg',
          title: 'Retour sur investissement mesurable',
          content:
            "Scan & Spin relie la visibilité physique aux performances numériques, transformant la publicité extérieure en un canal traçable et basé sur les données pour les conversions et l'acquisition de clients.",
        },
      ],
    },
  },
};
