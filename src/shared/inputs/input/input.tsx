import { Input as InputAntd, type InputProps as InputPropsAntd } from 'antd';

import { BoxInput, TitleInput } from './input.styles';

interface InputProps extends InputPropsAntd {
  title?: string;
}

const InputBasic = ({ title }: InputProps) => {
  return (
    <BoxInput>
      {title && <TitleInput>{title}</TitleInput>}
      <InputAntd />
    </BoxInput>
  );
};

export default InputBasic;
