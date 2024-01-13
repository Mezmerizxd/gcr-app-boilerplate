export const brakes: Data.Section = {
  id: '1',
  name: 'Brakes',
  description:
    'Brake condition and operation, service brakes, secondary brakes, parking brakes, anti-lock braking system (ABS), electronic braking system (EBS) and brake fluid rules and inspection for car and passenger vehicle MOT tests.',
  sections: [
    {
      id: '1.1',
      name: 'Condition and operation',
      description: null,
      sections: [
        {
          id: '1.1.1',
          name: 'Service brake pedal or hand lever pivot',
          description: null,
          defects: [
            {
              id: '1.1.1.a',
              name: 'Pivot too tight',
              category: 'major',
            },
            {
              id: '1.1.1.b',
              name: 'Excessive wear or free play',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.2',
          name: 'Service brake pedal or hand lever condition and travel',
          description: null,
          defects: [
            {
              id: '1.1.2.a',
              name: 'Insufficient reserve travel',
              category: 'major',
            },
            {
              id: '1.1.2.b.i',
              name: 'Service brake control - not releasing correctly',
              category: 'minor',
            },
            {
              id: '1.1.2.b.ii',
              name: 'Service brake control - functionality of brakes affected',
              category: 'major',
            },
            {
              id: '1.1.2.c',
              name: 'Anti-slip provision missing, loose or worn smooth',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.3',
          name: 'Air and vacuum systems',
          description: null,
          defects: [
            {
              id: '1.1.3.a.i',
              name: 'Insufficient pressure/vacuum assistance for less than - four brake applications after the warning device has operated (or gauge shows an unsafe reading)',
              category: 'major',
            },
            {
              id: '1.1.3.a.ii',
              name: 'Insufficient pressure/vacuum assistance for less than -  two brake applications after warning device has operated (or gauge shows an unsafe reading)',
              category: 'dangerous',
            },
            {
              id: '1.1.3.b',
              name: 'Time taken to build up air pressure/vacuum to safe working value not in accordance with the requirements',
              category: 'major',
            },
            {
              id: '1.1.3.c',
              name: 'Repeated operation of any ancillary air or vacuum system completely depletes the stored air or vacuum for the braking system',
              category: 'major',
            },
            {
              id: '1.1.3.d',
              name: 'Air leak causing a noticeable drop in pressure or audible air leak',
              category: 'major',
            },
            {
              id: '1.1.3.e',
              name: 'External damage likely to affect the function of the braking system',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.4',
          name: 'Low-pressure warning',
          description: null,
          defects: [
            {
              id: '1.1.4.a.i',
              name: 'Low-pressure warning gauge or indicator - malfunctioning or defective',
              category: 'minor',
            },
            {
              id: '1.1.4.a.ii',
              name: 'Low-pressure warning gauge or indicator - not identifying low-pressure',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.5',
          name: 'Hand operated brake control valve',
          description: null,
          defects: [
            {
              id: '1.1.5.a',
              name: 'Control cracked, damaged or excessively worn',
              category: 'major',
            },
            {
              id: '1.1.5.b',
              name: 'Control insecure on valve or valve insecure',
              category: 'major',
            },
            {
              id: '1.1.5.c',
              name: 'Loose connections or leaks in the system',
              category: 'major',
            },
            {
              id: '1.1.5.d',
              name: 'Malfunctioning',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.6',
          name: 'Parking brake lever or control',
          description: null,
          defects: [
            {
              id: '1.1.6.a',
              name: 'Ratchet not holding correctly',
              category: 'major',
            },
            {
              id: '1.1.6.b.i',
              name: 'Parking brake lever pivot or ratchet mechanism - obviously worn',
              category: 'minor',
            },
            {
              id: '1.1.6.b.ii',
              name: 'Parking brake lever pivot or ratchet mechanism - worn to the extent that the brake may inadvertently release',
              category: 'major',
            },
            {
              id: '1.1.6.c',
              name: 'Parking brake lever has excessive movement indicating incorrect adjustment',
              category: 'major',
            },
            {
              id: '1.1.6.d',
              name: 'Parking brake control missing, defective or inoperative',
              category: 'major',
            },
            {
              id: '1.1.6.e',
              name: 'Electronic parking brake MIL indicates a malfunction',
              category: 'major',
            },
            {
              id: '1.1.6.f',
              name: 'Parking brake is not capable of being maintained in operation by direct mechanical action only (vehicle first used on or after 1 January 1968)',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.7',
          name: 'Service brake pedal or hand lever pivot',
          description: null,
          defects: [
            {
              id: '1.1.7.a.i',
              name: 'Valve - damaged or excessive air leak',
              category: 'major',
            },
            {
              id: '1.1.7.a.ii',
              name: 'Valve - leaking such that brake functionality is affected',
              category: 'dangerous',
            },
            {
              id: '1.1.7.b',
              name: 'Excessive oil discharge from a compressor or brake valve',
              category: 'minor',
            },
            {
              id: '1.1.7.c',
              name: 'Valve insecure or inadequately mounted',
              category: 'major',
            },
            {
              id: '1.1.7.d.i',
              name: 'Hydraulic fluid - leak from a brake valve',
              category: 'major',
            },
            {
              id: '1.1.7.d.ii',
              name: 'Hydraulic fluid - leak from a brake valve such that brake functionality is affected',
              category: 'dangerous',
            },
          ],
        },
        {
          id: '1.1.8',
          name: 'Not in use',
          description: null,
        },
        {
          id: '1.1.9',
          name: 'Pressure storage reservoirs',
          description: null,
          defects: [
            {
              id: '1.1.9.a.i',
              name: 'Reservoir - has minor damage or corrosion',
              category: 'minor',
            },
            {
              id: '1.1.9.a.ii',
              name: 'Reservoir - heavily damaged, heavily corroded or leaking',
              category: 'major',
            },
            {
              id: '1.1.9.b.i',
              name: 'Drain device on an air brake system - operation affected',
              category: 'minor',
            },
            {
              id: '1.1.9.b.ii',
              name: 'Drain device on an air brake system - inoperative',
              category: 'major',
            },
            {
              id: '1.1.9.c',
              name: 'Reservoir insecure or inadequately mounted',
              category: 'major',
            },
          ],
        },

        {
          id: '1.1.10',
          name: 'Brake servo units and master cylinder (hydraulic systems)',
          description: null,
          defects: [
            {
              id: '1.1.10.a.i',
              name: 'Brake servo - defective or ineffective',
              category: 'major',
            },
            {
              id: '1.1.10.a.ii',
              name: 'Brake servo - inoperative',
              category: 'dangerous',
            },
            {
              id: '1.1.10.b.i',
              name: 'Master cylinder - defective but brake still operating',
              category: 'major',
            },
            {
              id: '1.1.10.b.ii',
              name: 'Master cylinder - leaking',
              category: 'dangerous',
            },
            {
              id: '1.1.10.c',
              name: 'Master cylinder insecure',
              category: 'major',
            },
            {
              id: '1.1.10.d.i',
              name: 'Brake fluid - below minimum mark',
              category: 'minor',
            },
            {
              id: '1.1.10.d.ii',
              name: 'Brake fluid - significantly below minimum mark',
              category: 'major',
            },
            {
              id: '1.1.10.d.iii',
              name: 'Brake fluid - not visible',
              category: 'dangerous',
            },
            {
              id: '1.1.10.e',
              name: 'Master cylinder reservoir cap missing',
              category: 'major',
            },
            {
              id: '1.1.10.f',
              name: 'Brake fluid warning light illuminated or defective',
              category: 'minor',
            },
            {
              id: '1.1.10.g',
              name: 'Incorrect functioning of brake fluid level warning device',
              category: 'minor',
            },
          ],
        },
        {
          id: '1.1.11',
          name: 'Rigid brake pipes',
          description: null,
          defects: [
            {
              id: '1.1.11.a',
              name: 'Brake pipe is at imminent risk of failure or fracture',
              category: 'dangerous',
            },
            {
              id: '1.1.11.b.i',
              name: 'Leaking brake pipe or connection - on an air brake system',
              category: 'major',
            },
            {
              id: '1.1.11.b.ii',
              name: 'Leaking brake pipe or connection - on a hydraulic system',
              category: 'dangerous',
            },
            {
              id: '1.1.11.c',
              name: 'Brake pipe damaged or excessively corroded',
              category: 'major',
            },
            {
              id: '1.1.11.d.i',
              name: 'Brake pipe - inadequately clipped or supported',
              category: 'minor',
            },
            {
              id: '1.1.11.d.ii',
              name: 'Brake pipe - likely to become detached or damaged',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.12',
          name: 'Flexible brake hoses',
          description: null,
          defects: [
            {
              id: '1.1.12.a',
              name: 'Brake hose damaged and likely to fail',
              category: 'dangerous',
            },
            {
              id: '1.1.12.b.i',
              name: 'Flexible brake hose - slightly damaged, chafed or twisted',
              category: 'minor',
            },
            {
              id: '1.1.12.b.ii',
              name: 'Flexible brake hose - excessively damaged, deteriorated, chafed, twisted or stretched',
              category: 'major',
            },
            {
              id: '1.1.12.c.i',
              name: 'Brake hoses or connections leaking on - air brake systems',
              category: 'major',
            },
            {
              id: '1.1.12.c.ii',
              name: 'Brake hoses or connections leaking on - hydraulic systems',
              category: 'dangerous',
            },
            {
              id: '1.1.12.d',
              name: 'Brake hose bulging under pressure',
              category: 'major',
            },
            {
              id: '1.1.12.e',
              name: 'Brake hose porous',
              category: 'major',
            },
            {
              id: '1.1.12.f.i',
              name: 'Brake hose ferrules - excessively corroded',
              category: 'major',
            },
            {
              id: '1.1.12.f.ii',
              name: 'Brake hose ferrules - excessively corroded and likely to fail',
              category: 'dangerous',
            },
          ],
        },
        {
          id: '1.1.13',
          name: 'Brake linings and pads',
          description: null,
          defects: [
            {
              id: '1.1.13.a.i',
              name: 'Brake lining or pad - worn down to wear indicator',
              category: 'major',
            },
            {
              id: '1.1.13.a.ii',
              name: 'Brake lining or pad - worn below 1.5mm',
              category: 'dangerous',
            },
            {
              id: '1.1.13.b',
              name: 'Brake lining or pad contaminated with oil, grease etc.',
              category: 'major',
            },
            {
              id: '1.1.13.c',
              name: 'Brake lining or pad missing or incorrectly mounted',
              category: 'dangerous',
            },
          ],
        },
        {
          id: '1.1.14',
          name: 'Brake discs and drums',
          description: null,
          defects: [
            {
              id: '1.1.14.a.i',
              name: 'Brake disc or drum - significantly and obviously worn',
              category: 'major',
            },
            {
              id: '1.1.14.a.ii',
              name: 'Brake disc or drum - insecure, fractured or otherwise likely to fail',
              category: 'dangerous',
            },
            {
              id: '1.1.14.b',
              name: 'Contaminated with oil, grease etc.',
              category: 'major',
            },
            {
              id: '1.1.14.c',
              name: 'Missing',
              category: 'dangerous',
            },
            {
              id: '1.1.14.d',
              name: 'Brake drum back plate insecure',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.15',
          name: 'Brake cables, rods, levers and linkages',
          description: null,
          defects: [
            {
              id: '1.1.15.a',
              name: 'Cable damaged or knotted',
              category: 'major',
            },
            {
              id: '1.1.15.b',
              name: 'Component excessively worn or corroded',
              category: 'major',
            },
            {
              id: '1.1.15.c',
              name: 'Cable, rod or joint insecure',
              category: 'major',
            },
            {
              id: '1.1.15.d',
              name: 'Cable guide defective affecting operation',
              category: 'major',
            },
            {
              id: '1.1.15.e',
              name: 'Restriction in free movement of the braking system',
              category: 'major',
            },
            {
              id: '1.1.15.f',
              name: 'Abnormal movement of levers indicating maladjustment or excessive wear',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.16',
          name: 'Brake actuators - including spring brakes, hydraulic cylinders and callipers',
          description: null,
          defects: [
            {
              id: '1.1.16.a.i',
              name: 'Actuator cracked or damaged and - braking performance not affected',
              category: 'major',
            },
            {
              id: '1.1.16.a.ii',
              name: 'Actuator cracked or damaged and - braking performance affected',
              category: 'dangerous',
            },
            {
              id: '1.1.16.b.i',
              name: 'Actuator leaking and - braking performance not affected',
              category: 'major',
            },
            {
              id: '1.1.16.b.ii',
              name: 'Actuator leaking and - braking performance affected',
              category: 'dangerous',
            },
            {
              id: '1.1.16.c.i',
              name: 'Actuator insecure or inadequately mounted and - braking performance not affected',
              category: 'major',
            },
            {
              id: '1.1.16.c.ii',
              name: 'Actuator insecure or inadequately mounted and - braking performance affected',
              category: 'dangerous',
            },
            {
              id: '1.1.16.d.i',
              name: 'Actuator - excessively corroded',
              category: 'major',
            },
            {
              id: '1.1.16.d.ii',
              name: 'Actuator - excessively corroded and likely to crack',
              category: 'dangerous',
            },
            {
              id: '1.1.16.e.i',
              name: 'Actuator has - excessive travel of operating system indicating need for adjustment',
              category: 'major',
            },
            {
              id: '1.1.16.e.ii',
              name: 'Actuator has - no reserve travel and braking performance affected',
              category: 'dangerous',
            },
          ],
        },
        {
          id: '1.1.17',
          name: 'Load sensing valve',
          description: null,
          defects: [
            {
              id: '1.1.17.a',
              name: 'Load sensing valve linkage defective',
              category: 'major',
            },
            {
              id: '1.1.17.b',
              name: 'Load sensing valve linkage obviously incorrectly adjusted',
              category: 'major',
            },
            {
              id: '1.1.17.c.i',
              name: 'Load sensing valve seized or inoperative and - ABS functioning',
              category: 'major',
            },
            {
              id: '1.1.17.c.ii',
              name: 'Load sensing valve seized or inoperative and - ABS not fitted or inoperative',
              category: 'dangerous',
            },
            {
              id: '1.1.17.d',
              name: 'Load sensing valve missing where fitted as standard',
              category: 'dangerous',
            },
          ],
        },
        {
          id: '1.1.18',
          name: 'Brake slack adjuster',
          description: null,
          defects: [
            {
              id: '1.1.18.a',
              name: 'Adjuster damaged, seized or having abnormal movement, excessive wear or incorrect adjustment',
              category: 'major',
            },
            {
              id: '1.1.18.b',
              name: 'Adjuster defective',
              category: 'major',
            },
            {
              id: '1.1.18.c',
              name: 'Incorrectly installed',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.19',
          name: 'Additional braking device (retarder), if fitted',
          description: null,
          defects: [
            {
              id: '1.1.19.a.i',
              name: 'Endurance braking system connectors or mountings - insecure',
              category: 'minor',
            },
            {
              id: '1.1.19.a.ii',
              name: 'Endurance braking system connectors or mountings - insecure and functionality affected',
              category: 'major',
            },
            {
              id: '1.1.19.b',
              name: 'Endurance braking system obviously defective',
              category: 'major',
            },
          ],
        },
        {
          id: '1.1.20',
          name: 'Not in use',
          description: null,
        },

        {
          id: '1.1.21',
          name: '',
          description: null,
          defects: [
            {
              id: '1.1.21.a.i',
              name: 'Other braking system (e.g. antifreeze pump, air dryer etc.) component damaged or corroded - to the extent that the braking system is adversely affected',
              category: 'major',
            },
            {
              id: '1.1.21.a.ii',
              name: 'Other braking system (e.g. antifreeze pump, air dryer etc.) component damaged or corroded - leaking and system functionality adversely affected',
              category: 'dangerous',
            },

            {
              id: '1.1.21.b.i',
              name: 'Air or antifreeze - leaking',
              category: 'minor',
            },
            {
              id: '1.1.21.b.ii',
              name: 'Air or antifreeze - to the extent that braking performance is affected',
              category: 'major',
            },

            {
              id: '1.1.21.c',
              name: 'Any component insecure or inadequately mounted',
              category: 'major',
            },

            {
              id: '1.1.21.d.i',
              name: 'Braking system component modification - unsafe',
              category: 'major',
            },
            {
              id: '1.1.21.d.ii',
              name: 'Braking system component modification - adversely affecting braking performance',
              category: 'dangerous',
            },

            {
              id: '1.1.21.e.i',
              name: 'The strength or continuity of the load bearing structure within 30cm of any braking system actuation component mounting (a prescribed area) - is significantly reduced',
              category: 'major',
            },
            {
              id: '1.1.21.e.ii',
              name: 'The strength or continuity of the load bearing structure within 30cm of any braking system actuation component mounting (a prescribed area) - is so weakened that the functionality of the braking system is affected',
              category: 'dangerous',
            },
          ],
        },
      ],
    },
    {
      id: '1.2',
      name: 'Service brake performance and efficiency',
      description: null,
      sections: [
        {
          id: '1.2.1',
          name: 'Performance',
          description: null,
          defects: [
            {
              id: '1.2.1.a.i',
              name: 'Braking effort - inadequate at a wheel',
              category: 'major',
            },
            {
              id: '1.2.1.a.ii',
              name: 'Braking effort - not recording at a wheel',
              category: 'dangerous',
            },
            {
              id: '1.2.1.b.i',
              name: 'Brakes imbalance across an axle such that - the braking effort from any wheel is less than 70% of the maximum effort recorded from the other wheel on the same axle. Or in the case of testing on the road, the vehicle deviates excessively from a straight line',
              category: 'major',
            },
            {
              id: '1.2.1.b.ii',
              name: 'Brakes imbalance across an axle such that - the braking effort from any wheel is less than 50% of the maximum effort recorded from the other wheel on a steered axle',
              category: 'dangerous',
            },
            {
              id: '1.2.1.c',
              name: 'A brake on any wheel grabbing severely',
              category: 'major',
            },
            {
              id: '1.2.1.d',
              name: 'Abnormal lag in brake operation on a wheel',
              category: 'major',
            },
            {
              id: '1.2.1.e',
              name: 'Excessive fluctuation in brake effort through each wheel revolution',
              category: 'major',
            },
            {
              id: '1.2.1.f',
              name: 'Significant brake effort recorded with no brake applied indicating a binding brake',
              category: 'major',
            },
            {
              id: '1.2.1.g',
              name: 'Brake performance unable to be tested',
              category: 'major',
            },
          ],
        },
        {
          id: '1.2.2',
          name: 'Efficiency',
          description: null,
          defects: [
            {
              id: '1.2.2.a.i',
              name: 'Service brake efficiency - below minimum requirement',
              category: 'major',
            },
            {
              id: '1.2.2.a.ii',
              name: 'Service brake efficiency - less than 50% of the required value',
              category: 'dangerous',
            },
          ],
        },
      ],
    },
    {
      id: '1.3',
      name: 'Secondary brake performance and efficiency',
      description: null,
      sections: [
        {
          id: '1.3.1',
          name: 'Performance',
          description: null,
          defects: [
            {
              id: '1.2.1.a.i',
              name: 'Braking effort - inadequate at any wheel',
              category: 'major',
            },
            {
              id: '1.2.1.a.ii',
              name: 'Braking effort - not recording at any wheel',
              category: 'dangerous',
            },
            {
              id: '1.2.1.b.i',
              name: 'Brakes imbalance across an axle such that - the braking effort from any wheel is less than 70% of the maximum effort recorded from the other wheel on the same axle. Or in the case of testing on the road, the vehicle deviates excessively from a straight line.',
              category: 'major',
            },
            {
              id: '1.2.1.b.ii',
              name: 'Brakes imbalance across an axle such that - the braking effort from any wheel is less than 50% of the maximum effort recorded from the other wheel on a steered axle',
              category: 'dangerous',
            },
            {
              id: '1.2.1.c',
              name: 'A brake on any wheel grabbing severely',
              category: 'major',
            },
          ],
        },
        {
          id: '1.3.2',
          name: 'Efficiency',
          description: null,
          defects: [
            {
              id: '1.2.2.a.i',
              name: 'Parking brake efficiency - below minimum requirement',
              category: 'major',
            },
            {
              id: '1.2.2.a.ii',
              name: 'Parking brake efficiency - less than 50% of the required value',
              category: 'dangerous',
            },
          ],
        },
      ],
    },
    {
      id: '1.4',
      name: 'Parking brake performance and efficiency',
      description: null,
      sections: [
        {
          id: '1.4.1',
          name: 'Performance',
          description: null,
          defects: [
            {
              id: '1.4.1.a',
              name: 'Parking brake inoperative on one side, or in the case of testing on the road, the vehicle deviates excessively from a straight line',
              category: 'major',
            },
          ],
        },
        {
          id: '1.4.2',
          name: 'Efficiency',
          description: null,
          defects: [
            {
              id: '1.4.2.a.i',
              name: 'Parking brake efficiency - below minimum requirement',
              category: 'major',
            },
            {
              id: '1.4.2.a.ii',
              name: 'Parking brake efficiency - less than 50% of the required value',
              category: 'dangerous',
            },
          ],
        },
      ],
    },
    {
      id: '1.5',
      name: 'Additional braking device (retarder) performance',
      description: null,
      defects: [
        {
          id: '1.5.a',
          name: 'Control for electronic retarder does not allow gradual variation in effort',
          category: 'major',
        },
        {
          id: '1.5.b',
          name: 'System obviously inoperative',
          category: 'major',
        },
      ],
    },
    {
      id: '1.6',
      name: 'Anti-lock braking system (ABS)',
      description: null,
      defects: [
        {
          id: '1.6.a',
          name: 'Warning device not working',
          category: 'major',
        },
        {
          id: '1.6.b',
          name: 'Warning device shows system malfunction',
          category: 'major',
        },
        {
          id: '1.6.c',
          name: 'Wheel speed sensors missing or damaged',
          category: 'major',
        },
        {
          id: '1.6.d',
          name: 'Wiring damaged',
          category: 'major',
        },
        {
          id: '1.6.e',
          name: 'Other components missing or damaged',
          category: 'major',
        },
        {
          id: '1.6.f',
          name: 'ABS system obviously removed',
          category: 'major',
        },
      ],
    },
    {
      id: '1.7',
      name: 'Electronic braking system (EBS)',
      description: null,
      defects: [
        {
          id: '1.7.a',
          name: 'Warning device not working',
          category: 'major',
        },
        {
          id: '1.7.b',
          name: 'Warning device shows system malfunction',
          category: 'major',
        },
      ],
    },
    {
      id: '1.8',
      name: 'Brake fluid',
      description: null,
      defects: [
        {
          id: '1.8.a',
          name: 'Brake fluid contaminated',
          category: 'major',
        },
      ],
    },
  ],
};
