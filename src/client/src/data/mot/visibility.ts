export const visibility: Data.Section = {
  id: '3',
  name: 'Visibility',
  description:
    'Field of vision, bonnet catches, condition of the glass, the view to the rear, windscreen wipers and windscreen washer rules and inspection for car and passenger vehicle MOT tests.',
  sections: [
    {
      id: '3.1',
      name: 'Field of vision',
      description: null,
      defects: [
        {
          id: '3.1.a.i',
          name: 'An obstruction - within the driver’s field of view that significantly affects his view in front or to the sides outside the swept area of windscreen',
          category: 'minor',
        },
        {
          id: '3.1.a.ii',
          name: 'An obstruction - significantly affecting the driver’s view of the road through the swept area of the windscreen or an obligatory external mirror not visible',
          category: 'major',
        },
        {
          id: '3.1.b.i',
          name: 'A bonnet - which cannot be safely secured in the closed position',
          category: 'major',
        },
        {
          id: '3.1.b.ii',
          name: 'A bonnet - seriously at risk of opening inadvertently',
          category: 'dangerous',
        },
        {
          id: '3.1.c',
          name: 'A bonnet primary retaining device excessively deteriorated, ineffective or insecure',
          category: 'major',
        },
      ],
    },
  ],
};
