import clsx from 'clsx';
import { Accordion as FlowAccordion } from 'flowbite-react';
import React from 'react';

interface AccordionProps {
  accordions: {
    id?: string;
    title: string;
    content: any;
  }[];
  className?: string;
}

const Accordion = ({ accordions, className }: AccordionProps) => {
  return (
    <div className={clsx('w-full m-auto flex justify-center items-center', className)}>
      <FlowAccordion collapseAll className="w-full border-none rounded-sm divide-accent-dark/50">
        {accordions.map((accordion, index) => (
          <FlowAccordion.Panel key={index}>
            <FlowAccordion.Title className="text-accent-light font-semibold hover:text-accent-light/80 hover:bg-accent-dark/10 duration-150 bg-accent-dark/15 focus:ring-0">
              {accordion.id && <span className="text-green-400 font-romanNumber italic mr-2">{accordion.id}</span>}
              {accordion.title}
            </FlowAccordion.Title>
            <FlowAccordion.Content className="text-white-dark bg-background-dark/50 p-2">
              {accordion.content}
            </FlowAccordion.Content>
          </FlowAccordion.Panel>
        ))}
      </FlowAccordion>
    </div>
  );
};

export default Accordion;
