import { useState } from 'react';
import { useNavigate } from 'react-router';

import type { AuthType } from '../../modules/login/types/AuthType';
import { ProductRoutesEnum } from '../../modules/product/routes';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthrizationToken } from '../functions/connection/auth';
import { connectionAPIGet, connectionAPIPost } from '../functions/connection/connectionAPI';
import { useGlobalContext } from './useGlobalContext';

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
    setLoading(true);
    const returnData = await connectionAPIPost<T>(url, body)
      .then((res) => {
        setNotification('Logou com sucsso', 'success');
        return res;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });

    setLoading(false);
    return returnData;
  };

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((res) => {
        setUser(res.user);
        setAuthrizationToken(res?.accessToken);
        navigate(ProductRoutesEnum.PRODUCT);
        return res;
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, 'error');
        return undefined;
      });

    setLoading(false);
  };

  const getRequest = async (url: string) => {
    setLoading(true);
    const returnData = await connectionAPIGet(url);

    setLoading(false);
    return returnData;
  };

  return {
    loading,
    getRequest,
    postRequest,
    authRequest,
  };
};
