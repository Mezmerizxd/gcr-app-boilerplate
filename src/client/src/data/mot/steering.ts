export const steering: Data.Section = {
  id: '2',
  name: 'Steering',
  description:
    'Mechanical condition, steering wheel and column or handlebar, forks and yokes, steering play and electronic power steering (EPS) rules and inspection for car and passenger vehicle MOT tests.',
  sections: [
    {
      id: '2.1',
      name: 'Mechanical condition',
      description: null,
      sections: [
        {
          id: '2.1.1',
          name: 'Steering gear condition',
          description: null,
          defects: [
            {
              id: '2.1.1.a',
              name: 'Excessive roughness in operation of steering',
              category: 'major',
            },
            {
              id: '2.1.1.b.i',
              name: 'Sector shaft - twisted or splines excessively worn',
              category: 'major',
            },
            {
              id: '2.1.1.b.ii',
              name: 'Sector shaft - twisted or splines worn to the extent that functionality is affected',
              category: 'dangerous',
            },
            {
              id: '2.1.1.c.i',
              name: 'Sector shaft - excessively worn',
              category: 'major',
            },
            {
              id: '2.1.1.c.ii',
              name: 'Sector shaft - worn to the extent that functionality is affected',
              category: 'dangerous',
            },
            {
              id: '2.1.1.d.i',
              name: 'Sector shaft - has excessive movement',
              category: 'major',
            },
            {
              id: '2.1.1.d.ii',
              name: 'Sector shaft - movement so excessive that functionality is affected',
              category: 'dangerous',
            },
            {
              id: '2.1.1.e.i',
              name: 'Steering box - leaking oil',
              category: 'minor',
            },
            {
              id: '2.1.1.e.ii',
              name: 'Steering box - leaking to the extent that oil is dripping',
              category: 'major',
            },
          ],
        },
      ],
    },
  ],
};
