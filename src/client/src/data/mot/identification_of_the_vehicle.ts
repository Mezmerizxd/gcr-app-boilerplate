export const identificationOfTheVehicle: Data.Section = {
  id: '0',
  name: 'Identification of the vehicle',
  description:
    'Registration plate (number plate) and vehicle identification number rules and inspection for car and passenger vehicle MOT tests.',
  sections: [
    {
      id: '0.1',
      name: 'Registration plate (number plate)',
      description:
        'Check the registration plate (number plate) of the vehicle meets the rules and is in good condition.',
      defects: [
        {
          id: '0.1.a',
          name: 'Number plate missing or so insecure that it is likely to fall off',
          category: 'major',
        },
        {
          id: '0.1.b',
          name: 'Number plate inscription missing or illegible',
          category: 'major',
        },
        {
          id: '0.1.c',
          name: 'Number plate showing an incorrect registration',
          category: 'major',
        },
        {
          id: '0.1.d',
          name: 'Number plate does not conform to the specified requirements',
          category: 'major',
        },
      ],
    },
    {
      id: '0.2',
      name: 'Vehicle identification number',
      description: 'Check the vehicle identification number (VIN) is present and legible.',
      defects: [
        {
          id: '0.2.a',
          name: 'VIN missing or cannot be found',
          category: 'major',
        },
        {
          id: '0.2.b',
          name: 'VIN incomplete, illegible or obviously falsified',
          category: 'major',
        },
        {
          id: '0.2.c',
          name: 'More than one different VIN displayed',
          category: 'major',
        },
      ],
    },
  ],
};
