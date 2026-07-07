import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useMemo } from 'react';
import { queryUserAccountPage } from '@/services/novel-transaction/accounts';
import { getUserAccountColumns } from './columns';
import type { UserAccountItem, UserAccountPageParams } from './types';

const UserAccountsPage: React.FC = () => {
  const columns = useMemo(() => getUserAccountColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<UserAccountItem, UserAccountPageParams>
        headerTitle="用户账户"
        rowKey="userId"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1250 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryUserAccountPage(params)}
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default UserAccountsPage;
