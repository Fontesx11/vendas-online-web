import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBasic from '../../../shared/components/buttons/button/Button';
import InputBasic from '../../../shared/components/inputs/input/input';
import Select from '../../../shared/components/inputs/select/Select';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { URL_CATEGORY, URL_PRODUCT } from '../../../shared/constants/urls';
import type { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { useRequest } from '../../../shared/hooks/useResquest';
import { ProductRoutesEnum } from '../routes';
import {
  LimetedContainer as LimetedContainerInsert,
  ProductInsertContainer,
} from '../styles/productInsert.style';

const ProductInsert = () => {
  const [product, setProduct] = useState<InsertProduct>({
    name: '',
    image: '',
    price: 0,
  });
  const { categories, setCategories } = useDataContext();
  const { setNotification } = useGlobalContext();
  const { request } = useRequest();

  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

  const handleInsetProduct = async () => {
    await connectionAPIPost(URL_PRODUCT + 'owuadhwiuh', product)
      .then(() => {
        setNotification('Sucesso', 'success', 'Produto inserido com sucesso!');
        navigate(ProductRoutesEnum.PRODUCT);
      })
      .catch((error) => {
        setNotification(error.message, 'error');
      });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setProduct({
      ...product,
      [nameObject]: nameObject === 'price' ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChange = (value: string) => {
    setProduct({ ...product, categoryId: Number(value) });
    console.log(`selected ${value}`);
  };

  const handleOnClickCancel = () => {
    navigate(ProductRoutesEnum.PRODUCT);
  };
  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PRODUTOS',
          navigateTo: ProductRoutesEnum.PRODUCT,
        },
        {
          name: 'INSERIR PRODUTO',
        },
      ]}
    >
      <ProductInsertContainer>
        <LimetedContainerInsert>
          <InputBasic
            onChange={(event) => onChange(event, 'name')}
            value={product.name}
            title="Nome"
            placeholder="Nome do produto"
          />
          <InputBasic
            onChange={(event) => onChange(event, 'image')}
            value={product.image}
            title="Url imagem"
            placeholder="Url imagem"
          />
          <InputBasic
            onChange={(event) => onChange(event, 'price')}
            value={product.price}
            title="Preço"
            placeholder="Preço"
          />

          <Select
            title="Categoria"
            style={{ width: '100%' }}
            onChange={handleChange}
            options={categories.map((category) => ({
              value: `${category.id}`,
              label: `${category.name}`,
            }))}
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <ButtonBasic danger onClick={handleOnClickCancel}>
                Cancelar
              </ButtonBasic>
            </LimitedContainer>

            <LimitedContainer width={120}>
              <ButtonBasic onClick={handleInsetProduct} type="primary">
                Inserir Produto
              </ButtonBasic>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimetedContainerInsert>
      </ProductInsertContainer>
    </Screen>
  );
};

export default ProductInsert;
