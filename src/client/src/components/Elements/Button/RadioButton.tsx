import clsx from 'clsx';
import * as React from 'react';

import { Spinner } from '../Spinner';

const sizes = {
  sm: 'py-1 px-1 text-md',
  md: 'py-1 px-2 text-lg',
  lg: 'py-2 px-2 text-xl',
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }
  | { startIcon: React.ReactElement; endIcon: React.ReactElement };

export type RadioButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  id?: string;
  selected?: boolean;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const RadioButton = React.forwardRef<HTMLButtonElement, RadioButtonProps>(
  (
    {
      type = 'button',
      className = '',
      id,
      selected = false,
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        id={id}
        ref={ref}
        type={type}
        className={clsx(
          'w-min flex justify-between items-center disabled:opacity-70 font-semibold disabled:cursor-not-allowed rounded-full focus:outline-none hover:opacity-95 duration-150',
          selected
            ? 'bg-accent-dark/40 text-accent-light border-2 border-accent-light/30'
            : 'bg-none text-accent-light border-2 border-accent-light/60',
          'whitespace-nowrap max-w-full overflow-hidden',
          sizes[size],
          className,
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && startIcon && (
          <i className={clsx('mr-1', `${size === 'lg' ? 'text-2xl' : 'text-xl'}`)}>{startIcon}</i>
        )}
        {id && <span className={clsx('text-sm uppercase italic font-romanNumber text-green-400')}>{id}</span>}
        <span id="radio_button" className={clsx('w-full mx-2 overflow-x-auto font-medium')}>
          {props.children}
        </span>
        {!isLoading && selected && endIcon && <i className={clsx('text-xl')}>{endIcon}</i>}
      </button>
    );
  },
);

RadioButton.displayName = 'RadioButton';
