import React from 'react';
import { APP_NAME, navigation_items } from '../../constants';

export const Footer = () => {
  return (
    <footer className="rounded-lg shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white-dark sm:text-center">
          © 2023{' '}
          <a href="/" className="hover:underline hover:text-accent-dark">
            {APP_NAME}
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white-dark sm:mt-0">
          {navigation_items.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.to} target="_blank" className="mr-4 hover:underline md:mr-6 hover:text-accent-dark">
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};
