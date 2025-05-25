import type { RouteObject } from 'react-router-dom';

import LoginScreen from './screens/LoginScreen';

export const LoginRoutesEnum = {
  LOGIN: '/login',
};

export const loginRoutes: RouteObject[] = [
  {
    path: LoginRoutesEnum.LOGIN,
    element: <LoginScreen />,
  },
];
