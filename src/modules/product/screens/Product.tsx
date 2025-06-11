import { useEffect } from 'react';

import { URL_PRODUCT } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequest } from '../../../shared/hooks/useResquest';
import type { ProductType } from '../types/ProductType';

const Product = () => {
  const { products, setProducts } = useDataContext();

  const { request } = useRequest();

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  return products.map((product) => {
    return <div key={product.id}>{product.name}</div>;
  });
};

export default Product;
