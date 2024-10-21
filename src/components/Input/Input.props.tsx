import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   type: 'email' | 'password' | 'text' | 'name';
   id: 'email' | 'password' | 'text' | 'name';
   name: 'email' | 'password' | 'text' | 'name';
   isValid?: boolean;
}