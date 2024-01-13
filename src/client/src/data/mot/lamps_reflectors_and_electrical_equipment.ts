export const lampsReflectorsAndElectricalEquipment: Data.Section = {
  id: '4',
  name: 'Lamps, reflectors and electrical equipment',
  description:
    'Headlamp, position lamps, daytime running lamps, stop lamps, indicators, hazard warning lamps, fog lamps, reversing lamps, lighting ‘tell-tales’, trailer electrical socket, electrical wiring and battery rules and inspection for car and passenger vehicle MOT tests.',
  sections: [
    {
      id: '4.1',
      name: 'Headlamps',
      description: null,
      sections: [
        {
          id: '4.1.1',
          name: 'Presence, condition and operation',
          description: null,
          defects: [
            {
              id: '4.1.1.a.i',
              name: 'A headlamp - with up to ½ light sources not functioning in the case of LED',
              category: 'minor',
            },
            {
              id: '4.1.1.a.i',
              name: 'A headlamp - missing, inoperative or more than ½ not functioning in the case of LED',
              category: 'major',
            },
            {
              id: '4.1.1.b.i',
              name: 'Headlamp reflector or lens - slightly defective',
              category: 'minor',
            },
            {
              id: '4.1.1.b.i',
              name: 'Headlamp reflector or lens - seriously defective or missing',
              category: 'major',
            },
            {
              id: '4.1.1.c',
              name: 'Lamp not securely attached',
              category: 'major',
            },
          ],
        },
      ],
    },
  ],
};
