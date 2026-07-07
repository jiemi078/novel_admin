import { PageContainer } from '@ant-design/pro-components';
import { Card, Empty } from 'antd';
import React from 'react';

const PermissionsPage: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Card title="角色权限">
        <Empty description="权限系统页面占位" />
      </Card>
    </PageContainer>
  );
};

export default PermissionsPage;
