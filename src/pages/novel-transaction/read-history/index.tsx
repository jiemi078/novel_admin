import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useMemo } from 'react';
import { queryReadHistoryPage } from '@/services/novel-transaction/read-history';
import { getReadHistoryColumns } from './columns';
import type { ReadHistoryItem, ReadHistoryPageParams } from './types';

const ReadHistoryPage: React.FC = () => {
  const columns = useMemo(() => getReadHistoryColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<ReadHistoryItem, ReadHistoryPageParams>
        headerTitle="阅读历史"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1450 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryReadHistoryPage(params)}
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default ReadHistoryPage;
