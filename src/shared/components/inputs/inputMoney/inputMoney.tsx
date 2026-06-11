import React, { useEffect, useState } from 'react';

import InputBasic, { type InputProps } from '../input/input';

interface InputMoneyProps extends InputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addonBefore?: string;
}

const DECIMAL_SIZE = 2;

const InputMoney = ({ value, onChange, addonBefore, ...props }: InputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);

  useEffect(() => {
    const valorString = `${value}`;
    console.log('valorString', valorString)
    console.log('value', value)

    if (!/\D/.test(valorString.replace('.', ''))) {
      setCurrentValue(value.toFixed(DECIMAL_SIZE).toString().replace('.', ','));
    }
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const cleanValue = value.replace(',','');

    const sizeSlice = cleanValue.length - DECIMAL_SIZE

    const newValue = [
      cleanValue.slice(0,sizeSlice),
      '.', 
       cleanValue.slice(sizeSlice)
    ].join('')

    onChange({...event, target:{...event.target, value: newValue}})

  }

  return (
    <InputBasic addonBefore={addonBefore} onChange={handleOnChange} value={currentValue} {...props} />
  );
};

export default InputMoney;
