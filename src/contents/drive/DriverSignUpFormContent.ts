export type DriverSignUpFormLanguageContent = {
  title: string;
  subtitle: string;
  videoPlayText: string;
  videoSubtext: string;
  videoPlayTextDesktop: string;
  videoSubtextDesktop: string;
  videoUrl: string;
  form: {
    fullName: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    phone: {
      label: string;
      placeholder: string;
    };
    hours: {
      label: string;
      placeholder: string;
    };
    city: {
      label: string;
      placeholder: string;
    };
    referralCode: {
      label: string;
      placeholder: string;
    };
  };
  buttons: {
    back: string;
    submit: string;
  };
  validation: {
    nameRequired: string;
    emailInvalid: string;
    phoneRequired: string;
    hoursRequired: string;
    cityRequired: string;
  };
};

export type LanguageCode = 'fr' | 'en';

export type DriverSignUpFormContent = Record<
  LanguageCode,
  DriverSignUpFormLanguageContent
>;

export const driverSignUpFormContent: DriverSignUpFormContent = {
  fr: {
    title: 'Inscription Conducteur',
    subtitle: 'Veuillez remplir vos informations pour que nous puissions vous contacter.',
    videoPlayText: 'Lire la Vidéo',
    videoSubtext: 'Pour en savoir plus sur l\'inscription',
    videoPlayTextDesktop: 'Lire la Vidéo Encore',
    videoSubtextDesktop: 'Pour en savoir plus sur cette section',
    videoUrl: 'https://youtube.com/shorts/jcuC62OprKU?si=t-mlgLL4F7IRb93P',
    form: {
      fullName: {
        label: 'Nom Complet',
        placeholder: 'Entrez votre nom complet'
      },
      email: {
        label: 'Email',
        placeholder: 'Entrez votre email'
      },
      phone: {
        label: 'Téléphone',
        placeholder: 'Entrez votre numéro de téléphone'
      },
      hours: {
        label: 'Combien d\'heures conduisez-vous par semaine?',
        placeholder: 'Heures disponibles par semaine'
      },
      city: {
        label: 'Ville',
        placeholder: 'Entrez votre ville'
      },
      referralCode: {
        label: 'Code de Parrainage (Optionnel)',
        placeholder: 'Entrez le code de parrainage si vous en avez un'
      }
    },
    buttons: {
      back: 'Retour',
      submit: 'Soumettre'
    },
    validation: {
      nameRequired: 'Le nom doit contenir au moins 2 lettres',
      emailInvalid: 'Email invalide',
      phoneRequired: 'Le numéro de téléphone doit contenir au moins 10 chiffres',
      hoursRequired: 'Le champ heures est requis',
      cityRequired: 'La ville doit contenir au moins 2 lettres'
    }
  },
  en: {
    title: 'Driver Sign Up',
    subtitle: 'Please fill your information so we can get in touch with you.',
    videoPlayText: 'Watch Video',
    videoSubtext: 'To Learn More About Sign Up',
    videoPlayTextDesktop: 'Play The Video Again',
    videoSubtextDesktop: 'To get about this section',
    videoUrl: 'https://youtube.com/shorts/ySCWzFz-byc?si=TP-LoTyYMDNn7vKm',
    form: {
      fullName: {
        label: 'Full Name',
        placeholder: 'Enter your full name'
      },
      email: {
        label: 'Email',
        placeholder: 'Enter your email'
      },
      phone: {
        label: 'Phone',
        placeholder: 'Enter your phone number'
      },
      hours: {
        label: 'How many hours do you drive per week?',
        placeholder: 'Available hours per week'
      },
      city: {
        label: 'City',
        placeholder: 'Enter your city'
      },
      referralCode: {
        label: 'Referral Code (Optional)',
        placeholder: 'Enter referral code if you have one'
      }
    },
    buttons: {
      back: 'Back',
      submit: 'Submit'
    },
    validation: {
      nameRequired: 'Name must have at least 2 letters',
      emailInvalid: 'Invalid email',
      phoneRequired: 'Phone number must be at least 10 digits',
      hoursRequired: 'Hours field is required',
      cityRequired: 'City must have at least 2 letters'
    }
  }
};