import { ChangeEvent } from 'react';

export interface InputProps {
  type: string;
  className: string;
  id: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
