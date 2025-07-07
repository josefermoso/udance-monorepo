import React from 'react';

import { cn } from '../utils';

export type HeadingProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  children: React.ReactNode;
};

const Heading: React.FC<HeadingProps> = ({ variant, className, children }) => {
  const Tag = variant;

  const baseStyles = {
    h1: 'text-4xl font-title',
    h2: 'text-3xl font-title',
    h3: 'text-2xl font-title',
    h4: 'text-xl font-title',
    h5: 'text-lg font-title',
    h6: 'text-base font-title',
  };

  return <Tag className={cn(baseStyles[variant], className)}>{children}</Tag>;
};

export default Heading;
