import type { RouteObject } from 'react-router-dom';

import Product from './screens/Product';

export const productScreens: RouteObject[] = [
  {
    path: '/product',
    element: <Product />,
  },
];
