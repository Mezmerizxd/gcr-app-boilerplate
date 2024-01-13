import React from 'react';
import { APP_NAME } from '../../constants';

export const Footer = () => {
  return (
    <footer className="max-w-full rounded-lg shadow bg-background-dark">
      <div className="max-w-full mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://boilerplate.zvyezda.com/" className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">{APP_NAME}</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white-dark sm:mb-0">
            <li>
              <a
                href="https://github.com/Mezmerizxd/gcr-app-boilerplate/blob/main/LICENSE"
                target="_blank"
                className="mr-4 hover:underline md:mr-6 "
              >
                Licensing
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-white-dark sm:mx-autolg:my-8" />
        <span className="block text-sm text-white-dark sm:text-center">
          © 2023{' '}
          <a href="https://boilerplate.zvyezda.com/" className="hover:underline">
            {APP_NAME}
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
