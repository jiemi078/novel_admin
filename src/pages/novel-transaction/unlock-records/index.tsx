import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useMemo } from 'react';
import { queryUnlockRecordPage } from '@/services/novel-transaction/unlock-records';
import { getUnlockRecordColumns } from './columns';
import type { UnlockRecordItem, UnlockRecordPageParams } from './types';

const UnlockRecordsPage: React.FC = () => {
  const columns = useMemo(() => getUnlockRecordColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<UnlockRecordItem, UnlockRecordPageParams>
        headerTitle="解锁记录"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1450 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryUnlockRecordPage(params)}
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default UnlockRecordsPage;
