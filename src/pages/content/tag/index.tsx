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
import { createTag, queryTagPage, type TagCreateValues } from '@/services/content/tag';
import { getTagColumns } from './columns';
import type { TagItem, TagPageParams } from './types';

const TagPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => getTagColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<TagItem, TagPageParams>
        headerTitle="小说标签管理"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1230 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryTagPage(params)}
        toolBarRender={() => [
          <ModalForm<TagCreateValues>
            key="create"
            title="新增标签"
            width={520}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增标签
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createTag(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="name" label="标签名称" rules={[{ required: true, message: '请输入标签名称' }]} />
            <ProFormSelect
              name="language"
              label="语言"
              initialValue="en"
              options={[
                { label: 'en', value: 'en' },
                { label: 'zh-CN', value: 'zh-CN' },
                { label: 'zh', value: 'zh' },
              ]}
            />
            <ProFormSelect
              name="contentType"
              label="内容类型"
              initialValue={2}
              options={[
                { label: '短剧', value: 1 },
                { label: '小说', value: 2 },
              ]}
            />
            <ProFormDigit name="sortOrder" label="排序" min={0} initialValue={0} />
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

export default TagPage;
