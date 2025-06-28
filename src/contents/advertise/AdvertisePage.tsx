import { Smartphone, Users } from 'lucide-react';
import { JSX } from 'react';

export interface HeroSection {
  title: {
    line1: string;
    line2: string;
  };
  subtitle: {
    line1: string;
    line2: string;
  };
  cta: {
    cta1: string;
    cta2: string;
  };
}

export interface TextRevealSection {
  title: string;
  cta: string;
}

export interface AdvertisingSectionData {
  title: string;
  description: string;
  animation: {
    initial: {
      opacity: number;
    };
    whileInView: {
      opacity: number;
    };
  };
  position: string;
}

export interface FeatureCarouselSection {
  carouselSection: {
    title: {
      line1: string;
      line2: string;
    };
    carouselData: {
      id: number;
      title: string;
      content: string;
    }[];
  };
  canvasSection: {
    title: string;
    menuDDInfo: string;
    content: JSX.Element;
    inputPlaceholder: string;
    applyBtn: string;
  };
}

export interface AdvertiserCampaignSection {
  title: string;
  campaignSteps: {
    id: number;
    title: string;
    description: string;
    bgImage: string;
    icon: string;
    width: number;
  }[];
}

export interface ROISectionType {
  inputSection: {
    title: string;
    subTitle: string;
    btnText: string;
  };
  resultSection: {
    toggleBtnBasic: string;
    toggleBtnpremium: string;
    resultMainContent: {
      line1: string;
      line2: string;
      line3: string;
    };
    resultSubContent: {
      line1: string;
      line2: string;
    };
  };
}

export interface SSvsLSSectionType {
  title: string;
  subTitle: string;
  slides: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    backgroundColor: string;
    icon: JSX.Element;
  }[];
}

export interface FaqSection {
  title: {
    line1: string;
    line2: string;
  };
  faqData: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export interface AdvertisePageContent {
  heroSection: HeroSection;
  textRevealSection: TextRevealSection;
  advertisingSectionData: AdvertisingSectionData[];
  featureCarouselSection: FeatureCarouselSection;
  advertiserCampaignSection: AdvertiserCampaignSection;
  ROISection: ROISectionType;
  SSvsLSSection: SSvsLSSectionType;
  faqSection: FaqSection;
}

export const getAdvertisePageContent: Record<
  'en' | 'fr',
  AdvertisePageContent
> = {
  en: {
    heroSection: {
      title: {
        line1: 'Advertise on rideshare vehicles',
        line2: 'in high-traffic areas',
      },
      subtitle: {
        line1: 'Unbeatable visibility and returns that',
        line2: 'stationary ads can’t match.',
      },
      cta: {
        cta1: 'Advertise',
        cta2: 'Drive',
      },
    },

    textRevealSection: {
      title: 'The Lowest CPM in OOH History',
      cta: "Don't Believe Us?",
    },

    advertisingSectionData: [
      {
        title: 'Lowest CPM in OOH',
        description:
          'We offer record-breaking CPM with more hours of weekly exposure across the city. Traditional OOH can’t compete on value, scale, or flexibility.',
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[25%]  md:top-[25%] lg:top-[25%] xl:top-[25%] left-1/2 -translate-x-1/2 lg:left-1/4',
      },
      {
        title: 'Real time Campaign Dashboard',
        description:
          'See your ads move all over the city in real-time. Get live analytics and AI Insights on what to change to for the best possible results. Change your fleet size, creative or create a new campaign in minutes.',
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[25%]  md:top-[25%] lg:top-[15%] xl:top-[15%] right-1/2 translate-x-1/2 lg:right-1/4',
      },
      {
        title: 'City-wide Coverage, Unbeatable Price ',
        description:
          'Each vehicle gives you 40+ hours a week across commercial, residential, and high-traffic zones. We give you city-wide coverage at an unbeatable price. Our ads travel directly to where your customers are.',
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[25%]  md:top-[25%] lg:top-[35%] xl:top-[37%] 2xl:top-[45%] left-1/2 lg:left-1/8 -translate-x-1/2',
      },
      {
        title: 'Next Level Attribution',
        description:
          'Scan & Spin and Lead Snatcher provide lead information for retargeting, whether someone engaged with your brand via Scan & Spin or simply saw your ad while driving by. We’ve made it easy to identify who interacted with your brand.',
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[25%]  md:top-[25%] lg:top-[35%] xl:top-[37%] 2xl:top-[45%] right-1/2 lg:right-1/8 translate-x-1/2',
      },
    ],

    featureCarouselSection: {
      carouselSection: {
        title: {
          line1: 'Billboards Don’t Move,',
          line2: 'Your Customers Do.',
        },
        carouselData: [
          {
            id: 1,
            title: 'Unlock the Untapped Potential of Rideshare Advertising.',
            content:
              'The rideshare industry is one of the most underutilized channels for advertising today. Most vehicles don’t feature any form of ad placement, and the few that do rely on in-car screens, rooftop displays, or full-vehicle wraps. Empty offers a smarter, more cost-effective alternative. We help you stand out and reach a broader audience for a fraction of the cost.',
          },
          {
            id: 2,
            title: 'Any sized fleet, as per your needs.',
            content:
              'At Empty, we believe powerful advertising should be accessible to everyone. Whether you’re a small business with a tight budget or a global brand with massive reach, we scale to fit your goals. From one vehicle to an entire fleet, our platform delivers unmatched value and visibility, outperforming traditional out-of-home options at every level.',
          },
          {
            id: 3,
            title: 'From Preview to Live in a Few Days.',
            content:
              'With Empty’s platform, launching your ad is as easy as shopping online. Preview your asset directly on a vehicle, complete checkout, and go live. No sales reps. No delays. No hassle.',
          },
          {
            id: 4,
            title: 'Clear Insights, Comprehensive Reporting.',
            content:
              'With EMPTY, you get detailed, real-time analytics, including impression data, audience demographics, geographic heatmaps, ride activity, and engagement insights. We bring digital-grade reporting to physical campaigns, so you’ll know exactly where your ads went, how many people saw them, and who they reached. No guesswork, no vague reach estimates.',
          },
        ],
      },

      canvasSection: {
        title: 'Upload Your Ad Creative',
        menuDDInfo:
          'Ads are minimum 2.25 x 1.5 feet, larger when door size allows',
        content: (
          <>
            Upload your advertise banner here to see exactly how it will look in
            real-time on our 3D vehicle models.
            <b className="">
              Please ensure your Asset is in a 3:2 aspect ratio.
            </b>
          </>
        ),
        inputPlaceholder: 'Upload Ad',
        applyBtn: 'Apply Ad',
      },
    },

    advertiserCampaignSection: {
      title: ' Advertiser Campaign Timeline',
      campaignSteps: [
        {
          id: 1,
          title: 'Checkout Online',
          description:
            'Review your selections and pay securely through our platform. No back-and-forth, no hidden costs',
          bgImage: 'advertiser-campaign/1.png',
          icon: 'mdi:file-document-edit-outline',
          width: 45,
        },
        {
          id: 2,
          title: 'Select city, Upload Creative, Start Tracking ',
          description:
            'Choose your target region, upload your assets, and access your dashboard. Watch as it fills with valuable insights',
          bgImage: 'advertiser-campaign/2.png',
          icon: 'uiw:safety',
          width: 92,
        },
        {
          id: 3,
          title: 'Ads in Motion',
          description:
            'your ad is printed and installed on verified drivers’ vehicles. Access your dashboard and watch it update by the minute',
          bgImage: 'advertiser-campaign/3.png',
          icon: 'charm:circle-tick',
          width: 92,
        },
        {
          id: 4,
          title: 'Track Campaign Performance',
          description:
            'Our advanced API knows where your drivers are at all times. Watch as impressions, CPM and much more change in real time',
          bgImage: 'advertiser-campaign/4.png',
          icon: 'simple-line-icons:plus',
          width: 90,
        },
        {
          id: 5,
          title: 'Scale With a Click',
          description:
            'Easily extend your campaign, update your creative, or scale to more cities and vehicles. Enjoy flexible month-to-month terms with just one week to go live',
          bgImage: 'advertiser-campaign/5.png',
          icon: 'fluent:tag-20-regular',
          width: 90,
        },
      ],
    },

    ROISection: {
      inputSection: {
        title: 'How much did you spend on billboards last month?',
        subTitle:
          "Let's see how many cars you could get instead with our car advertising service.",
        btnText: 'Calculate',
      },

      resultSection: {
        toggleBtnBasic: 'Basic Plan',
        toggleBtnpremium: 'Premium Plan',
        resultMainContent: {
          line1: 'For',
          line2: 'you could get',
          line3: 'cars, driving with your ad full-time.',
        },
        resultSubContent: {
          line1: '*One-time installation fee of',
          line2: 'per car',
        },
      },
    },

    SSvsLSSection: {
      title: 'Why Scan & Spin vs Lead Snatcher',
      subTitle:
        'Choose the retargeting strategy that fits your goals, or combine both for maximum impact.',
      slides: [
        {
          id: 'scan-spin',
          title: 'Scan & Spin',
          subtitle: 'Attribution ',
          description:
            'Scan&Spin turns every vehicle into a mobile engagement hub. Passersby scan the QR code for a chance to win branded rewards, giveaways, or discounts, while we collect digital IDs from the devices that engage. These IDs can then be resold or used for high-intent retargeting across web and social platforms, giving you both direct attribution and a powerful sales funnel. We sell each of these IDs for $0.5.',
          image: '/VS_SCANSPIN.png',
          backgroundColor: 'from-pink-100 to-purple-100',
          icon: <Smartphone className="h-6 w-6" />,
        },
        {
          id: 'lead-snatcher',
          title: 'Lead Snatcher',
          subtitle: 'Impressions',
          description:
            'LeadSnatcher passively collects anonymized digital IDs from mobile devices near the car, allowing you to re-target people who were physically near your ad, even if they never scanned. We sell each of these IDs for $0.1.',
          image: '/VS_LEAD_SNATCHER.png',
          backgroundColor: 'from-blue-50 to-indigo-100',
          icon: <Users className="h-6 w-6" />,
        },
      ],
    },

    faqSection: {
      title: {
        line1: 'Frequently',
        line2: 'Asked Questions',
      },
      faqData: [
        {
          id: 'reset-password',
          question: 'How do I know my rideshare ads are being seen?',
          answer:
            'We provide complete ad visibility tracking for your rideshare advertising campaign. With real-time GPS tracking, weekly ride activity reports, and photo confirmations from drivers, you’ll know your ads are live and in motion. Plus, our detailed analytics report includes impression estimates, heatmaps, and zone-based reach, giving you full transparency into your out-of-home (OOH) ad performance.',
        },
        {
          id: 'another-account',
          question:
            'Is there a minimum number of vehicles to start a rideshare advertising campaign?',
          answer:
            'EMPTY was built to make OOH advertising accessible for businesses of all sizes. Campaigns can typically start with just 5 vehicles, and we welcome smaller pilots, perfect for local or regional businesses with limited ad budgets. Our low entry cost and scalable fleet model make mobile advertising easy to test, launch, and grow.',
        },

        {
          id: 'credit-card',
          question:
            'How quickly can I launch a rideshare advertising campaign?',
          answer:
            'Your campaign can be up and running in as little as 5–10 business days. Once you upload your ad creative and complete checkout, we handle the printing, shipping, and driver coordination. EMPTY makes launching an OOH campaign faster and easier than traditional billboard advertising.',
        },
        {
          id: 'payment',
          question: 'Can I A/B test ad creatives in my OOH campaign?',
          answer:
            'Yes. Our platform lets you run multiple creatives across your rideshare fleet to A/B test your messaging. You can also add or remove vehicles based on performance or targeting needs. EMPTY gives you the flexibility to optimize your mobile OOH campaign like a digital media buy.',
        },
        {
          id: 'digitalMarketting',
          question:
            'Can I combine EMPTY with my digital marketing or retargeting strategy?',
          answer:
            'Absolutely. EMPTY integrates seamlessly with digital marketing by acting as a real-world amplifier for your online campaigns. Our exclusive Scan&Spin feature captures verified engagement data from people who interact with your ad, enabling precise retargeting through device IDs across digital channels. It’s a powerful way to connect offline visibility with online conversion',
        },
        {
          id: 'commitment',
          question:
            'Is there a contract or long-term commitment for advertising with EMPTY?',
          answer:
            'No long-term commitment is required. Our rideshare advertising campaigns run month-to-month, giving you full control. You can renew, scale, pause, or adjust your campaign at the end of any billing cycle. No sales pressure, no hidden fees.',
        },
      ],
    },
  },

  fr: {
    heroSection: {
      title: {
        line1: 'Faites de la publicité sur les véhicules de covoiturage',
        line2: 'dans les zones à fort trafic',
      },
      subtitle: {
        line1: 'Une visibilité inégalée et des rendements que',
        line2: 'les publicités fixes ne peuvent égaler.',
      },
      cta: {
        cta1: 'Annoncer',
        cta2: 'Conduire',
      },
    },

    textRevealSection: {
      title: 'Le CPM le plus bas de l’histoire de l’affichage extérieur',
      cta: 'Vous ne nous croyez pas ?',
    },

    advertisingSectionData: [
      {
        title: 'Le CPM le plus bas en affichage extérieur',
        description:
          'Nous offrons un CPM record avec plus d’heures d’exposition hebdomadaire à travers la ville. L’affichage extérieur traditionnel ne peut rivaliser en termes de valeur, d’échelle ou de flexibilité.',
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[25%]  md:top-[25%] lg:top-[25%] xl:top-[25%] left-1/2 -translate-x-1/2 lg:left-1/4',
      },
      {
        title: 'Tableau de bord de campagne en temps réel',
        description:
          'Voyez vos publicités se déplacer dans toute la ville en temps réel. Obtenez des analyses en direct et des informations IA sur ce qu’il faut modifier pour obtenir les meilleurs résultats possibles. Changez la taille de votre flotte, votre visuel ou créez une nouvelle campagne en quelques minutes.',
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[25%]  md:top-[25%] lg:top-[15%] xl:top-[15%] right-1/2 translate-x-1/2 lg:right-1/4',
      },
      {
        title: 'Couverture à l’échelle de la ville, prix imbattable',
        description:
          'Chaque véhicule vous offre plus de 40 heures par semaine dans des zones commerciales, résidentielles et à fort trafic. Nous vous offrons une couverture à l’échelle de la ville à un prix imbattable. Nos publicités se rendent directement là où se trouvent vos clients.',
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[25%]  md:top-[25%] lg:top-[35%] xl:top-[37%] 2xl:top-[45%] left-1/2 lg:left-1/8 -translate-x-1/2',
      },
      {
        title: 'Attribution de niveau supérieur',
        description:
          'Scan & Spin et Lead Snatcher fournissent des informations sur les prospects pour le reciblage, qu’une personne ait interagi avec votre marque via Scan & Spin ou simplement vu votre publicité en passant. Nous avons simplifié l’identification de ceux qui ont interagi avec votre marque.',
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[25%]  md:top-[25%] lg:top-[35%] xl:top-[37%] 2xl:top-[45%] right-1/2 lg:right-1/8 translate-x-1/2',
      },
    ],

    featureCarouselSection: {
      carouselSection: {
        title: {
          line1: 'Les panneaux d’affichage ne bougent pas,',
          line2: 'vos clients, si.',
        },
        carouselData: [
          {
            id: 1,
            title:
              'Libérez le potentiel inexploité de la publicité sur covoiturage.',
            content:
              'L’industrie du covoiturage est l’un des canaux publicitaires les plus sous-utilisés aujourd’hui. La plupart des véhicules n’affichent aucune forme de publicité, et ceux qui le font utilisent des écrans intérieurs, des affichages sur le toit ou des habillages complets. Empty propose une alternative plus intelligente et plus économique. Nous vous aidons à vous démarquer et à atteindre un public plus large pour une fraction du coût.',
          },
          {
            id: 2,
            title: 'Une flotte de toute taille, selon vos besoins.',
            content:
              'Chez Empty, nous croyons que la publicité puissante devrait être accessible à tous. Que vous soyez une petite entreprise avec un budget limité ou une marque mondiale avec une portée massive, nous nous adaptons à vos objectifs. D’un seul véhicule à une flotte entière, notre plateforme offre une valeur et une visibilité inégalées, surpassant les options d’affichage extérieur traditionnelles à tous les niveaux.',
          },
          {
            id: 3,
            title: 'De l’aperçu à la mise en ligne en quelques jours.',
            content:
              'Avec la plateforme d’Empty, lancer votre publicité est aussi simple que faire des achats en ligne. Prévisualisez votre visuel directement sur un véhicule, finalisez votre commande et passez en ligne. Pas de représentants commerciaux. Pas de délais. Pas de complications.',
          },
          {
            id: 4,
            title: 'Des informations claires, des rapports complets.',
            content:
              'Avec Empty, vous obtenez des analyses détaillées en temps réel, incluant les données d’impression, les démographies de l’audience, les cartes thermiques géographiques, l’activité des trajets et les informations sur l’engagement. Nous apportons un rapport de niveau numérique aux campagnes physiques, vous saurez exactement où vos publicités sont allées, combien de personnes les ont vues et qui elles ont atteint. Pas de suppositions, pas d’estimations vagues de portée.',
          },
        ],
      },

      canvasSection: {
        title: 'Téléchargez votre création publicitaire',
        menuDDInfo:
          'Les publicités mesurent au minimum 2,25 x 1,5 pieds, plus grandes lorsque la taille de la portière le permet',
        content: (
          <>
            Téléchargez votre bannière publicitaire ici pour voir exactement à
            quoi elle ressemblera en temps réel sur nos modèles de véhicules 3D.
            <b className="">
              Veuillez vous assurer que votre visuel respecte un rapport
              d’aspect de 3:2.
            </b>
          </>
        ),
        inputPlaceholder: 'Télécharger la publicité',
        applyBtn: 'Appliquer la publicité',
      },
    },

    advertiserCampaignSection: {
      title: 'Chronologie de la campagne publicitaire',
      campaignSteps: [
        {
          id: 1,
          title: 'Paiement en ligne',
          description:
            'Vérifiez vos sélections et payez en toute sécurité via notre plateforme. Pas d’allers-retours, pas de coûts cachés.',
          bgImage: 'advertiser-campaign/1.png',
          icon: 'mdi:file-document-edit-outline',
          width: 45,
        },
        {
          id: 2,
          title:
            'Choisissez une ville, téléchargez votre visuel, commencez le suivi',
          description:
            'Sélectionnez votre région cible, téléchargez vos visuels et accédez à votre tableau de bord. Observez-le se remplir d’informations précieuses.',
          bgImage: 'advertiser-campaign/2.png',
          icon: 'uiw:safety',
          width: 92,
        },
        {
          id: 3,
          title: 'Publicités en mouvement',
          description:
            'Votre publicité est imprimée et installée sur les véhicules de conducteurs vérifiés. Accédez à votre tableau de bord et regardez-le se mettre à jour minute par minute.',
          bgImage: 'advertiser-campaign/3.png',
          icon: 'charm:circle-tick',
          width: 92,
        },
        {
          id: 4,
          title: 'Suivez les performances de la campagne',
          description:
            'Notre API avancée sait où se trouvent vos conducteurs à tout moment. Observez les impressions, le CPM et bien plus encore évoluer en temps réel.',
          bgImage: 'advertiser-campaign/4.png',
          icon: 'simple-line-icons:plus',
          width: 90,
        },
        {
          id: 5,
          title: 'Évoluez en un clic',
          description:
            'Prolongez facilement votre campagne, mettez à jour votre visuel ou étendez-vous à plus de villes et de véhicules. Profitez de conditions flexibles de mois en mois avec seulement une semaine pour être opérationnel.',
          bgImage: 'advertiser-campaign/5.png',
          icon: 'fluent:tag-20-regular',
          width: 90,
        },
      ],
    },

    ROISection: {
      inputSection: {
        title:
          'Combien avez-vous dépensé pour des panneaux d’affichage le mois dernier ?',
        subTitle:
          'Voyons combien de voitures vous pourriez obtenir à la place avec notre service de publicité sur voitures.',
        btnText: 'Calculer',
      },

      resultSection: {
        toggleBtnBasic: 'Plan de base',
        toggleBtnpremium: 'Plan premium',
        resultMainContent: {
          line1: 'Pour',
          line2: 'vous pourriez obtenir',
          line3: 'voitures, roulant avec votre publicité à temps plein.',
        },
        resultSubContent: {
          line1: '*Frais d’installation unique de',
          line2: 'par voiture',
        },
      },
    },

    SSvsLSSection: {
      title: 'Pourquoi Scan & Spin vs Lead Snatcher',
      subTitle:
        'Choisissez la stratégie de reciblage qui correspond à vos objectifs, ou combinez les deux pour un impact maximal.',
      slides: [
        {
          id: 'scan-spin',
          title: 'Scan & Spin',
          subtitle: 'Attribution',
          description:
            'Scan & Spin transforme chaque véhicule en un hub d’engagement mobile. Les passants scannent le code QR pour avoir une chance de gagner des récompenses de marque, des cadeaux ou des réductions, tandis que nous collectons les identifiants numériques des appareils qui interagissent. Ces identifiants peuvent ensuite être revendus ou utilisés pour un reciblage à haute intention sur les plateformes web et sociales, vous offrant à la fois une attribution directe et un puissant entonnoir de vente. Nous vendons chacun de ces identifiants pour 0,5 $.',
          image: '/VS_SCANSPIN.png',
          backgroundColor: 'from-pink-100 to-purple-100',
          icon: <Smartphone className="h-6 w-6" />,
        },

        {
          id: 'lead-snatcher',
          title: 'Lead Snatcher',
          subtitle: 'Impressions',
          description:
            'Lead Snatcher collecte passivement des identifiants numériques anonymisés des appareils mobiles à proximité de la voiture, vous permettant de recibler les personnes qui étaient physiquement proches de votre publicité, même si elles n’ont jamais scanné. Nous vendons chacun de ces identifiants pour 0,1 $.',
          image: '/VS_LEAD_SNATCHER.png',
          backgroundColor: 'from-blue-50 to-indigo-100',
          icon: <Users className="h-6 w-6" />,
        },
      ],
    },

    faqSection: {
      title: {
        line1: 'Questions',
        line2: 'fréquemment posées',
      },
      faqData: [
        {
          id: 'reset-password',
          question:
            'Comment savoir si mes publicités sur covoiturage sont vues ?',
          answer:
            'Nous fournissons un suivi complet de la visibilité des publicités pour votre campagne publicitaire sur covoiturage. Avec un suivi GPS en temps réel, des rapports hebdomadaires sur l’activité des trajets et des confirmations photo des conducteurs, vous saurez que vos publicités sont en ligne et en mouvement. De plus, notre rapport analytique détaillé inclut des estimations d’impressions, des cartes thermiques et une portée basée sur les zones, vous offrant une transparence totale sur les performances de votre publicité extérieure (OOH).',
        },
        {
          id: 'another-account',
          question:
            'Y a-t-il un nombre minimum de véhicules pour démarrer une campagne publicitaire sur covoiturage ?',
          answer:
            'Empty a été conçu pour rendre la publicité extérieure accessible aux entreprises de toutes tailles. Les campagnes peuvent généralement commencer avec seulement 5 véhicules, et nous accueillons des pilotes plus petits, parfaits pour les entreprises locales ou régionales avec des budgets publicitaires limités. Notre faible coût d’entrée et notre modèle de flotte évolutif rendent la publicité mobile facile à tester, lancer et développer.',
        },
        {
          id: 'credit-card',
          question:
            'À quelle vitesse puis-je lancer une campagne publicitaire sur covoiturage ?',
          answer:
            'Votre campagne peut être opérationnelle en seulement 5 à 10 jours ouvrables. Une fois que vous téléchargez votre création publicitaire et finalisez votre commande, nous nous occupons de l’impression, de l’expédition et de la coordination avec les conducteurs. Empty rend le lancement d’une campagne extérieure plus rapide et plus facile que la publicité sur panneau d’affichage traditionnelle.',
        },
        {
          id: 'payment',
          question:
            'Puis-je effectuer des tests A/B sur les créations publicitaires dans ma campagne extérieure ?',
          answer:
            'Oui. Notre plateforme vous permet de diffuser plusieurs créations sur votre flotte de covoiturage pour tester vos messages. Vous pouvez également ajouter ou retirer des véhicules en fonction des performances ou des besoins de ciblage. Empty vous offre la flexibilité d’optimiser votre campagne extérieure mobile comme un achat média numérique.',
        },
        {
          id: 'digitalMarketting',
          question:
            'Puis-je combiner Empty avec ma stratégie de marketing numérique ou de reciblage ?',
          answer:
            'Absolument. Empty s’intègre parfaitement au marketing numérique en agissant comme un amplificateur dans le monde réel pour vos campagnes en ligne. Notre fonctionnalité exclusive Scan & Spin capture des données d’engagement vérifiées des personnes qui interagissent avec votre publicité, permettant un reciblage précis via les identifiants d’appareils sur les canaux numériques. C’est un moyen puissant de connecter la visibilité hors ligne à la conversion en ligne.',
        },
        {
          id: 'commitment',
          question:
            'Y a-t-il un contrat ou un engagement à long terme pour faire de la publicité avec Empty ?',
          answer:
            'Aucun engagement à long terme n’est requis. Nos campagnes publicitaires sur covoiturage fonctionnent sur une base mensuelle, vous donnant un contrôle total. Vous pouvez renouveler, étendre, mettre en pause ou ajuster votre campagne à la fin de chaque cycle de facturation. Pas de pression commerciale, pas de frais cachés.',
        },
      ],
    },
  },
};
