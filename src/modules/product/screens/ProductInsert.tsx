import { Select } from 'antd';
import { useEffect } from 'react';

import ButtonBasic from '../../../shared/components/buttons/button/Button';
import InputBasic from '../../../shared/components/inputs/input/input';
import Screen from '../../../shared/components/screen/Screen';
import { URL_CATEGORY } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequest } from '../../../shared/hooks/useResquest';
import { ProductRoutesEnum } from '../routes';
import { LimetedContainer } from '../styles/productInsert.style';

const ProductInsert = () => {
  const { categories, setCategories } = useDataContext();
  const { request } = useRequest();

  console.log(categories);

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

  const handleChange = (value: string) => {
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
        <InputBasic title="Nome" placeholder="Nome do produto" />
        <InputBasic title="Url imagem" placeholder="Url imagem" />
        <InputBasic title="Preço" placeholder="Preço" />

        <Select
          defaultValue="lucy"
          style={{ width: '100%' }}
          onChange={handleChange}
          options={categories.map((category) => ({
            value: `${category.id}`,
            label: `${category.name}`,
          }))}
        />

        <ButtonBasic type="primary">Inserir Produto</ButtonBasic>
      </LimetedContainer>
    </Screen>
  );
};

export default ProductInsert;
