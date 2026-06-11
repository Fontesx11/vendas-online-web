import { Typography } from 'antd';
import styled from 'styled-components';

import SVGLogo from '../icons/SVGLogo';

const { Text } = Typography;

export const MenuContainer = styled.div`
  left: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 240px;
  background-color: #14253d;

  -webkit-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  -moz-box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
  box-shadow: 1px 0px 8px 0px rgba(0, 0, 0, 0.71);
`;

export const LogoMenu = styled(SVGLogo)`
  width: 50px;
  height: 50px;
  margin-right: 16px;
  margin-left: 16px;
`;

export const ConatinerLogoName = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
`;

export const NameCompany = styled(Text)`
  color: white;
`;
