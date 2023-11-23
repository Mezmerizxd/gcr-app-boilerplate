import * as React from 'react';
import { Head } from '../Head';
import HomeHeader from '../Head/HomeHeader';
import { Footer } from '../Footer';

type HomeLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const HomeLayout = ({ children, title }: HomeLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="flex flex-col max-w-full min-h-screen bg-background">
        <HomeHeader />
        <main className="flex-grow max-w-full mx-auto align-middle text-center justify-center items-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
