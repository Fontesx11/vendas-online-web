import React, { useEffect, useState } from 'react';

import ButtonBasic from '../../../shared/components/buttons/button/Button';
import InputBasic from '../../../shared/components/inputs/input/input';
import Select from '../../../shared/components/inputs/select/Select';
import Screen from '../../../shared/components/screen/Screen';
import { URL_CATEGORY, URL_PRODUCT } from '../../../shared/constants/urls';
import type { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequest } from '../../../shared/hooks/useResquest';
import { ProductRoutesEnum } from '../routes';
import { LimetedContainer } from '../styles/productInsert.style';

const ProductInsert = () => {
  const [product, setProduct] = useState<InsertProduct>({
    name: '',
    image: '',
    price: 0,
  });
  const { categories, setCategories } = useDataContext();
  const { request } = useRequest();

  console.log(categories);

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

  const handleInsetProduct = () => {
    connectionAPIPost(URL_PRODUCT, product);
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
      <LimetedContainer>
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

        <ButtonBasic onClick={handleInsetProduct} type="primary">
          Inserir Produto
        </ButtonBasic>
      </LimetedContainer>
    </Screen>
  );
};

export default ProductInsert;
