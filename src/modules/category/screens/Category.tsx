import { Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyBetween } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import Table from '../../../shared/components/tables/table/table';
import type { CategoryType } from '../../../shared/types/CategoryType';
import { UseCategory } from '../hooks/useCategory';
import { CategoryRoutesEnum } from '../routes';

const Category = () => {
  const [categoriesFiltered, setCategoriesFiltered] = useState<CategoryType[]>([]);
  const { Search } = Input;
  const { categories } = UseCategory();

  const navigate = useNavigate();

  const handleOnClickCategory = () => {
    navigate(CategoryRoutesEnum.CATEGORY_INSERT);
  };

  useEffect(() => {
    setCategoriesFiltered([...categories]);
  }, [categories]);

  const onSearch = (value: string) => {
    if (!value) {
      setCategoriesFiltered([...categories]);
    } else {
      setCategoriesFiltered([
        ...categoriesFiltered.filter((category) =>
          category.name.toLowerCase().includes(value.toLowerCase()),
        ),
      ]);
    }
  };

  const columns: ColumnsType<CategoryType> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Categoria',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Produtos',
      dataIndex: 'amountProducst',
      key: 'amountProducst',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
  ];

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'CATEGORIAS',
        },
      ]}
    >
      <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar categoria" onSearch={onSearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickCategory}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={categoriesFiltered} />
    </Screen>
  );
};

export default Category;
