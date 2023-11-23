import React from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '../../../libs/auth';
import { APP_NAME } from '../../../constants';
import { Button } from '../../../components/Elements';

import ford_escort_cosworth from '../../../public/images/carousel/ford_escort_cosworth.jpg';
import peugeot_306_gti from '../../../public/images/carousel/peugeot_306_gti.jpg';
import renault_clio_200_rs from '../../../public/images/carousel/renault_clio_200_rs.jpg';
import volkswagen_golf_r32 from '../../../public/images/carousel/volkswagen_golf_r32.jpg';
import { SiVolkswagen, SiAudi, SiSeat, SiFord, SiVauxhall } from 'react-icons/si';
import { TeckStackIcon } from '../components/TeckStackIcon';
import { Carousel } from '../components/Carousel';
import { HomeLayout } from '../../../components/Layout';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <HomeLayout title="Home">
      <h1 className="my-20 xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-5xl font-extrabold text-white-light">
        Welcome to <span className="text-accent-light">{APP_NAME}</span>
      </h1>

      <Carousel images={[ford_escort_cosworth, peugeot_306_gti, renault_clio_200_rs, volkswagen_golf_r32]} />

      <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Engine Servicing</h2>
        <p className="px-5 text-lg font-normal text-white-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, eros eget consequat hendrerit, quam nisl
          tincidunt nisl, nec aliquet nisi lectus id massa. Nullam auctor, eros eget consequat hendrerit, quam nisl
          tincidunt nisl, nec aliquet nisi lectus id massa.
        </p>
        <div className="flex justify-center px-5 py-2">
          <Button className="mx-2 shadow-sm" variant="primary">
            Engine Servicing
          </Button>
        </div>
      </div>

      <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Replacements and Upgrades</h2>
        <p className="px-5 text-lg font-normal text-white-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, eros eget consequat hendrerit, quam nisl
          tincidunt nisl, nec aliquet nisi lectus id massa. Nullam auctor, eros eget consequat hendrerit, quam nisl
          tincidunt nisl, nec aliquet nisi lectus id massa.
        </p>
        <div className="flex justify-center px-5 py-2">
          <Button className="mx-2 shadow-sm" variant="primary">
            Replacements & Upgrades
          </Button>
        </div>
      </div>

      <div className="py-20 lg:w-4/6 sm:w-10/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Vehicles We Have Most Experience With</h2>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
          <TeckStackIcon title="Volkswagen" icon={SiVolkswagen} />
          <TeckStackIcon title="Audi" icon={SiAudi} />
          <TeckStackIcon title="Seat" icon={SiSeat} />
          <TeckStackIcon title="Ford" icon={SiFord} />
          <TeckStackIcon title="Vauxhall" icon={SiVauxhall} />
        </div>
      </div>

      <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Suspension, Brakes and Clutchs</h2>
        <p className="px-5 text-lg font-normal text-white-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, eros eget consequat hendrerit, quam nisl
          tincidunt nisl, nec aliquet nisi lectus id massa. Nullam auctor, eros eget consequat hendrerit, quam nisl
          tincidunt nisl, nec aliquet nisi lectus id massa.
        </p>
      </div>

      <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Car Audio</h2>
        <p className="px-5 text-lg font-normal text-white-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut auctor, eros eget consequat hendrerit, quam nisl
          tincidunt nisl, nec aliquet nisi lectus id massa. Nullam auctor, eros eget consequat hendrerit, quam nisl
          tincidunt nisl, nec aliquet nisi lectus id massa.
        </p>
      </div>

      <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Location</h2>
        <div className="w-fit m-auto text-left">
          <p className="px-5 text-lg font-bold text-white-dark">
            Country: <span className="font-normal">England</span>
          </p>
          <p className="px-5 text-lg font-bold text-white-dark">
            County: <span className="font-normal">Hampshire</span>
          </p>
          <p className="px-5 text-lg font-bold text-white-dark">
            City: <span className="font-normal">Reading</span>
          </p>
        </div>
      </div>
    </HomeLayout>
  );
};
