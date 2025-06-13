import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBasic from '../../../shared/components/buttons/button/Button';
import SVGLogo from '../../../shared/components/icons/SVGLogo';
import InputBasic from '../../../shared/components/inputs/input/input';
import { useRequest } from '../../../shared/hooks/useResquest';
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  TitleLogin,
} from '../styles/loginScreen.styles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authRequest, loading } = useRequest();
  const navigate = useNavigate();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleLogin = () => {
    authRequest(
      {
        email: email,
        password: password,
      },
      navigate,
    );
  };

  return (
    <>
      <div>
        <ContainerLoginScreen>
          <ContainerLogin>
            <LimitedContainer>
              <SVGLogo />
              <TitleLogin level={2} type="secondary"></TitleLogin>
              <InputBasic
                title="Usuario"
                margin="32px 0px 0px"
                onChange={handleEmail}
                value={email}
              />
              <InputBasic
                type="password"
                title="Senha"
                margin="32px 0px 0px"
                onChange={handlePassword}
                value={password}
              />
              <ButtonBasic
                loading={loading}
                margin="64px 0px 16px 0px"
                type="primary"
                onClick={handleLogin}
              >
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
