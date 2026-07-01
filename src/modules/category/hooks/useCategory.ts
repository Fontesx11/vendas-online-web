import { useEffect } from 'react';

import { URL_CATEGORY } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequest } from '../../../shared/hooks/useResquest';

export const UseCategory = () => {
  const { categories, setCategories } = useDataContext();
  const { request } = useRequest();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

  return { categories };
};
