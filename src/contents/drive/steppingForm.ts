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
    checkbox: {
      label: {
        en: 'I have read and agree to be bound by the Terms and Conditions',
        fr: 'J’ai lu et j’accepte d’être lié par les conditions générales',
      },
    },
    notifications: {
      missingData: {
        title: {
          en: 'Missing Data',
          fr: 'Données manquantes',
        },
        message: {
          en: 'Driver application data not found in local storage.',
          fr: 'Les données de la demande du conducteur sont introuvables dans le stockage local.',
        },
      },
      submissionSuccess: {
        title: {
          en: 'Form Submitted. Please check your email for confirmation',
          fr: 'Formulaire soumis. Veuillez vérifier votre e-mail pour confirmation',
        },
        message: {
          en: 'Your application has been submitted successfully.',
          fr: 'Votre demande a été soumise avec succès.',
        },
      },
      submissionFailed: {
        title: {
          en: 'Submission Failed',
          fr: 'Échec de la soumission',
        },
      },
      unexpectedError: {
        title: {
          en: 'Unexpected Error',
          fr: 'Erreur inattendue',
        },
        message: {
          en: 'Something went wrong.',
          fr: 'Une erreur est survenue.',
        },
      },
      deleteSuccess: {
        title: {
          en: 'Success',
          fr: 'Succès',
        },
        message: {
          en: 'File deleted successfully',
          fr: 'Fichier supprimé avec succès',
        },
      },
      deleteError: {
        title: {
          en: 'Error',
          fr: 'Erreur',
        },
        message: {
          en: 'Failed to delete file',
          fr: 'Échec de la suppression du fichier',
        },
      },
    },
    fileType: {
      image: {
        en: 'Image',
        fr: 'Image',
      },
      pdf: {
        en: 'PDF',
        fr: 'PDF',
      },
    },
    helpSection: {
      title: {
        en: 'How to Find and Upload a Void Cheque from Your Banking App',
        fr: 'Comment trouver et téléverser un chèque annulé depuis votre application bancaire',
      },
      intro: {
        en: "Most major Canadian banks allow you to download or take a screenshot of a void cheque directly from their mobile app. Here's how:",
        fr: 'La plupart des grandes banques canadiennes vous permettent de télécharger ou de capturer une image d’un chèque annulé directement depuis leur application mobile. Voici comment :',
      },
      steps: {
        '1': {
          en: 'Log in to your banking app.',
          fr: 'Connectez-vous à votre application bancaire.',
        },
        '2': {
          en: 'Go to your account details or direct deposit information section.',
          fr: "Allez dans les détails de votre compte ou dans la section d'informations de dépôt direct.",
        },
        '3': {
          en: 'Look for an option called "Void Cheque," "Pre-Authorized Debit Form," or "Direct Deposit Form."',
          fr: 'Recherchez une option intitulée « Chèque annulé », « Formulaire de débit préautorisé » ou « Formulaire de dépôt direct ».',
        },
        '4': {
          en: 'Download or take a screenshot of the document showing:',
          fr: 'Téléchargez ou capturez une image du document montrant :',
        },
        fields: {
          '1': {
            en: 'Your full name',
            fr: 'Votre nom complet',
          },
          '2': {
            en: 'Transit number',
            fr: 'Numéro de transit',
          },
          '3': {
            en: 'Institution number',
            fr: "Numéro d'institution",
          },
          '4': {
            en: 'Account number',
            fr: 'Numéro de compte',
          },
        },
      },
    },
    buttons: {
      back: {
        en: 'Back',
        fr: 'Retour',
      },
      submit: {
        en: 'Submit',
        fr: 'Soumettre',
      },
      viewFile: {
        en: 'View File',
        fr: 'Voir le fichier',
      },
    },
  },
};
