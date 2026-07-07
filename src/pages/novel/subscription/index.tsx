import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProTable,
  type ActionType,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useMemo, useRef } from 'react';
import { createNovelSubscription, queryNovelSubscriptionManagePage } from '@/services/novel/subscription';
import { getNovelSubscriptionColumns } from './columns';
import type { NovelSubscriptionCreateValues, NovelSubscriptionItem, NovelSubscriptionPageParams } from './types';

const NovelSubscriptionPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => getNovelSubscriptionColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<NovelSubscriptionItem, NovelSubscriptionPageParams>
        headerTitle="小说订阅管理"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1550 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryNovelSubscriptionManagePage(params)}
        actionRef={actionRef}
        toolBarRender={() => [
          <ModalForm<NovelSubscriptionCreateValues>
            key="create"
            title="新增"
            width={560}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createNovelSubscription(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]} />
            <ProFormSelect
              name="periodType"
              label="周期类型"
              initialValue="weekly"
              options={[
                { label: '天', value: 'daily' },
                { label: '周', value: 'weekly' },
                { label: '月', value: 'monthly' },
                { label: '季', value: 'quarterly' },
                { label: '年', value: 'yearly' },
              ]}
            />
            <ProFormDigit name="periodDays" label="周期天数" min={1} initialValue={7} />
            <ProFormDigit name="sortOrder" label="排序" min={0} initialValue={0} />
            <ProFormSelect
              name="status"
              label="状态"
              initialValue={1}
              options={[
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
              ]}
            />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};

export default NovelSubscriptionPage;
