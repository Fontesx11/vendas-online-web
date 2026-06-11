import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { URL_PRODUCT } from '../../../shared/constants/urls';
import type { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { ProductRoutesEnum } from '../routes';

const useInsertProduct = () => {
  const [loading, setLoading] = useState(false);
  const [diasabledButton, setDiabledButton] = useState(true);
  const { setNotification } = useGlobalContext();
  const navigate = useNavigate();

  const [product, setProduct] = useState<InsertProduct>({
    name: '',
    image: '',
    price: 0,
  });

  useEffect(() => {
    if (product.name && product.image && product.categoryId && product.price > 0) {
      setDiabledButton(false);
    } else {
      setDiabledButton(true);
    }
  }, [product]);

  const handleInsetProduct = async () => {
    setLoading(true);
    await connectionAPIPost(URL_PRODUCT, product)
      .then(() => {
        setNotification('Sucesso', 'success', 'Produto inserido com sucesso!');
        navigate(ProductRoutesEnum.PRODUCT);
      })
      .catch((error) => {
        setNotification(error.message, 'error');
      });
    setLoading(false);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setProduct({
      ...product,
      [nameObject]: nameObject === 'price' ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChangeSelect = (value: string) => {
    setProduct({ ...product, categoryId: Number(value) });
  };

  return {
    loading,
    diasabledButton,
    handleInsetProduct,
    onChangeInput,
    handleChangeSelect,
    product,
  };
};

export default useInsertProduct;
