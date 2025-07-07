import React from 'react';

import { cn } from '../utils';

export type TextProps = {
  variant: 'body-base' | 'body-sm' | 'body-lg' | 'body-xs';
  className?: string;
  children: React.ReactNode;
};

const Text: React.FC<TextProps> = ({ variant, className, children }) => {
  const baseStyles = {
    'body-lg': 'text-lg font-text', // similar to text-lg
    'body-base': 'text-base font-text', // similar to text-base
    'body-sm': 'text-sm font-text', // similar to text-sm
    'body-xs': 'text-xs font-text', // similar to text-xs
  };

  return <p className={cn(baseStyles[variant], className)}>{children}</p>;
};

export default Text;
