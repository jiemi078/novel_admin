import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useMemo } from 'react';
import { querySubscriptionPage } from '@/services/novel-transaction/subscriptions';
import { getSubscriptionColumns } from './columns';
import type { SubscriptionItem, SubscriptionPageParams } from './types';

const SubscriptionsPage: React.FC = () => {
  const columns = useMemo(() => getSubscriptionColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<SubscriptionItem, SubscriptionPageParams>
        headerTitle="订阅记录"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1500 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => querySubscriptionPage(params)}
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default SubscriptionsPage;
