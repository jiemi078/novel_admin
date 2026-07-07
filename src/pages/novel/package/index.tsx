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
import { createNovelPackage, queryNovelPackagePage } from '@/services/novel/package';
import { getNovelPackageColumns } from './columns';
import type { NovelPackageCreateValues, NovelPackageItem, NovelPackagePageParams } from './types';

const NovelPackagePage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => getNovelPackageColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<NovelPackageItem, NovelPackagePageParams>
        headerTitle="小说金币包管理"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1250 }}
        search={{
          labelWidth: 72,
          collapseRender: false,
          defaultCollapsed: false,
        }}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 20,
          showSizeChanger: true,
        }}
        request={async (params) => queryNovelPackagePage(params)}
        actionRef={actionRef}
        toolBarRender={() => [
          <ModalForm<NovelPackageCreateValues>
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
              await createNovelPackage(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]} />
            <ProFormSelect
              name="productType"
              label="类型"
              initialValue={1}
              options={[
                { label: '金币包', value: 1 },
                { label: '订阅包', value: 2 },
              ]}
            />
            <ProFormDigit name="coins" label="金币数" min={0} initialValue={0} />
            <ProFormDigit name="bonusCoins" label="赠送金币" min={0} initialValue={0} />
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

export default NovelPackagePage;
