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
import { createAdMaterialPush, queryAdMaterialPushPage } from '@/services/ad-material/push';
import { getAdMaterialPushColumns } from './columns';
import type { AdMaterialPushBatchItem, AdMaterialPushCreateValues, AdMaterialPushPageParams } from './types';

const AdMaterialPushPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => getAdMaterialPushColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<AdMaterialPushBatchItem, AdMaterialPushPageParams>
        headerTitle="素材推送列表"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1940 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryAdMaterialPushPage(params)}
        actionRef={actionRef}
        toolBarRender={() => [
          <ModalForm<AdMaterialPushCreateValues>
            key="create"
            title="新增推送"
            width={640}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增推送
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createAdMaterialPush(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText
              name="contentProjectName"
              label="内容项目"
              placeholder="请输入内容项目名称"
              rules={[{ required: true, message: '请输入内容项目名称' }]}
            />
            <ProFormSelect
              name="languageCode"
              label="语种"
              initialValue="en"
              options={[
                { label: '英语', value: 'en' },
                { label: '中文', value: 'zh' },
              ]}
            />
            <ProFormSelect
              name="platformCode"
              label="推送平台"
              initialValue="facebook"
              options={[
                { label: 'Facebook', value: 'facebook' },
                { label: 'TikTok', value: 'tiktok' },
              ]}
            />
            <ProFormText
              name="materialCreatorName"
              label="素材师"
              initialValue="linguang"
              rules={[{ required: true, message: '请输入素材师' }]}
            />
            <ProFormSelect
              name="adAccountIds"
              label="广告账号"
              mode="multiple"
              initialValue={['2398641993976082']}
              options={[
                { label: '2398641993976082', value: '2398641993976082' },
                { label: 'mock-account-02', value: 'mock-account-02' },
              ]}
              rules={[{ required: true, message: '请选择广告账号' }]}
            />
            <ProFormDigit
              name="totalCount"
              label="素材数量"
              min={1}
              initialValue={1}
              rules={[{ required: true, message: '请输入素材数量' }]}
            />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};

export default AdMaterialPushPage;
