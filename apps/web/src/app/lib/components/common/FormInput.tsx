import { InputProps } from '@headlessui/react';
import { classNames } from '@repo/utils';
import React from 'react';

interface FormInputProps extends InputProps {
  name: string;
  label: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, label, className, onChange }) => (
  <div className={classNames('sm:col-span-3', className)}>
    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input id={name} name={name} type="text" autoComplete="given-name" className="form-control" onChange={onChange} />
    </div>
  </div>
);

export default FormInput;
