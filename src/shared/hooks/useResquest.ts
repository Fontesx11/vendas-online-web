import { useState } from 'react';
import { useNavigate } from 'react-router';

import type { AuthType } from '../../modules/login/types/AuthType';
import { ProductRoutesEnum } from '../../modules/product/routes';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthrizationToken } from '../functions/connection/auth';
import ConnectionAPI, {
  connectionAPIPost,
  type MethodType,
} from '../functions/connection/connectionAPI';
import { useGlobalContext } from './useGlobalContext';

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalContext();

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);
    const navigate = useNavigate();

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

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
  ): Promise<T | undefined> => {
    setLoading(true);
    const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });

    setLoading(false);
    return returnObject;
  };

  return {
    loading,
    request,
    authRequest,
  };
};
