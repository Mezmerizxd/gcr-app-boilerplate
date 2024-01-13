import { Card as FlowCard } from 'flowbite-react';
import clsx from 'clsx';
import React from 'react';

interface CardProps {
  title: string;
  content: string;
  image: any;
  className?: string;
}

const Card = ({ title, content, image, className }: CardProps) => {
  return (
    <div className={clsx('w-full flex justify-center items-center p-1', className)}>
      <FlowCard
        className="max-w-sm h-full bg-accent-dark/20 border-none"
        renderImage={() => <img src={image} alt="..." loading="lazy" />}
      >
        <h5 className="text-2xl font-bold tracking-tight text-accent-light">{title}</h5>
        <p className="font-normal text-white-dark">{content}</p>
      </FlowCard>
    </div>
  );
};

export default Card;
