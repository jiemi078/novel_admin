import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useMemo } from 'react';
import { queryPaymentOrderPage } from '@/services/novel-transaction/orders';
import { getPaymentOrderColumns } from './columns';
import type { PaymentOrderItem, PaymentOrderPageParams } from './types';

const PaymentOrdersPage: React.FC = () => {
  const columns = useMemo(() => getPaymentOrderColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<PaymentOrderItem, PaymentOrderPageParams>
        headerTitle="支付订单"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1800 }}
        search={{
          labelWidth: 90,
          collapseRender: false,
          defaultCollapsed: false,
        }}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 20,
          showSizeChanger: true,
        }}
        request={async (params) => queryPaymentOrderPage(params)}
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default PaymentOrdersPage;
