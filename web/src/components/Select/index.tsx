import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

{/* definindo a interface dos selectProps */}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

{/* cria um select para as options passadas */}
const Select:React.FC<SelectProps> = ({ label, name, options, ...rest }: SelectProps) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>
        {options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
}

export default Select;
