import React from 'react';
import { ContentLayout } from '../../../components/Layout';
import Accordion from '../../../components/Elements/Accordion/Accordion';
import { RadioButton } from '../../../components/Elements/Button/RadioButton';
import { PiWarningCircleFill } from 'react-icons/pi';
import { IoSkull } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

import { identificationOfTheVehicle } from '../../../data/mot/identification_of_the_vehicle';
import { brakes } from '../../../data/mot/brakes';
import { steering } from '../../../data/mot/steering';
import { visibility } from '../../../data/mot/visibility';
import { lampsReflectorsAndElectricalEquipment } from '../../../data/mot/lamps_reflectors_and_electrical_equipment';

export const Testing = () => {
  const InfiniteAnalRape = (section: Data.Section) => {
    return (
      <div>
        {section?.defects?.length > 0 &&
          section.defects.map((defect) => (
            <RadioButton
              key={defect.id}
              className="my-2"
              id={defect.id}
              selected={false}
              size="sm"
              startIcon={
                (defect.category === 'minor' && <PiWarningCircleFill className="text-yellow-400" />) ||
                (defect.category === 'major' && <PiWarningCircleFill className="text-red-600" />) ||
                (defect.category === 'dangerous' && <IoSkull className="text-red-600" />)
              }
              endIcon={<IoMdClose className="text-accent-light" />}
            >
              {defect.name}
            </RadioButton>
          ))}

        {section?.sections?.length > 0 && (
          <Accordion
            className="mt-1"
            accordions={section.sections.map((section) => ({
              id: section.id,
              title: `${section.name}`,
              content: InfiniteAnalRape(section),
            }))}
          />
        )}
      </div>
    );
  };

  return (
    <ContentLayout title="Testing">
      <div className="my-2">
        <Accordion
          className="mt-5"
          accordions={[
            {
              id: '0',
              title: 'Identification of the vehicle',
              content: InfiniteAnalRape(identificationOfTheVehicle),
            },
            {
              id: '1',
              title: 'Brakes',
              content: InfiniteAnalRape(brakes),
            },
            {
              id: '2',
              title: 'Steering',
              content: InfiniteAnalRape(steering),
            },
            {
              id: '3',
              title: 'Visibility',
              content: InfiniteAnalRape(visibility),
            },
            {
              id: '4',
              title: 'Lamps, reflectors and electrical equipment',
              content: InfiniteAnalRape(lampsReflectorsAndElectricalEquipment),
            },
            {
              id: '5',
              title: 'Axles, wheels, tyres and suspension',
              content: <></>,
            },
            {
              id: '6',
              title: 'Body, structure and attachments',
              content: <></>,
            },
            {
              id: '7',
              title: 'Other equipment',
              content: <></>,
            },
            {
              id: '8',
              title: 'Nuisance',
              content: <></>,
            },
            {
              id: '9',
              title: 'Supplementary tests for buses and coaches',
              content: <></>,
            },
            {
              id: '10',
              title: 'Seat belt installation checks',
              content: <></>,
            },
          ]}
        />
      </div>
    </ContentLayout>
  );
};

/* V1

<Accordion
          className="mt-5"
          accordions={[
            {
              title: 'Brakes',
              content: (
                <>
                  <div className="max-h-96 px-2 my-2 overflow-hidden overflow-y-auto">
                    {brakesDefects.map((defect) => (
                      <RadioButton
                        key={defect.id}
                        className="my-2"
                        id={defect.id}
                        selected={false}
                        size="sm"
                        startIcon={
                          (defect.category === 'minor' && <PiWarningCircleFill className="text-yellow-400" />) ||
                          (defect.category === 'major' && <PiWarningCircleFill className="text-red-600" />) ||
                          (defect.category === 'dangerous' && <IoSkull className="text-red-600" />)
                        }
                        endIcon={<IoMdClose className="text-accent-light" />}
                      >
                        {defect.name}
                      </RadioButton>
                    ))}
                  </div>
                  <Accordion
                    accordions={[
                      {
                        title: 'Brakes > Section Title',
                        content: (
                          <div className="max-h-96 px-2 overflow-hidden overflow-y-auto">
                            {brakesDefects.map((defect) => (
                              <RadioButton
                                key={defect.id}
                                className="my-2"
                                id={defect.id}
                                selected={false}
                                size="sm"
                                startIcon={
                                  (defect.category === 'minor' && (
                                    <PiWarningCircleFill className="text-yellow-400" />
                                  )) ||
                                  (defect.category === 'major' && <PiWarningCircleFill className="text-red-600" />) ||
                                  (defect.category === 'dangerous' && <IoSkull className="text-red-600" />)
                                }
                                endIcon={<IoMdClose className="text-accent-light" />}
                              >
                                {defect.name}
                              </RadioButton>
                            ))}
                          </div>
                        ),
                      },
                    ]}
                  />
                </>
              ),
            },
          ]}
        />
*/

/* V2
const InfiniteAnalRape = (section: Data.Section) => {
    return (
      <div>
        {section?.defects?.length > 0 &&
          section.defects.map((defect) => (
            <RadioButton
              key={defect.id}
              className="my-2"
              id={defect.id}
              selected={false}
              size="sm"
              startIcon={
                (defect.category === 'minor' && <PiWarningCircleFill className="text-yellow-400" />) ||
                (defect.category === 'major' && <PiWarningCircleFill className="text-red-600" />) ||
                (defect.category === 'dangerous' && <IoSkull className="text-red-600" />)
              }
              endIcon={<IoMdClose className="text-accent-light" />}
            >
              {defect.name}
            </RadioButton>
          ))}

        {section?.sections?.length > 0 &&
          section.sections.map((section) => (
            <Accordion
              key={section.id}
              className="mt-1"
              accordions={[
                {
                  title: section.name,
                  content: (
                    <div>
                      {section.defects?.length > 0 &&
                        section.defects.map((defect) => (
                          <RadioButton
                            key={defect.id}
                            className="my-2"
                            id={defect.id}
                            selected={false}
                            size="sm"
                            startIcon={
                              (defect.category === 'minor' && <PiWarningCircleFill className="text-yellow-400" />) ||
                              (defect.category === 'major' && <PiWarningCircleFill className="text-red-600" />) ||
                              (defect.category === 'dangerous' && <IoSkull className="text-red-600" />)
                            }
                            endIcon={<IoMdClose className="text-accent-light" />}
                          >
                            {defect.name}
                          </RadioButton>
                        ))}
                      {section.sections?.length > 0 &&
                        section.sections.map((section) => (
                          <Accordion
                            key={section.id}
                            className="mt-1"
                            accordions={[
                              {
                                title: section.name,
                                content: (
                                  <div>
                                    {section.defects?.length > 0 &&
                                      section.defects.map((defect) => (
                                        <RadioButton
                                          key={defect.id}
                                          className="my-2"
                                          id={defect.id}
                                          selected={false}
                                          size="sm"
                                          startIcon={
                                            (defect.category === 'minor' && (
                                              <PiWarningCircleFill className="text-yellow-400" />
                                            )) ||
                                            (defect.category === 'major' && (
                                              <PiWarningCircleFill className="text-red-600" />
                                            )) ||
                                            (defect.category === 'dangerous' && <IoSkull className="text-red-600" />)
                                          }
                                          endIcon={<IoMdClose className="text-accent-light" />}
                                        >
                                          {defect.name}
                                        </RadioButton>
                                      ))}
                                  </div>
                                ),
                              },
                            ]}
                          />
                        ))}
                    </div>
                  ),
                },
              ]}
            />
          ))}
      </div>
    );
  };
*/

/* V3
const InfiniteAnalRape = (section: Data.Section) => {
    return (
      <div>
        {section?.defects?.length > 0 &&
          section.defects.map((defect) => (
            <RadioButton
              key={defect.id}
              className="my-2"
              id={defect.id}
              selected={false}
              size="sm"
              startIcon={
                (defect.category === 'minor' && <PiWarningCircleFill className="text-yellow-400" />) ||
                (defect.category === 'major' && <PiWarningCircleFill className="text-red-600" />) ||
                (defect.category === 'dangerous' && <IoSkull className="text-red-600" />)
              }
              endIcon={<IoMdClose className="text-accent-light" />}
            >
              {defect.name}
            </RadioButton>
          ))}

        {section?.sections?.length > 0 && (
          <Accordion
            className="mt-1"
            accordions={section.sections.map((section) => ({
              title: section.name,
              content: InfiniteAnalRape(section),
            }))}
          />
        )}
      </div>
    );
  };
*/
