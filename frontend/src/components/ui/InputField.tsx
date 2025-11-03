import React from 'react';

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, id, className = '', ...rest }) => {
  return (
    <div className='ui-field'>
      <label htmlFor={id}>{label}</label>
      <input id={id} className={`ui-input ${className}`.trim()} {...rest} />
    </div>
  );
};

export default InputField;
