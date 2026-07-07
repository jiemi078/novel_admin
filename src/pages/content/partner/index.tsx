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
import React, { useRef } from 'react';
import { partnerColumns } from './columns';
import type { ContentPartnerCreateValues, ContentPartnerItem } from './types';
import { createContentPartner, queryContentPartnerPage } from '@/services/content/partner';

const ContentPartnerPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);

  return (
    <PageContainer title={false}>
      <ProTable<ContentPartnerItem>
        rowKey="id"
        actionRef={actionRef}
        columns={partnerColumns}
        request={queryContentPartnerPage}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        search={{ labelWidth: 90 }}
        toolBarRender={() => [
          <ModalForm<ContentPartnerCreateValues>
            key="create"
            title="新增合作方"
            width={560}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createContentPartner(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="name" label="合作方名称" rules={[{ required: true, message: '请输入合作方名称' }]} />
            <ProFormText name="company" label="公司名称" rules={[{ required: true, message: '请输入公司名称' }]} />
            <ProFormText name="contactName" label="联系人" rules={[{ required: true, message: '请输入联系人' }]} />
            <ProFormText name="contactPhone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]} />
            <ProFormSelect
              name="settlementCycle"
              label="结算周期"
              initialValue="monthly"
              options={[
                { label: '月结', value: 'monthly' },
                { label: '季结', value: 'quarterly' },
                { label: '年结', value: 'yearly' },
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
            <ProFormTextArea name="remark" label="备注" fieldProps={{ rows: 3 }} />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};

export default ContentPartnerPage;
