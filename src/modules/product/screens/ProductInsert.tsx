import Screen from '../../../shared/components/screen/Screen';
import { ProductRoutesEnum } from '../routes';

const ProductInsert = () => {
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
      inserir Produtos
    </Screen>
  );
};

export default ProductInsert;
