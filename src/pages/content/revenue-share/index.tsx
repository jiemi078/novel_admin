import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ActionType,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef } from 'react';
import { revenueShareColumns } from './columns';
import type { RevenueShareCreateValues, RevenueShareItem } from './types';
import { createRevenueShare, queryRevenueSharePage } from '@/services/content/revenue-share';

const RevenueSharePage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);

  return (
    <PageContainer title={false}>
      <ProTable<RevenueShareItem>
        rowKey="id"
        actionRef={actionRef}
        columns={revenueShareColumns}
        request={queryRevenueSharePage}
        scroll={{ x: 1500 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        search={{ labelWidth: 90 }}
        toolBarRender={() => [
          <ModalForm<RevenueShareCreateValues>
            key="create"
            title="新增分账配置"
            width={620}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createRevenueShare(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="partnerName" label="合作方" rules={[{ required: true, message: '请输入合作方名称' }]} />
            <ProFormText name="partnerId" label="合作方ID" rules={[{ required: true, message: '请输入合作方ID' }]} />
            <ProFormSelect
              name="revenueType"
              label="分账类型"
              initialValue="subscription"
              options={[
                { label: '订阅收入', value: 'subscription' },
                { label: '金币充值', value: 'coin_recharge' },
                { label: '广告收入', value: 'ad_income' },
              ]}
            />
            <ProFormDigit
              name="platformShareRate"
              label="平台比例"
              min={0}
              max={100}
              fieldProps={{ addonAfter: '%' }}
              rules={[{ required: true, message: '请输入平台比例' }]}
            />
            <ProFormDigit
              name="partnerShareRate"
              label="合作方比例"
              min={0}
              max={100}
              fieldProps={{ addonAfter: '%' }}
              rules={[{ required: true, message: '请输入合作方比例' }]}
            />
            <ProFormDigit
              name="minGuaranteeAmount"
              label="保底金额"
              min={0}
              initialValue={0}
              fieldProps={{ precision: 2 }}
            />
            <ProFormDatePicker
              name="effectiveStartDate"
              label="生效开始时间"
              rules={[{ required: true, message: '请选择生效开始时间' }]}
            />
            <ProFormDatePicker name="effectiveEndDate" label="生效结束时间" />
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

export default RevenueSharePage;
