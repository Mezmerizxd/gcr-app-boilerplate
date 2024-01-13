import React from 'react';

export const Section = ({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) => {
  return (
    <div className={`w-full h-screen ${className}`} id={id}>
      {children}
    </div>
  );
};
