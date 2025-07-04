import React from 'react';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'bg-blue-600 text-white'
    : 'bg-transparent border border-gray-400 text-gray-800';
  const sizeClass =
    size === 'small'
      ? 'px-4 py-2 text-sm'
      : size === 'large'
        ? 'px-6 py-3 text-lg'
        : 'px-5 py-2.5 text-base';

  return (
    <button
      type="button"
      className={`font-bold rounded cursor-pointer inline-block ${mode} ${sizeClass} hover:opacity-80 transition-opacity`}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
