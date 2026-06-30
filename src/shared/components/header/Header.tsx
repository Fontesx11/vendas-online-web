import { Modal } from 'antd';
import { LogOut } from 'lucide-react';

import { logout } from '../../functions/connection/auth';
import { HeaderContainer } from './header.style';

const Header = () => {
  const [modal, contextHolder] = Modal.useModal();

  const handleLogout = () => {
    modal.confirm({
      title: 'Sair',
      content: 'Tem certeza que deseja sair?',
      okText: 'Sair',
      cancelText: 'Cancelar',
      onOk: logout,
    });
  };

  return (
    <HeaderContainer>
      {contextHolder}
      <LogOut color="black" onClick={handleLogout} style={{ cursor: 'pointer' }} />
    </HeaderContainer>
  );
};

export default Header;
