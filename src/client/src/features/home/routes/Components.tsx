import React from 'react';
import { Button, Spinner, Table } from '../../../components/Elements';
import Accordion from '../../../components/Elements/Accordion/Accordion';
import Card from '../../../components/Elements/Card/Card';
import Carousel from '../../../components/Elements/Carousel/Carousel';
import { RadioButton } from '../../../components/Elements/Button/RadioButton';
import { PiWarningCircleFill } from 'react-icons/pi';
import { IoSkull } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

import { brakes } from '../../../data/mot/brakes';

const HomeLayout = React.lazy(() => import('../../../components/Layout/HomeLayout'));

type DemoTableProps = {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
};

export const Components = () => {
  const defects: Data.Defect[] = [];

  const getDefects = (section: Data.Section) => {
    if (defects.length > 20) return; // Limit to 20 defects

    if (section.defects) {
      defects.push(...section.defects);
    }

    if (section.sections) {
      section.sections.forEach((section) => getDefects(section));
    }
  };

  brakes.sections.forEach((section) => getDefects(section));

  return (
    <HomeLayout title="Home">
      <div className="mt-10">
        <h1 className="text-center">Buttons</h1>
        <div className="grid grid-cols-4 space-x-5 p-5">
          <Button className="m-2 ml-5" variant="primary">
            Primary
          </Button>
          <Button className="m-2" variant="inverse">
            Inverse
          </Button>
          <Button className="m-2" variant="inverse2">
            Inverse2
          </Button>
          <Button className="m-2" variant="hidden">
            Hidden
          </Button>
          <Button className="m-2" variant="hidden2">
            Hidden2
          </Button>
          <Button className="m-2" variant="danger">
            Danger
          </Button>
        </div>
      </div>

      <div className="mt-10 mr-2">
        <h1 className="text-center">Radio Buttons {'(Tags)'}</h1>
        <div className="p-5 max-h-[300px] overflow-x-hidden overflow-y-auto">
          {defects.map((defect) => (
            <RadioButton
              key={defect.id}
              className="m-2"
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
      </div>

      <div className="m-auto mt-10 w-11/12">
        <h1 className="text-center">Accordions</h1>
        <Accordion
          className="mt-5"
          accordions={[
            {
              title: 'Accordion 1',
              content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            },
            {
              title: 'Accordion 2',
              content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            },
          ]}
        />
      </div>

      <div className="mt-10">
        <h1 className="text-center">Cards</h1>
        <Card title="Title goes here" content="Content" image={'https://picsum.photos/seed/picsum/300/200'} />
      </div>

      <div className="mt-10">
        <h1 className="text-center">Carousels</h1>
        <Carousel
          className="mt-5"
          images={['https://picsum.photos/seed/picsum/1920/1080', 'https://picsum.photos/seed/picsum/1920/1080']}
        />
      </div>

      <div className="mt-10">
        <h1 className="text-center">Spinners</h1>
        <div className="grid grid-cols-3 space-x-3 p-3 mt-5">
          <Spinner className="m-5" size="sm" />
          <Spinner className="m-5" size="md" />
          <Spinner className="m-5" size="lg" />
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-center">Tables</h1>
        <div className="max-w-6xl m-auto p-5 sm:p-0">
          <Table<DemoTableProps>
            data={[
              { id: '1', name: 'John Doe', email: 'JohnDoe@email.com', createdAt: new Date() },
              { id: '2', name: 'John Doe 2', email: 'JohnDoe2@email.com', createdAt: new Date() },
            ]}
            columns={[
              {
                title: 'ID',
                field: 'id',
              },
              {
                title: 'Name',
                field: 'name',
              },
              {
                title: 'Email',
                field: 'email',
              },
              {
                title: 'Created At',
                field: 'createdAt',
                Cell: ({ entry }) => <>{entry.createdAt?.toLocaleDateString()}</>,
              },
            ]}
          />
        </div>
      </div>
    </HomeLayout>
  );
};
