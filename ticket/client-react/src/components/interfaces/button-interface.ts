import React from 'react';

export interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
}
