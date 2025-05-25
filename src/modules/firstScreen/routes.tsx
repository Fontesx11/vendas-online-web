import type { RouteObject } from 'react-router-dom';

import FirstScreen from './screens/firstScreen';

export const firstScreenRoutes: RouteObject[] = [
  {
    path: '/',
    element: <FirstScreen />,
    errorElement: <div>Página Não Encontrada</div>,
  },
];
