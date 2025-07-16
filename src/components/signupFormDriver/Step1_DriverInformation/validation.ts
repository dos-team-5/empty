import { z } from 'zod';

const canadianPhoneRegex = /^\+?1?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const fileHandlerResSchema = z
  .object({
    key: z.string(),
    url: z.string().url(),
    size: z.number(),
    type: z.string(),
    name: z.string(),
  })
  .catchall(z.unknown());

const validationMessages = {
  name: {
    en: 'Full name is required',
    fr: 'Le nom complet est requis',
  },
  email: {
    en: 'Invalid email address',
    fr: 'Adresse e-mail invalide',
  },
  phone: {
    en: 'Phone number is required',
    fr: 'Le numéro de téléphone est requis',
  },
  password: {
    en: 'Password is required',
    fr: 'Le mot de passe est requis',
  },
  city: {
    en: 'City is required',
    fr: 'La ville est requise',
  },
  postalCode: {
    en: 'Postal code is required',
    fr: 'Le code postal est requis',
  },
  streetAddress1: {
    en: 'Street address is required',
    fr: "L'adresse de rue est requise",
  },
  vehicleMake: {
    en: 'Vehicle make is required',
    fr: 'La marque du véhicule est requise',
  },
  vehicleModel: {
    en: 'Vehicle model is required',
    fr: 'Le modèle du véhicule est requis',
  },
  vehicleYear: {
    en: 'Vehicle year must be a 4-digit number',
    fr: "L'année du véhicule doit comporter 4 chiffres",
  },
  vehiclePhotos: {
    min: {
      en: 'Please upload both front, side and back vehicle photos',
      fr: 'Veuillez télécharger les photos avant, latérale et arrière du véhicule',
    },
    max: {
      en: 'Only front, side and back vehicle photos are allowed',
      fr: 'Seules les photos avant, latérale et arrière du véhicule sont autorisées',
    },
  },
  rideSharePlatforms: {
    en: 'At least one ride-share platform is required',
    fr: 'Au moins une plateforme de covoiturage est requise',
  },
  weeklyDrivingSchedule: {
    en: 'Weekly driving schedule is required',
    fr: 'L’horaire de conduite hebdomadaire est requis',
  },
};

export const schemaForm1 = (lang: 'en' | 'fr') =>
  z.object({
    name: z.string().min(1, validationMessages.name[lang]),
    email: z.string().email(validationMessages.email[lang]),
    phone: z.string().trim().regex(canadianPhoneRegex, {
      message: validationMessages.phone[lang],
    }),
    password: z.string().min(1, validationMessages.password[lang]),
    city: z.string().min(1, validationMessages.city[lang]),
    postalCode: z
      .string()
      .regex(/^\d{5}$/, validationMessages.postalCode[lang]),
    streetAddress1: z.string().min(1, validationMessages.streetAddress1[lang]),
    vehicleMake: z.string().min(1, validationMessages.vehicleMake[lang]),
    vehicleModel: z.string().min(1, validationMessages.vehicleModel[lang]),
    vehicleYear: z
      .string()
      .regex(/^\d{4}$/, validationMessages.vehicleYear[lang]),
    vehiclePhotos: z
      .array(fileHandlerResSchema)
      .min(2, validationMessages.vehiclePhotos.min[lang])
      .max(4, validationMessages.vehiclePhotos.max[lang]),
    rideSharePlatforms: z
      .array(z.string())
      .min(1, validationMessages.rideSharePlatforms[lang]),
    weeklyDrivingSchedule: z
      .string()
      .min(1, validationMessages.weeklyDrivingSchedule[lang]),
  });
