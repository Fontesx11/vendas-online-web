import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';

const Product = () => {
  const { user, notification } = useGlobalContext();

  console.log('user Product', user, notification);
  return <div>{`Produtos ${user?.name}`}</div>;
};

export default Product;
