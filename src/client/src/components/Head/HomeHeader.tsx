import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { APP_NAME, navigation_items } from '../../constants';
import { HeaderOption } from './HeaderOption';

const Navigation = ({ onSelect }: { onSelect?: () => void }) => {
  return (
    <>
      {navigation_items.map((item, index) => (
        <HeaderOption
          key={index}
          onClick={() => {
            onSelect && onSelect();
          }}
          name={item.name}
          href={item.to}
          customUrl={item.customUrl}
        />
      ))}
    </>
  );
};

type MobileSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileHeader = ({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) => {
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog as="div" static className="fixed inset-0 flex z-40" open={sidebarOpen} onClose={setSidebarOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-background-dark">
            <div className="flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1 mt-4">
                <Navigation onSelect={() => setSidebarOpen(false)} />
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  );
};

const HomeHeader = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div>
      <nav className="border-background-dark px-4 lg:px-6 py-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="items-center hidden sm:inline md:inline xl:inline">
            <span className="self-center text-1xl font-semibold whitespace-nowrap hover:text-accent-light">
              {APP_NAME}
            </span>
          </a>
          <div className="flex items-center m-0 lg:order-2">
            {' '}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-white-dark hover:text-accent-light rounded-lg lg:hidden hover:background-dark focus:outline-none focus:ring-2 focus:ring-background-dark"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <HiOutlineMenuAlt2 className="h-8 w-8" aria-hidden="true" />
              </svg>
            </button>
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0">
              <Navigation />
            </ul>
          </div>
        </div>
      </nav>
      <MobileHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default HomeHeader;
