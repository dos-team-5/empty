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
          'top-[20%]  md:top-[25%] lg:top-[25%] xl:top-[25%] left-1/2 -translate-x-1/2 lg:left-1/4',
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
          'top-[20%]  md:top-[25%] lg:top-[15%] xl:top-[15%] right-1/2 translate-x-1/2 lg:right-1/4',
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
          'top-[20%]  md:top-[25%] lg:top-[35%] xl:top-[37%] 2xl:top-[45%] left-1/2 lg:left-1/8 -translate-x-1/2',
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
          'top-[20%]  md:top-[25%] lg:top-[35%] xl:top-[37%] 2xl:top-[45%] right-1/2 lg:right-1/8 translate-x-1/2',
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
            title: 'The Most Overlooked Channel in Advertising',
            content:
              'While everyone else is fighting for space on billboards and digital feeds, we deliver city-wide reach at record-low CPMs. Your brand rides through residential, commercial, and high-traffic zones over 40 hours a week. No other platform comes close on price, exposure, or targeting power.',
          },
          {
            id: 2,
            title: 'Real-Time Analytics and Next-Level Attribution',
            content:
              'Watch your ads move across the city and see what’s working in real time. Our dashboard shows live impression data, CPM tracking, heatmaps, and AI suggestions to boost results. With Scan & Spin and Lead Snatcher, you’ll know exactly who interacted with your brand and when, making retargeting effortless. It’s everything legacy OOH platforms wish they could do.',
          },
          {
            id: 3,
            title: 'Launch in Minutes. Go Live in Days.',
            content:
              'Forget long sales cycles. With Empty, launching an OOH campaign is as easy as booking a digital ad. Upload your creative, choose your city, and go live - all in one platform. No reps. No back-and-forth. Just high-impact physical ads on the road within days.',
          },
          {
            id: 4,
            title: 'Scale from 1 Car to 100 Inside Your Dashboard',
            content:
              "Launch, track, and expand your fleet directly from your dashboard. Whether you're running a pilot or deploying across multiple cities, Empty makes it seamless. Add vehicles, change creatives, or launch new campaigns in minutes. AI-powered insights help you optimize performance without lifting a finger.",
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
            'Your ad is printed and installed on verified drivers’ vehicles. Access your dashboard and watch it update by the minute',
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
          subtitle: '$0.50 per engaged lead ID',
          description:
            'Turn every vehicle into an interactive engagement machine. Scan & Spin invites people to scan a QR code on the car for a chance to win giveaways, discounts, or exclusive offers. Behind the scenes, we collect high-intent digital IDs from every engagement - fully compliant and ready for retargeting across web and social. Each ID becomes a warm lead you can retarget. It’s part brand activation, part lead engine. The best part - each ID can be tied to real revenue.',
          image: '/VS_SCANSPIN.png',
          backgroundColor: 'from-pink-100 to-purple-100',
          icon: <Smartphone className="h-6 w-6" />,
        },
        {
          id: 'lead-snatcher',
          title: 'Lead Snatcher',
          subtitle: '$0.01 per impression ID',
          description:
            'Lead Snatcher captures the bigger picture. It passively detects anonymized digital IDs from mobile devices that come near your ad - no interaction required. When someone close to the vehicle sees your ad you are to reach them later with hyper-targeted ads. These ambient IDs are collected silently and compliantly, It’s the most scalable way to retarget foot traffic at the street level.',
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
        line1: 'Une visibilité et des retours imbattables que ',
        line2: 'les publicités fixes ne peuvent égaler.',
      },
      cta: {
        cta1: 'Annoncer',
        cta2: 'Conduire',
      },
    },

    textRevealSection: {
      title: "Le CPM le plus bas de l'histoire de l'OOH",
      cta: 'Vous ne nous croyez pas?',
    },

    advertisingSectionData: [
      {
        title: 'CPM le plus bas en OOH',
        description:
          "Nous offrons un CPM record avec davantage d'heures de visibilité hebdomadaire dans toute la ville. L'affichage extérieur traditionnel ne peut rivaliser en termes de valeur, d'échelle ou de flexibilité.",
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[15%]  md:top-[20%] lg:top-[25%] xl:top-[25%] left-1/2 -translate-x-1/2 lg:left-1/4',
      },
      {
        title: 'Tableau de bord de campagne en temps réel',
        description:
          "Suivez la diffusion de vos publicités dans toute la ville en temps réel. Bénéficiez d'analyses en direct et d'analyses IA pour savoir comment optimiser vos résultats. Modifiez la taille de votre flotte, votre contenu publicitaire ou créez une nouvelle campagne en quelques minutes.",
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[15%]  md:top-[20%] lg:top-[15%] xl:top-[15%] right-1/2 translate-x-1/2 lg:right-1/4',
      },
      {
        title: "Couverture à l'échelle de la ville, prix imbattable",
        description:
          'Chaque véhicule vous offre plus de 40 heures par semaine dans les zones commerciales, résidentielles et à fort trafic. Nous vous offrons une couverture urbaine à un prix imbattable. Nos publicités arrivent directement chez vos clients.',
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[15%]  md:top-[20%] lg:top-[35%] xl:top-[37%] 2xl:top-[45%] left-1/2 lg:left-1/8 -translate-x-1/2',
      },
      {
        title: 'Attribution de niveau supérieur',
        description:
          "Scan & Spin et Lead Snatcher fournissent des informations sur les prospects pour le reciblage, qu'un interagisse avec votre marque via Scan & Spin ou qu'il ait simplement vu votre publicité en passant. Nous avons simplifié l'identification des personnes ayant interagi avec votre marque.",
        animation: {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
        },
        position:
          'top-[15%]  md:top-[20%] lg:top-[35%] xl:top-[37%] 2xl:top-[45%] right-1/2 lg:right-1/8 translate-x-1/2',
      },
    ],

    featureCarouselSection: {
      carouselSection: {
        title: {
          line1: 'Les panneaux d’affichage ne bougent pas,',
          line2: 'vos clients oui.',
        },
        carouselData: [
          {
            id: 1,
            title: 'Le canal le plus négligé de la publicité',
            content:
              "Alors que tous les autres se disputent l'espace sur les panneaux d'affichage et les flux numériques, nous offrons une portée urbaine à des CPM record. Votre marque rayonne dans les zones résidentielles, commerciales et à fort trafic plus de 40 heures par semaine. Aucune autre plateforme ne lui arrive à la cheville en termes de prix, de visibilité et de ciblage.",
          },
          {
            id: 2,
            title: 'Analyse en temps réel et attribution de niveau supérieur',
            content:
              "Suivez la diffusion de vos publicités à travers la ville et découvrez ce qui fonctionne en temps réel. Notre tableau de bord affiche les données d'impression en direct, le suivi du CPM, les cartes thermiques et les suggestions de l'IA pour optimiser les résultats. Avec Scan & Spin et Lead Snatcher, vous saurez précisément qui a interagi avec votre marque et quand, facilitant ainsi le reciblage. C'est tout ce que les plateformes OOH traditionnelles aimeraient pouvoir faire.",
          },
          {
            id: 3,
            title:
              'Lancement en quelques minutes. Mise en ligne en quelques jours.',
            content:
              "Oubliez les longs cycles de vente. Avec Empty, lancer une campagne OOH est aussi simple que réserver une publicité digitale. Téléchargez votre création, choisissez votre ville et lancez-la, le tout sur une seule plateforme. Pas de représentants ni d'allers-retours. Juste des publicités physiques percutantes, disponibles en quelques jours.",
          },
          {
            id: 4,
            title:
              "Échelle de 1 à 100 voitures à l'intérieur de votre tableau de bord",
            content:
              "Lancez, suivez et développez votre flotte directement depuis votre tableau de bord. Que vous meniez un projet pilote ou que vous déployiez votre flotte dans plusieurs villes, Empty simplifie tout. Ajoutez des véhicules, modifiez vos visuels ou lancez de nouvelles campagnes en quelques minutes. Les analyses basées sur l'IA vous aident à optimiser vos performances sans avoir à lever le petit doigt.",
          },
        ],
      },

      canvasSection: {
        title: 'Téléchargez votre création publicitaire',
        menuDDInfo:
          'Les publicités mesurent au minimum 2,25 x 1,5 pieds, plus grandes lorsque la taille de la portière le permet',
        content: (
          <>
            Téléchargez votre bannière publicitaire ici pour voir son rendu en
            temps réel sur nos modèles de véhicules 3D.
            <b className="">
              Veuillez vous assurer que votre image est au format 3:2.
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
          title: 'Commander en ligne',
          description:
            'Consultez vos sélections et payez en toute sécurité via notre plateforme. Aucun aller-retour, aucun frais caché.',
          bgImage: 'advertiser-campaign/1.png',
          icon: 'mdi:file-document-edit-outline',
          width: 45,
        },
        {
          id: 2,
          title:
            'Sélectionnez la ville, téléchargez la création, démarrez le suivi',
          description:
            'Choisissez votre région cible, importez vos ressources et accédez à votre tableau de bord. Découvrez-le et ses précieuses informations.',
          bgImage: 'advertiser-campaign/2.png',
          icon: 'uiw:safety',
          width: 92,
        },
        {
          id: 3,
          title: 'Annonces en mouvement',
          description:
            'Votre annonce est imprimée et installée sur les véhicules des conducteurs vérifiés. Accédez à votre tableau de bord et suivez sa mise à jour à la minute.',
          bgImage: 'advertiser-campaign/3.png',
          icon: 'charm:circle-tick',
          width: 92,
        },
        {
          id: 4,
          title: 'Suivre les performances de la campagne',
          description:
            "Notre API avancée connaît en permanence la position de vos conducteurs. Suivez l'évolution des impressions, du CPM et bien plus encore en temps réel.",
          bgImage: 'advertiser-campaign/4.png',
          icon: 'simple-line-icons:plus',
          width: 90,
        },
        {
          id: 5,
          title: 'Évoluez en un clic',
          description:
            "Étendez facilement votre campagne, mettez à jour vos visuels ou étendez-la à d'autres villes et véhicules. Bénéficiez de conditions mensuelles flexibles avec une semaine de mise en ligne seulement.",
          bgImage: 'advertiser-campaign/5.png',
          icon: 'fluent:tag-20-regular',
          width: 90,
        },
      ],
    },

    ROISection: {
      inputSection: {
        title:
          'Combien avez-vous dépensé en panneaux d’affichage le mois dernier ?',
        subTitle:
          'Voyons combien de voitures vous pourriez obtenir à la place avec notre service de publicité automobile.',
        btnText: 'Calculer',
      },

      resultSection: {
        toggleBtnBasic: 'Forfait de base',
        toggleBtnpremium: 'Forfait Premium',
        resultMainContent: {
          line1: 'Pour',
          line2: 'vous pourriez obtenir',
          line3:
            'voitures, qui circuleraient à temps plein avec votre annonce.',
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
          subtitle: '0,50 $ par lead ID engagé',
          description:
            "Transformez chaque véhicule en une machine d'engagement interactive. Scan & Spin invite les utilisateurs à scanner un QR code sur le véhicule pour tenter de gagner des cadeaux, des réductions ou des offres exclusives. En coulisses, nous collectons des identifiants numériques à forte intention pour chaque engagement, entièrement conformes et prêts pour le reciblage sur le web et les réseaux sociaux. Chaque identifiant devient un prospect potentiel que vous pouvez recibler. C'est à la fois une activation de marque et un moteur de prospects. Mieux encore : chaque identifiant peut être associé à un chiffre d'affaires réel.",
          image: '/VS_SCANSPIN.png',
          backgroundColor: 'from-pink-100 to-purple-100',
          icon: <Smartphone className="h-6 w-6" />,
        },

        {
          id: 'lead-snatcher',
          title: 'Lead Snatcher',
          subtitle: "0,01 $ par ID d'impression",
          description:
            "Lead Snatcher offre une vue d'ensemble. Il détecte passivement les identifiants numériques anonymisés des appareils mobiles qui s'approchent de votre publicité, sans aucune interaction. Lorsqu'une personne proche du véhicule voit votre publicité, vous pouvez la toucher ultérieurement avec des publicités ultra-ciblées. Ces identifiants ambiants sont collectés silencieusement et en toute conformité. C'est la solution la plus évolutive pour recibler le trafic piétonnier au niveau de la rue.",
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
            'Comment puis-je savoir si mes annonces de covoiturage sont vues ?',
          answer:
            "Nous assurons un suivi complet de la visibilité de vos annonces pour vos campagnes de covoiturage. Grâce au suivi GPS en temps réel, aux rapports hebdomadaires d'activité et aux confirmations photo des chauffeurs, vous savez que vos annonces sont en ligne et en mouvement. De plus, notre rapport d'analyse détaillé inclut des estimations d'impressions, des cartes thermiques et une portée par zone, vous offrant ainsi une transparence totale sur les performances de vos publicités OOH.",
        },
        {
          id: 'another-account',
          question:
            'Existe-t-il un nombre minimum de véhicules pour démarrer une campagne publicitaire de covoiturage ?',
          answer:
            "EMPTY a été conçu pour rendre la publicité OOH accessible aux entreprises de toutes tailles. Les campagnes peuvent généralement démarrer avec seulement 5 véhicules, et nous acceptons les projets pilotes de plus petite envergure, parfaits pour les entreprises locales ou régionales disposant de budgets publicitaires limités. Notre faible coût d'entrée et notre modèle de flotte évolutif facilitent le test, le lancement et le développement de la publicité mobile.",
        },
        {
          id: 'credit-card',
          question:
            'En combien de temps puis-je lancer une campagne publicitaire de covoiturage ?',
          answer:
            "Votre campagne peut être lancée en seulement 5 à 10 jours ouvrés. Une fois votre création publicitaire téléchargée et votre paiement finalisé, nous prenons en charge l'impression, l'expédition et la coordination des chauffeurs. EMPTY simplifie et accélère le lancement d'une campagne OOH par rapport à l'affichage traditionnel.",
        },
        {
          id: 'payment',
          question:
            'Puis-je tester les créations publicitaires A/B dans ma campagne OOH ?',
          answer:
            "Oui. Notre plateforme vous permet de diffuser plusieurs supports publicitaires sur votre flotte de covoiturage afin de tester vos messages en A/B. Vous pouvez également ajouter ou supprimer des véhicules en fonction de vos performances ou de vos besoins de ciblage. EMPTY vous offre la flexibilité d'optimiser votre campagne OOH mobile comme un achat média digital.",
        },
        {
          id: 'digitalMarketting',
          question:
            'Puis-je combiner EMPTY avec ma stratégie de marketing digital ou de reciblage ?',
          answer:
            "Absolument. EMPTY s'intègre parfaitement au marketing digital en agissant comme un amplificateur concret pour vos campagnes en ligne. Notre fonctionnalité exclusive Scan&Spin collecte des données d'engagement vérifiées auprès des personnes qui interagissent avec votre publicité, permettant ainsi un reciblage précis grâce aux identifiants d'appareil sur tous les canaux digitaux. C'est un moyen puissant d'allier visibilité hors ligne et conversion en ligne.",
        },
        {
          id: 'commitment',
          question:
            'Existe-t-il un contrat ou un engagement à long terme pour la publicité avec EMPTY ?',
          answer:
            "Aucun engagement à long terme n'est requis. Nos campagnes publicitaires de covoiturage sont mensuelles, vous offrant un contrôle total. Vous pouvez renouveler, étendre, suspendre ou ajuster votre campagne à la fin de chaque cycle de facturation. Aucune pression commerciale, aucun frais caché.",
        },
      ],
    },
  },
};
