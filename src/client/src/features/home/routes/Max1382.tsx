import React from 'react';

import { Head } from '../../../components/Head';
import { Button } from '../../../components/Elements';

import Max1382Header from '../../../components/Layout/Max1382Header';
import { ClothingOption } from '../components/ClothingOption';

import {
  GiTrousers,
  GiRunningShoe,
  GiHeartNecklace,
  GiMuscularTorso,
  GiGymBag,
  GiWinterGloves,
  GiAbdominalArmor,
} from 'react-icons/gi';
import { FaTshirt, FaHatCowboy, FaTheaterMasks, FaGlasses } from 'react-icons/fa';

const APP_NAME = 'Max1382';

export const Max1382 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Head description={APP_NAME} />
      <Max1382Header />

      <div className="flex-grow flex flex-col justify-center items-center text-center bg-[#1A1E1A]">
        <h1 className="my-20 xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-5xl font-extrabold text-white-light">
          {APP_NAME}
        </h1>

        <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
          <h2 className="py-5 px-5 text-4xl font-bold text-white-light">What's Coming</h2>
          <div className="py-4">
            <h3 className="py-1 px-5 text-2xl font-base text-left text-white-light">Updated Gender Swap</h3>
            <p className="px-8 text-left text-white-light">
              Coming soon is a updated Gender Swap list to provide the newest items from the lastest DLC
            </p>
          </div>

          <div className="py-4">
            <h3 className="py-1 px-5 text-2xl font-base text-left text-white-light">Max-Wiki "Done"</h3>
            <p className="px-8 text-left text-white-light">
              Free Max-Wiki will show you every texture 0 image for every clothing item in gta on male and female
            </p>
          </div>

          <div className="py-4">
            <h3 className="py-1 px-5 text-2xl font-base text-left text-white-light">Gender Swap Subs</h3>
            <p className="px-8 text-left text-white-light">
              Coming soon is a updated Gender Swap list to provide the newest items from the lastest DLC along with more
              detailed list
            </p>
          </div>

          <div className="py-4">
            <h3 className="py-1 px-5 text-2xl font-base text-left text-white-light">Max-Wiki Subs "OUT NOW"</h3>
            <p className="px-8 text-left text-white-light">
              Uncover every Texture 0 image for each clothing item through Max-Wiki Subs, along with detailed textual
              descriptions of each texture.
            </p>
          </div>

          <div className="py-4">
            <h3 className="py-1 px-5 text-2xl font-base text-left text-white-light">Max-Wiki Subs "OUT NOW"</h3>
            <p className="px-8 text-left text-white-light">
              Uncover every Texture 0 image for each clothing item through Max-Wiki Subs, along with detailed textual
              descriptions of each texture.
            </p>
            <p className="px-8 text-left text-white-light">
              Discover the precise locations of each clothing item, including insights into Modded Items, Locked Items,
              Blacklisted Items,
            </p>
            <p className="px-8 text-left text-white-light">
              and delve into an extensive, in-depth exploration of both male and female clothing within the GTA
              universe.
            </p>
          </div>

          <div className="py-4">
            <h3 className="py-1 px-5 text-2xl font-base text-left text-white-light">BEFF Bot Subs</h3>
            <p className="px-8 text-left text-white-light">
              An upcoming addition is the all-new BEFF Bot, designed to provide guidance on transforming a wide array of
              purchasable or modded items across various textures.
            </p>
          </div>

          <div className="flex justify-center px-5 py-2">
            <Button className="mx-2 bg-[#00A600] text-white">Learn More</Button>
          </div>
        </div>

        <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
          <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Clothing</h2>
          <div className="grid grid-cols-4 gap-4">
            <ClothingOption title="Hats" icon={FaHatCowboy} href="https://google.com" />
            <ClothingOption title="Masks" icon={FaTheaterMasks} href="https://google.com" />
            <ClothingOption title="Glasses" icon={FaGlasses} href="https://google.com" />
            <ClothingOption title="Tops" icon={FaTshirt} href="https://google.com" />
            <ClothingOption title="Legs" icon={GiTrousers} href="https://google.com" />
            <ClothingOption title="Shoes" icon={GiRunningShoe} href="https://google.com" />
            <ClothingOption title="Accessories" icon={GiHeartNecklace} href="https://google.com" />
            <ClothingOption title="Torso 1" icon={GiMuscularTorso} href="https://google.com" />
            <ClothingOption title="Bags" icon={GiGymBag} href="https://google.com" />
            <ClothingOption title="Gloves" icon={GiWinterGloves} href="https://google.com" />
            <ClothingOption title="Armor" icon={GiAbdominalArmor} href="https://google.com" />
          </div>
        </div>

        <div className="py-20 lg:w-4/6 sm:w-11/12 max-w-6xl m-auto">
          <h2 className="py-5 px-5 text-4xl font-bold text-white-light">Header 2</h2>
          <p className="px-5 text-lg font-normal text-white-dark">
            Lorem ipsum dolor s it amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          </p>
        </div>

        <footer className="w-full rounded-lg shadow bg-[#00A600]">
          <div className="max-w-full mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <a href="https://google.com/" target="_blank" className="flex items-center mb-4 sm:mb-0">
                <span className="self-center text-2xl font-semibold whitespace-nowrap">{APP_NAME}</span>
              </a>
              <ul className="flex flex-wrap items-center mb-6 text-normal font-medium text-white-light sm:mb-0">
                <li>
                  <a
                    href="https://opensource.org/license/mit/"
                    target="_blank"
                    className="mr-4 hover:underline md:mr-6 text-normal"
                  >
                    Licensing
                  </a>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-white-light sm:mx-auto lg:my-8" />
            <span className="block text-normal text-white-light sm:text-center">
              © 2023{' '}
              <a href="https://google.com" target="_blank" className="hover:underline">
                {APP_NAME}
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
