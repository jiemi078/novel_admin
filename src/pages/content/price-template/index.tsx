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
import {
  createPriceTemplate,
  queryPriceTemplatePage,
  type PriceTemplateCreateValues,
} from '@/services/content/price-template';
import { getPriceTemplateColumns } from './columns';
import type { PriceTemplateItem, PriceTemplatePageParams } from './types';

const PriceTemplatePage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => getPriceTemplateColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<PriceTemplateItem, PriceTemplatePageParams>
        headerTitle="小说价格模板"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1330 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryPriceTemplatePage(params)}
        toolBarRender={() => [
          <ModalForm<PriceTemplateCreateValues>
            key="create"
            title="新增价格模板"
            width={520}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增模板
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createPriceTemplate(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="name" label="模板名称" rules={[{ required: true, message: '请输入模板名称' }]} />
            <ProFormSelect
              name="contentType"
              label="内容类型"
              initialValue={2}
              options={[
                { label: '短剧', value: 1 },
                { label: '小说', value: 2 },
              ]}
            />
            <ProFormDigit name="billingMode" label="计费模式" min={0} initialValue={1} />
            <ProFormDigit name="wordCountUnit" label="字数单位" min={0} initialValue={1000} />
            <ProFormText name="description" label="描述" />
            <ProFormSelect
              name="status"
              label="状态"
              initialValue={1}
              rules={[{ required: true, message: '请选择状态' }]}
              options={[
                { label: '启用', value: 1 },
                { label: '停用', value: 0 },
              ]}
            />
          </ModalForm>,
        ]}
        actionRef={actionRef}
      />
    </PageContainer>
  );
};

export default PriceTemplatePage;
