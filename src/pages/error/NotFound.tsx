import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

export declare type NotFoundPageProps = {};
const NotFound: React.FC<NotFoundPageProps> = () => {
  const navigate = useNavigate();
  document.title = '404 | Not Found';
  return (
    <Result
      status="404"
      title="Not Found"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => { navigate('/') }}>返回首页</Button>}
    />
  )
}

export default NotFound;
