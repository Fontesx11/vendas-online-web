import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { URL_USER } from '../../../shared/constants/urls';
import {
  getAuthorizationToken,
  unsetAuthorizationToken,
} from '../../../shared/functions/connection/auth';
import { connectionAPIGet } from '../../../shared/functions/connection/connectionAPI';
import { LoginRoutesEnum } from '../../login/routes';
import { ProductRoutesEnum } from '../../product/routes';

const FirstScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyToken = async () => {
      const token = getAuthorizationToken();
      if (token) {
        await connectionAPIGet(URL_USER)
          .then(() => navigate(ProductRoutesEnum.PRODUCT))
          .catch(() => navigate(LoginRoutesEnum.LOGIN));
      } else {
        unsetAuthorizationToken();
        navigate(LoginRoutesEnum.LOGIN);
      }
    };

    verifyToken();
  }, []);
  return <Spin />;
};
export default FirstScreen;
