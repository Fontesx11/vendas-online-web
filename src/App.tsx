import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { productScreens } from './modules/product/routes';
import { useNotification } from './shared/hooks/useNotifcation';

const router = createBrowserRouter([...firstScreenRoutes, ...loginRoutes, ...productScreens]);

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
