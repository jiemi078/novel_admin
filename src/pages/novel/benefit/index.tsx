import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ActionType,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useMemo, useRef } from 'react';
import { createNovelBenefit, queryNovelBenefitPage } from '@/services/novel/benefit';
import { getNovelBenefitColumns } from './columns';
import type { NovelBenefitCreateValues, NovelBenefitItem, NovelBenefitPageParams } from './types';

const NovelBenefitPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => getNovelBenefitColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<NovelBenefitItem, NovelBenefitPageParams>
        headerTitle="小说权益管理"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1450 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryNovelBenefitPage(params)}
        actionRef={actionRef}
        toolBarRender={() => [
          <ModalForm<NovelBenefitCreateValues>
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
              await createNovelBenefit(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormSelect
              name="type"
              label="权益类型"
              initialValue={1}
              options={[
                { label: '顶部权益', value: 1 },
                { label: '商品权益', value: 2 },
              ]}
            />
            <ProFormText name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]} />
            <ProFormTextArea name="description" label="描述" />
            <ProFormText name="iconUrl" label="图标" placeholder="请输入图标 URL" />
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

export default NovelBenefitPage;
