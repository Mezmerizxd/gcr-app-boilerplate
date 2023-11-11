import React from 'react';
import { IconType } from 'react-icons/lib';

export const ClothingOption = ({ title, icon, href }: { title: string; icon: IconType; href?: string }) => {
  return (
    <div
      className="flex flex-col group"
      onClick={() => {
        if (href) {
          window.open(href, '_blank');
        }
      }}
    >
      <div className="col-span-1 flex justify-center items-center cursor-pointer group-hover:text-[#00A600] duration-150">
        {React.createElement(icon, { className: 'w-20 h-20' })}
      </div>
      <p className="cursor-pointer group-hover:text-[#00A600] duration-150">{title}</p>
    </div>
  );
};
