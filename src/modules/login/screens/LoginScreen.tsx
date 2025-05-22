import InputBasic from '../../../shared/inputs/input/input';
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
} from '../styles/loginScreen.styles';

const LoginScreen = () => {
  return (
    <>
      <div>
        <ContainerLoginScreen>
          <ContainerLogin>
            <LimitedContainer>
              <LogoImage src="./logo.png" />
              <InputBasic title="Usuario" />
              <InputBasic title="Senha" />
            </LimitedContainer>
          </ContainerLogin>
          <BackgroundImage src="./background.png" />
        </ContainerLoginScreen>
      </div>
    </>
  );
};

export default LoginScreen;
