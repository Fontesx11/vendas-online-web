import axios from 'axios';
import { useState } from 'react';

import { useGlobalContext } from './useGlobalContext';

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification } = useGlobalContext();

  const postRequest = async (url: string, body: unknown) => {
    setLoading(true);
    const returnData = await axios
      .post(url, body)
      .then(() => setNotification('Logado com sucesso', 'success', 'lalalala'))
      .catch(() => setNotification('Senha Invalida', 'error', 'lalalala'));

    setLoading(false);
    return returnData;
  };

  const getRequest = async (url: string) => {
    setLoading(true);
    const returnData = await axios
      .get(url)
      .then((res) => console.log(res))
      .catch((err) => alert(err));

    setLoading(false);
    return returnData;
  };

  return {
    loading,
    getRequest,
    postRequest,
  };
};
