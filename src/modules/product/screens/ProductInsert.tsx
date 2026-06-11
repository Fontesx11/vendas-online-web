import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBasic from '../../../shared/components/buttons/button/Button';
import InputBasic from '../../../shared/components/inputs/input/input';
import InputMoney from '../../../shared/components/inputs/inputMoney/inputMoney';
import Select from '../../../shared/components/inputs/select/Select';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { URL_CATEGORY } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequest } from '../../../shared/hooks/useResquest';
import useInsertProduct from '../hooks/useInsertProduct';
import { ProductRoutesEnum } from '../routes';
import {
  LimetedContainer as LimetedContainerInsert,
  ProductInsertContainer,
} from '../styles/productInsert.style';

const ProductInsert = () => {
  const { categories, setCategories } = useDataContext();
  const { request } = useRequest();

  const {
    loading,
    diasabledButton,
    handleInsetProduct,
    onChangeInput,
    handleChangeSelect,
    product,
  } = useInsertProduct();

  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

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
            onChange={(event) => onChangeInput(event, 'name')}
            value={product.name}
            title="Nome"
            placeholder="Nome do produto"
          />
          <InputBasic
            onChange={(event) => onChangeInput(event, 'image')}
            title="Url imagem"
            placeholder="Url imagem"
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'price')}
            value={product.price}
            addonBefore="R$"
            title="Preço"
            placeholder="Preço"
          />

          <Select
            title="Categoria"
            style={{ width: '100%' }}
            onChange={handleChangeSelect}
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
              <ButtonBasic
                onClick={handleInsetProduct}
                type="primary"
                loading={loading}
                disabled={diasabledButton}
              >
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
