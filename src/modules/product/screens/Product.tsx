import { Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBasic from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/tables/table/table';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequest } from '../../../shared/hooks/useResquest';
import type { ProductType } from '../../../shared/types/ProductType';
import CategoryColumn from '../components/CategoryColumn';
import TooltipImage from '../components/TooltipImage';
import { ProductRoutesEnum } from '../routes';
import { BoxButtons, LimitSizeButton, LimitSizeInput } from '../styles/product.style';

const columns: ColumnsType<ProductType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (_, product) => <TooltipImage product={product} />,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'category',
    render: (_, product) => <CategoryColumn category={product.category} />,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
  },
];

const Product = () => {
  const { products, setProducts } = useDataContext();
  const [productsFiltered, setProductsFilterd] = useState<ProductType[]>([]);
  const { request } = useRequest();
  const navigate = useNavigate();

  const { Search } = Input;

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  useEffect(() => {
    setProductsFilterd([...products]);
  }, [products]);

  const handleOnClickInsert = () => {
    navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  const onSearch = (value: string) => {
    console.log('wdwd');
    if (!value) {
      setProductsFilterd([...products]);
    } else {
      setProductsFilterd([
        ...productsFiltered.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase()),
        ),
      ]);
    }
  };
  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PRODUTOS',
        },
      ]}
    >
      <BoxButtons>
        <LimitSizeInput>
          <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
        </LimitSizeInput>
        <LimitSizeButton>
          <ButtonBasic type="primary" onClick={handleOnClickInsert}>
            Inserir
          </ButtonBasic>
        </LimitSizeButton>
      </BoxButtons>
      <Table columns={columns} dataSource={productsFiltered} />
    </Screen>
  );
};

export default Product;
