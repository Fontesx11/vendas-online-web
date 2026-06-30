import { type NavigateFunction, redirect } from 'react-router';

import { LoginRoutesEnum } from '../../../modules/login/routes';
import type { UserType } from '../../../modules/login/types/UserType';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { URL_USER } from '../../constants/urls';
import { connectionAPIGet } from './connectionAPI';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthrizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN);
  }

  const user = await connectionAPIGet<UserType>(URL_USER).catch(() => {
    unsetAuthorizationToken();
    return redirect(LoginRoutesEnum.LOGIN);
  });

  if (!user) {
    return redirect(LoginRoutesEnum.LOGIN);
  }

  return null;
};

export const logout = async (navigate: NavigateFunction) => {
  unsetAuthorizationToken();
  navigate(LoginRoutesEnum.LOGIN);
};
