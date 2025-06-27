import { Anchor } from '@mantine/core';
import {
  Calendar1,
  CalendarCheck,
  CircleCheck,
  CirclePlus,
  Cog,
  FilePenLine,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { ReactNode } from 'react';

export interface HeroSection {
  title: {
    line1: string;
    line2: string;
  };
  features: string[];
  cta: string;
}

export interface TimelineStep {
  title: string;
  desc: ReactNode; // supports string or JSX like <Anchor />
  icon: ReactNode;
}

export interface TimelineSection {
  title: string;
  data: TimelineStep[];
}

export interface DriverStep {
  step: number;
  title: string;
  description: string;
}

export interface WhatToExpectItem {
  title: string;
  description: string;
}

export interface DriverSignUpSection {
  howItWorksSteps: DriverStep[];
  whatToExpectItems: WhatToExpectItem[];
}

export interface DrivePageContent {
  heroSection: HeroSection;
  timeLine: TimelineSection;
  driverSignUp: DriverSignUpSection;
} // adjust path to where your interfaces are

const handleSignUpClick = () => {
  const target = document.querySelector('#signUpDriver');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

const sharedAnchor: ReactNode = (
  <Anchor
    variant="text"
    size="md"
    className="underline"
    onClick={handleSignUpClick}
    component="button"
  >
    Sign up now
  </Anchor>
);

export const getDrivePageContent: Record<'en' | 'fr', DrivePageContent> = {
  en: {
    heroSection: {
      title: {
        line1: 'Earn Extra Monthly Income',
        line2: 'Drive As You Normally Do.',
      },
      features: [
        'Join our platform and earn up to 200$ per month with no extra effort.',
        'Simply drive your typical routes and hours.',
        'Advertise for Brands People Know and Love.',
      ],
      cta: 'Sign Up',
    },
    timeLine: {
      title: 'Get Started',
      data: [
        {
          title: 'Sign up online',
          desc: (
            <>
              Register on our platform.
              <br />
              {sharedAnchor}
            </>
          ),
          icon: <FilePenLine size={24} />,
        },
        {
          title: 'Verification',
          desc: 'Provide proof of your rideshare status: screenshot of your driver profile, upload your driver’s license along with your banking details.',
          icon: <ShieldCheck size={24} />,
        },
        {
          title: 'Get Listed',
          desc: 'Once your payment information and identity are verified, you’ll be added to our network of drivers.',
          icon: <CircleCheck size={24} />,
        },
        {
          title: 'Accept Campaigns',
          desc: 'When a campaign matches your profile, you will be notified through email with the ability to accept or decline the role.',
          icon: <CirclePlus size={24} />,
        },
        {
          title: 'Receive Decal',
          desc: 'Visit the local installation center listed in your email to have your decal professionally installed.',
          icon: <Tag size={24} />,
        },
        {
          title: 'Install & Drive',
          desc: 'Once your decal is installed, go to the Driver Sign-In page on our website and log in using your driver’s license number. Upload a clear photo of the decal, then download the Evertrack app to enable GPS tracking. After that, you’re all set to drive as usual.',
          icon: <Cog size={24} />,
        },
        {
          title: 'Weekly Updates',
          desc: 'Throughout the campaign, you must keep the Evertrack app running to allow us to track your driving hours. Once a week, log in to the Driver Sign-In page and upload clear photos of both decals to help us monitor campaign performance.',
          icon: <CalendarCheck size={24} />,
        },
        {
          title: 'Monthly Payment',
          desc: 'Get paid up to $200 at the end of each month during your campaign.',
          icon: <Calendar1 size={24} />,
        },
      ],
    },
    driverSignUp: {
      howItWorksSteps: [
        {
          step: 1,
          title: 'Quick & Secure Setup',
          description:
            "We'll first verify your identity and banking information. This ensures your monthly payments are always timely and secure via direct deposit.",
        },
        {
          step: 2,
          title: 'Get Campaign Offers',
          description:
            "Once verified, you're officially part of our network! You'll then receive advertising campaign offers that you can choose to accept or decline. It's totally up to you!",
        },
        {
          step: 3,
          title: 'Drive as You Normally Do',
          description:
            'Accept a campaign? Great! Get the decal installed at an EMPTY installation center. After that, just keep driving your usual routes. No extra work or detours needed.',
        },
        {
          step: 4,
          title: 'Monthly Direct Deposits',
          description:
            "You'll get paid every month with a direct deposit straight to your bank account. Your earnings will vary based on the specific campaign you're in.",
        },
      ],
      whatToExpectItems: [
        {
          title: 'Smart Campaign Matching',
          description:
            'We use your location and driving habits to connect you with the most relevant advertisers.',
        },
        {
          title: 'Flexible Assignment Times',
          description:
            "The time it takes to get assigned to a campaign can vary—from one day to several weeks or even months. It depends on campaign availability, your location, and advertiser demand. Don't worry if it's not immediate; we're always working to find the best match for you!",
        },
        {
          title: 'Simple Commitment',
          description:
            'Once the campaign is live, we just ask you to provide regular photo updates of the decals condition, while keeping the Evertrack app open and running at all times to allow us to track your driving activity.',
        },
      ],
    },
  },

  fr: {
    heroSection: {
      title: {
        line1: 'Gagnez un revenu mensuel supplémentaire',
        line2: 'Conduisez comme d’habitude.',
      },
      features: [
        'Rejoignez notre plateforme et gagnez jusqu’à 200 $ par mois sans effort supplémentaire.',
        'Conduisez simplement vos itinéraires habituels.',
        'Faites la publicité de marques que les gens connaissent et aiment.',
      ],
      cta: 'Inscrivez-vous',
    },
    timeLine: {
      title: 'Commencez',
      data: [
        {
          title: 'Inscription en ligne',
          desc: (
            <>
              Inscrivez-vous sur notre plateforme.
              <br />
              <Anchor
                variant="text"
                size="md"
                className="underline"
                onClick={handleSignUpClick}
                component="button"
              >
                S’inscrire
              </Anchor>
            </>
          ),
          icon: <FilePenLine size={24} />,
        },
        {
          title: 'Vérification',
          desc: 'Fournissez une preuve de votre statut de chauffeur : capture d’écran de votre profil, permis de conduire et informations bancaires.',
          icon: <ShieldCheck size={24} />,
        },
        {
          title: 'Ajout au réseau',
          desc: 'Une fois vos informations vérifiées, vous serez ajouté à notre réseau de chauffeurs.',
          icon: <CircleCheck size={24} />,
        },
        {
          title: 'Accepter les campagnes',
          desc: 'Lorsqu’une campagne correspond à votre profil, vous recevrez un e-mail pour accepter ou refuser.',
          icon: <CirclePlus size={24} />,
        },
        {
          title: 'Recevoir l’autocollant',
          desc: 'Rendez-vous au centre d’installation local mentionné dans l’e-mail pour faire poser l’autocollant.',
          icon: <Tag size={24} />,
        },
        {
          title: 'Installez et conduisez',
          desc: 'Après installation de l’autocollant, connectez-vous sur notre site avec votre numéro de permis. Téléversez une photo de l’autocollant et installez l’application Evertrack pour activer le suivi GPS.',
          icon: <Cog size={24} />,
        },
        {
          title: 'Mises à jour hebdomadaires',
          desc: 'Gardez l’application Evertrack ouverte pendant toute la campagne et téléversez une photo hebdomadaire des autocollants.',
          icon: <CalendarCheck size={24} />,
        },
        {
          title: 'Paiement mensuel',
          desc: 'Recevez jusqu’à 200 $ à la fin de chaque mois pendant la campagne.',
          icon: <Calendar1 size={24} />,
        },
      ],
    },
    driverSignUp: {
      howItWorksSteps: [
        {
          step: 1,
          title: 'Configuration rapide et sécurisée',
          description:
            'Nous vérifierons votre identité et vos coordonnées bancaires pour garantir des paiements sécurisés chaque mois.',
        },
        {
          step: 2,
          title: 'Recevez des offres de campagne',
          description:
            'Une fois vérifié, vous ferez partie de notre réseau. Vous recevrez des campagnes publicitaires que vous pourrez accepter ou refuser.',
        },
        {
          step: 3,
          title: 'Conduisez normalement',
          description:
            'Acceptez une campagne ? Super ! Faites installer l’autocollant dans un centre EMPTY. Ensuite, reprenez simplement vos trajets habituels.',
        },
        {
          step: 4,
          title: 'Dépôts directs mensuels',
          description:
            'Vous recevrez un virement bancaire chaque mois. Le montant dépendra de la campagne en cours.',
        },
      ],
      whatToExpectItems: [
        {
          title: 'Appariement intelligent',
          description:
            'Nous utilisons votre emplacement et vos habitudes de conduite pour vous proposer les campagnes les plus pertinentes.',
        },
        {
          title: 'Temps d’attribution flexible',
          description:
            'Cela peut prendre de quelques jours à plusieurs semaines ou mois selon la demande et votre région.',
        },
        {
          title: 'Engagement simple',
          description:
            'Gardez l’app Evertrack ouverte et fournissez des photos régulières de vos stickers pendant la campagne.',
        },
      ],
    },
  },
};
