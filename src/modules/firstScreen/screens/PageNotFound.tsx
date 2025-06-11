import { Button, Result } from 'antd';

import { ContainerPageNotFound } from '../styles/pageNotFound.styles';

const PageNotFound = () => {
  return (
    <ContainerPageNotFound>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" href="/login">
            Back Home
          </Button>
        }
      />
    </ContainerPageNotFound>
  );
};

export default PageNotFound;
