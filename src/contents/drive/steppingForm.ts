export const steppingForm = {
  step1Form1Labels: {
    title: {
      en: 'Driver Information',
      fr: 'Informations du chauffeur',
    },
    fullName: {
      en: 'Full Name',
      fr: 'Nom complet',
    },
    email: {
      en: 'Email Address',
      fr: 'Adresse e-mail',
    },
    phone: {
      en: 'Phone Number',
      fr: 'Numéro de téléphone',
    },
    cityProvince: {
      en: 'City',
      fr: 'Ville',
    },
    shippingAddress: {
      en: 'Shipping Address',
      fr: 'Adresse de livraison',
    },
    vehicleMake: {
      en: 'Vehicle Make',
      fr: 'Marque du véhicule',
    },
    vehicleModel: {
      en: 'Vehicle Model',
      fr: 'Modèle du véhicule',
    },
    vehicleYear: {
      en: 'Vehicle Year',
      fr: 'Année du véhicule',
    },
    vehiclePhotos: {
      en: 'Vehicle Photos (Front, Side and Back)',
      fr: 'Photos du véhicule (avant, côté et arrière)',
      description: {
        en: 'Select one by one image',
        fr: 'Sélectionnez une image à la fois',
      },
    },
    vehiclePhotosDescription: {
      en: 'Select one by one image',
      fr: 'Sélectionnez une image à la fois',
    },
    rideSharePlatforms: {
      en: 'Ride Share Platform(s)',
      fr: 'Plateforme(s) de covoiturage',
    },
    weeklyDrivingSchedule: {
      en: 'Weekly Driving Hours/Schedule',
      fr: 'Heures/horaires de conduite hebdomadaires',
    },
    weeklyDrivingSchedulePlaceholder: {
      en: 'e.g., 20 hours, Mon-Fri 9AM-2PM',
      fr: 'par ex. 20 heures, lun-ven 9h-14h',
    },
    platformOptions: {
      Uber: {
        en: 'Uber',
        fr: 'Uber',
      },
      Lyft: {
        en: 'Lyft',
        fr: 'Lyft',
      },
      UberEats: {
        en: 'UberEats',
        fr: 'UberEats',
      },
    },
    buttons: {
      continue: {
        en: 'Continue',
        fr: 'Continuer',
      },
      cancel: {
        en: 'Cancel',
        fr: 'Annuler',
      },
    },
  },
  step2FormLabel: {
    title: {
      en: 'Identity Confirmation',
      fr: 'Confirmation d’identité',
    },
    driversLicense: {
      en: "Picture of Driver's License",
      fr: 'Photo du permis de conduire',
    },
    driverProfile: {
      en: 'Screenshot of Driver Profile (Uber, Lyft, etc.)',
      fr: 'Capture d’écran du profil du conducteur (Uber, Lyft, etc.)',
    },
    tripHistory: {
      en: 'Screenshot of Recent Trip History/Driven Hours',
      fr: 'Capture d’écran de l’historique des trajets / heures de conduite',
    },
    driverFormErrors: {
      en: {
        driversLicense: {
          min: 'Driver’s license is required',
          max: 'Only one driver’s license image is allowed',
        },
        driverProfile: {
          min: 'Driver profile is required',
          max: 'Only one driver profile image is allowed',
        },
        tripHistory: {
          min: 'Trip history is required',
          max: 'Only one trip history image is allowed',
        },
      },
      fr: {
        driversLicense: {
          min: 'Le permis de conduire est requis',
          max: 'Une seule image de permis de conduire est autorisée',
        },
        driverProfile: {
          min: 'Le profil du chauffeur est requis',
          max: 'Une seule image de profil du chauffeur est autorisée',
        },
        tripHistory: {
          min: 'L’historique des trajets est requis',
          max: 'Une seule image d’historique des trajets est autorisée',
        },
      },
    },
    notifications: {
      submitSuccess: {
        en: 'Identity Confirmation submitted successfully!',
        fr: 'Confirmation d’identité soumise avec succès !',
      },
      submitTitle: {
        en: 'Form Submitted',
        fr: 'Formulaire soumis',
      },
      fileUploadSuccess: {
        en: 'New file uploaded successfully!',
        fr: 'Nouveau fichier téléchargé avec succès !',
      },
      fileDeleteSuccess: {
        en: 'File deleted successfully!',
        fr: 'Fichier supprimé avec succès !',
      },
      fileDeleteError: {
        en: 'Failed to delete file. Please try again.',
        fr: 'Échec de la suppression du fichier. Veuillez réessayer.',
      },
    },
    buttons: {
      continue: {
        en: 'Continue',
        fr: 'Continuer',
      },
      back: {
        en: 'Back',
        fr: 'Retour',
      },
    },
  },
  step3FormLabel: {
    title: {
      en: 'Banking Information',
      fr: 'Informations bancaires',
    },
    voidCheque: {
      label: {
        en: 'Void Cheque (Image or PDF)',
        fr: 'Chèque annulé (Image ou PDF)',
      },
      description: {
        en: 'Upload a void cheque or direct deposit form from your bank.',
        fr: 'Téléversez un chèque annulé ou un formulaire de dépôt direct de votre banque.',
      },
      error: {
        en: 'Only one void cheque doc is allowed',
        fr: 'Un seul document de chèque annulé est autorisé',
      },
    },
  },
};

export const step3helpContent = {
  en: {
    title: 'How to Find and Upload a Void Cheque from Your Banking App',
    description:
      "Most major Canadian banks allow you to download or take a screenshot of a void cheque directly from their mobile app. Here's how:",
    steps: [
      'Log in to your banking app.',
      'Go to your account details or direct deposit information section.',
      'Look for an option called "Void Cheque," "Pre-Authorized Debit Form," or "Direct Deposit Form."',
      {
        text: 'Download or take a screenshot of the document showing:',
        subItems: [
          'Your full name',
          'Transit number',
          'Institution number',
          'Account number',
        ],
      },
    ],
  },
  fr: {
    title:
      'Comment trouver et téléverser un chèque annulé depuis votre application bancaire',
    description:
      'La plupart des grandes banques canadiennes vous permettent de télécharger ou de prendre une capture d’écran d’un chèque annulé directement depuis leur application mobile. Voici comment :',
    steps: [
      'Connectez-vous à votre application bancaire.',
      'Accédez aux détails de votre compte ou à la section des informations de dépôt direct.',
      'Recherchez une option appelée "Chèque annulé", "Formulaire de débit préautorisé" ou "Formulaire de dépôt direct".',
      {
        text: 'Téléchargez ou prenez une capture d’écran du document contenant :',
        subItems: [
          'Votre nom complet',
          'Numéro de transit',
          'Numéro d’institution',
          'Numéro de compte',
        ],
      },
    ],
  },
};
