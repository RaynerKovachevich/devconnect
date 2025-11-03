import React from 'react';

export type TextareaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
};

const TextareaField: React.FC<TextareaFieldProps> = ({ label, id, className = '', ...rest }) => {
  return (
    <div className='ui-field'>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} className={`ui-textarea ${className}`.trim()} {...rest} />
    </div>
  );
};

export default TextareaField;
