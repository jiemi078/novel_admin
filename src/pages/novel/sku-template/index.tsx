import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProFormSelect,
  ProFormText,
  ProTable,
  type ActionType,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useMemo, useRef } from 'react';
import { createNovelSkuTemplate, queryNovelSkuTemplatePage } from '@/services/novel/sku-template';
import { getNovelSkuTemplateColumns } from './columns';
import type { NovelSkuTemplateCreateValues, NovelSkuTemplateItem, NovelSkuTemplatePageParams } from './types';

const NovelSkuTemplatePage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => getNovelSkuTemplateColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<NovelSkuTemplateItem, NovelSkuTemplatePageParams>
        headerTitle="小说SKU模板"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1250 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryNovelSkuTemplatePage(params)}
        actionRef={actionRef}
        toolBarRender={() => [
          <ModalForm<NovelSkuTemplateCreateValues>
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
              await createNovelSkuTemplate(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]} />
            <ProFormSelect
              name="position"
              label="展示位置"
              initialValue="store"
              options={[
                { label: '商店', value: 'store' },
                { label: '解锁', value: 'unlock' },
                { label: '弹窗', value: 'popup' },
              ]}
            />
            <ProFormSelect
              name="isDefault"
              label="兜底模版"
              initialValue={0}
              options={[
                { label: '是', value: 1 },
                { label: '否', value: 0 },
              ]}
            />
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

export default NovelSkuTemplatePage;
