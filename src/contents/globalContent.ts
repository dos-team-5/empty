/* eslint-disable @typescript-eslint/no-explicit-any */
export const globalContent: any = {
  home: {
    // hero section
    heroSection: {
      title: {
        line1: ' Advertise on rideshare vehicles',
        line2: 'in high-traffic areas',
      },
      subTitle: {
        line1: 'Unbeatable visibility and returns that',
        line2: 'stationary ads can’t match.',
      },
      buttons: ['Advertise', 'Drive'],
      image: '/images/hero.png',
    },
    // text reveal
    textReveal: {
      heading: ' The Lowest CPM in OOH History',
    },
    // animated ad section
    animatedAdSection: {
      animatedCircle: {
        features: [
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
      },
    },
    // roi calculator
    roiCalculatorSection: {
      title: 'How much did you spend on billboards last month?',
      subTitle: 'Let&apos;s see how many cars you could get instead!',
    },
    // carousel
    carouselFeaturesSections: {
      animatedTitle: {
        line1: 'Billboards Don’t Move,',
        line2: 'Your Customers Do.',
      },
      features: [
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
      // upload your ad
      uploadYourAd: {
        title: 'Upload Your Ad Creative',
        trivia: 'Ads are minimum 2.25 x 1.5 feet, larger when door size allows',
        description:
          'upload your Advertise banner here to see exactly how its gonna look in real time on our 3D vehicle models',
        fileInput: {
          placeholder: 'Upload Ad',
        },
        button: {
          text: 'Apply Ad',
        },
      },
    },
    // advertiser campaign section
    advertiserCampaignSection: {
      title: 'Advertiser Campaign Timeline',
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
      subTitle: 'in high-traffic areas',
      button: {
        text: 'Get Started',
      },
    },
  },
};
