import React from 'react';
import { useNavigate } from 'react-router';

import { useAuth } from '../../../libs/auth';
import { APP_NAME } from '../../../constants';
import { Button } from '../../../components/Elements';

import {
  BiLogoGoogleCloud,
  BiLogoNodejs,
  BiLogoPostgresql,
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript,
} from 'react-icons/bi';
import { SiExpress, SiSocketdotio, SiVercel } from 'react-icons/si';
import { TeckStackIcon } from '../components/TeckStackIcon';
import { HomeLayout } from '../../../components/Layout';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <HomeLayout title="Home">
      <h1 className="my-20 xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-5xl font-extrabold text-white-light">
        {APP_NAME}
      </h1>
      <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">What is Google Cloud Run App Boilerplate?</h2>
        <p className="px-5 text-lg font-normal text-white-dark">
          Google Cloud Run App Boilerplate is a simple and easy-to-use template for deploying apps on Google Cloud Run.
          It consists of a Server and a Client. The Server hosts the Client's static files, and the Server's API Routes
          are accessible at `/api/v1`.
        </p>
        <div className="flex justify-center px-5 py-2">
          <Button
            className="mx-2"
            variant="primary"
            onClick={() => (!user?.profile ? navigate('/auth/login') : navigate('/app'))}
          >
            Login
          </Button>
          <Button
            className="mx-2"
            variant="inverse"
            onClick={() => (!user?.profile ? navigate('/auth/register') : navigate('/app'))}
          >
            Register
          </Button>
        </div>
      </div>

      <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">What is Google Cloud Run?</h2>
        <p className="px-5 text-lg font-normal text-white-dark">
          Google Cloud Run is a fully managed compute platform that automatically scales your stateless containers.
          Cloud Run is serverless: it abstracts away all infrastructure management, so you can focus on what matters
          most — building great applications. It is built on open source Knative, which provides portability across
          clouds and on-premises.
        </p>
        <div className="flex justify-center px-5 py-2">
          <Button
            className="mx-2"
            variant="primary"
            onClick={() => window.open('https://cloud.google.com/run', '_blank')}
          >
            Learn More
          </Button>
        </div>
      </div>

      <div className="py-20 lg:w-4/6 sm:w-10/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Tech Stack</h2>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
          <TeckStackIcon title="NodeJs" icon={BiLogoNodejs} href="https://nodejs.org/en/docs" />
          <TeckStackIcon
            title="PostgreSQL"
            icon={BiLogoPostgresql}
            href="https://www.postgresql.org/docs/current/index.html"
          />
          <TeckStackIcon title="Express" icon={SiExpress} href="https://expressjs.com/" />
          <TeckStackIcon title="Socket.io" icon={SiSocketdotio} href="https://socket.io/docs/v4/" />
          <TeckStackIcon title="TypeScript" icon={BiLogoTypescript} href="https://www.typescriptlang.org/docs/" />
          <TeckStackIcon title="React" icon={BiLogoReact} href="https://react.dev/learn" />
          <TeckStackIcon
            title="Tailwind CSS"
            icon={BiLogoTailwindCss}
            href="https://tailwindcss.com/docs/installation"
          />
          <TeckStackIcon title="Vercel" icon={SiVercel} href="https://vercel.com/docs" />
          <TeckStackIcon title="Google Cloud" icon={BiLogoGoogleCloud} href="https://cloud.google.com/?hl=en" />
        </div>
      </div>

      <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
        <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Google Cloud Deployment</h2>
        <p className="px-5 text-lg font-normal text-white-dark">
          The deployment process involves building the Docker image, pushing it to Google Cloud Registry, and deploying
          it to Google Cloud Run. Find the deployment script in the project root{' '}
          <span
            className="text-accent-light cursor-pointer hover:text-accent-dark duration-150"
            onClick={() => {
              window.open('https://github.com/Mezmerizxd/gcr-app-boilerplate/blob/main/deploy.js', '_blank');
            }}
          >
            deploy.js
          </span>
          . Before deploying, ensure you configure the .env file according to your requirements. Please be aware that
          Google Cloud Run incurs costs; you can review the pricing details{' '}
          <span
            className="text-accent-light cursor-pointer hover:text-accent-dark duration-150"
            onClick={() => {
              window.open('https://cloud.google.com/run/pricing', '_blank');
            }}
          >
            here
          </span>
          .
        </p>
      </div>
    </HomeLayout>
  );
};
