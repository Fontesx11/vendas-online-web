import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';
import { House, PackageOpen } from 'lucide-react';
import { useNavigate } from 'react-router';

import { CategoryRoutesEnum } from '../../../modules/category/routes';
import { ProductRoutesEnum } from '../../../modules/product/routes';
import { ConatinerLogoName, LogoMenu, MenuContainer, NameCompany } from './menu.style';

type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Home',
      icon: <House size={18} />,
    },
    {
      key: 'products',
      label: 'Produtos',
      icon: <PackageOpen size={18} />,
      children: [
        {
          key: 'products_view',
          label: 'Visualizar',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT),
        },
        {
          key: 'products_insert',
          label: 'Inserir',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },
    {
      key: 'category',
      label: 'Categorias',
      children: [
        {
          key: 'category_view',
          label: 'Visualizar',
          onClick: () => navigate(CategoryRoutesEnum.CATEGORY),
        },
        {
          key: 'category_insert',
          label: 'Inserir',
          onClick: () => navigate(CategoryRoutesEnum.CATEGORY_INSERT),
        },
      ],
    },
    {
      key: 'order',
      label: 'Pedidos',
    },
    {
      key: 'user',
      label: 'Clientes',
    },
  ];
  return (
    <MenuContainer>
      <ConatinerLogoName>
        <LogoMenu />
        <NameCompany>Feira de Mangaio</NameCompany>
      </ConatinerLogoName>
      <MenuAntd
        theme="dark"
        style={{ width: 240 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </MenuContainer>
  );
};

export default Menu;
