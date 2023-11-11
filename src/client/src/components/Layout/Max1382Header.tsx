import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HeaderOption } from '../../features/home/components/HeaderOption';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { Button } from '../Elements';

const APP_NAME = 'Max1382';

type NavigationItem = {
  name: string;
  to: string;
};

const Navigation = ({ onSelect }: { onSelect?: () => void }) => {
  const navigation = [
    { name: 'Home', to: '.' },
    {
      name: 'BEFF Pages',
      to: '.',
    },
    {
      name: 'PS4 Boosts',
      to: '.',
    },
    {
      name: 'MaxCut BEFF',
      to: '.',
    },
    {
      name: 'Gender Swap',
      to: '.',
    },
    {
      name: 'Jobs',
      to: '.',
    },
  ].filter(Boolean) as NavigationItem[];

  return (
    <>
      {navigation.map((item, index) => (
        <Button size="sm" className=" bg-transparent shadow-none">
          {item.name}
        </Button>
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
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
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
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#00A600]">
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

const Max1382Header = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div>
      <nav className="bg-[#00A600] border-[#00A600] px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://google.com" className="items-center">
            <span className="self-center text-1xl font-semibold whitespace-nowrap">{APP_NAME}</span>
          </a>
          <div className="flex items-center sm:m-0 lg:order-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-white-dark rounded-lg lg:hidden hover:bg-[#00A600] focus:outline-none focus:ring-2 focus:ring-[#00A600]"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <MenuAlt2Icon className="h-6 w-6 text-white-light" aria-hidden="true" />
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

export default Max1382Header;
