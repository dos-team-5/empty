/* eslint-disable @typescript-eslint/no-explicit-any */
export const step1FormConfig = (labels: any, language: 'en' | 'fr') => [
  {
    group: false,
    fields: [
      {
        name: 'name',
        type: 'text',
        label: labels.name[language],
        placeholder: language === 'en' ? 'John Doe' : 'Gabriel, Louise',
        required: true,
      },
      {
        name: 'phone',
        type: 'text',
        label: labels.phone[language],
        placeholder: '+1234567890',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        label: labels.email[language],
        placeholder: language === 'en' ? 'Wd3Y0@example.com' : 'gabriel@ex.com',
        required: true,
      },
      {
        name: 'password',
        type: 'password',
        label: labels.password[language],
        placeholder: '',
        required: true,
      },
      {
        name: 'streetAddress1',
        type: 'text',
        label: labels.streetAddress1[language],
        placeholder: '123 Main St, Toronto, ON, Canada',
        required: true,
      },
      {
        name: 'streetAddress2',
        type: 'text',
        label: labels.streetAddress2[language],
        placeholder: 'Apt 2B, Floor 2',
        required: false,
      },
    ],
  },
  {
    group: false,
    cols: 3,
    fields: [
      {
        name: 'city',
        type: 'text',
        label: labels.city[language],
        placeholder: 'Toronto',
        required: true,
      },
      {
        name: 'postalCode',
        type: 'text',
        label: labels.postalCode[language],
        placeholder: 'M4B 1B3',
        required: true,
      },
    ],
  },
  {
    group: true,
    cols: 3,
    fields: [
      {
        name: 'vehicleMake',
        type: 'text',
        label: labels.vehicleMake[language],
        placeholder: 'Toyota',
        required: true,
      },
      {
        name: 'vehicleModel',
        type: 'text',
        label: labels.vehicleModel[language],
        placeholder: 'Camry',
        required: true,
      },
      {
        name: 'vehicleYear',
        type: 'text',
        label: labels.vehicleYear[language],
        placeholder: '2020',
        required: true,
      },
    ],
  },
];
