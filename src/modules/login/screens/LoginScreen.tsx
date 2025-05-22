import { useState } from 'react';

import ButtonBasic from '../../../shared/buttons/button/Button';
import InputBasic from '../../../shared/inputs/input/input';
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
  TitleLogin,
} from '../styles/loginScreen.styles';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };

  return (
    <>
      <div>
        <ContainerLoginScreen>
          <ContainerLogin>
            <LimitedContainer>
              <LogoImage src="./logo.png" />
              <TitleLogin level={2} type="secondary">
                Login
              </TitleLogin>
              <InputBasic
                title="Usuario"
                margin="32px 0px 0px"
                onChange={handleUsername}
                value={username}
              />
              <InputBasic
                type="password"
                title="Senha"
                margin="32px 0px 0px"
                onChange={handlePassword}
                value={password}
              />
              <ButtonBasic margin="64px 0px 16px 0px" type="primary">
                Entrar
              </ButtonBasic>
            </LimitedContainer>
          </ContainerLogin>
          <BackgroundImage src="./background.png" />
        </ContainerLoginScreen>
      </div>
    </>
  );
};

export default LoginScreen;
