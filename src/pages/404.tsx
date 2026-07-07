import { Result } from 'antd';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return <Result status="404" title="404" subTitle="页面不存在" />;
};

export default NotFoundPage;
