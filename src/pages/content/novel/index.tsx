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
import { createNovel, queryNovelPage, type NovelCreateValues } from '@/services/content/novel';
import { getNovelColumns } from './columns';
import type { NovelItem, NovelPageParams } from './types';

const NovelPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => getNovelColumns(), []);

  return (
    <PageContainer title={false}>
      <ProTable<NovelItem, NovelPageParams>
        headerTitle="小说管理"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 2600 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryNovelPage(params)}
        toolBarRender={() => [
          <ModalForm<NovelCreateValues>
            key="create"
            title="新增小说"
            width={560}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增小说
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createNovel(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="title" label="项目标题" rules={[{ required: true, message: '请输入项目标题' }]} />
            <ProFormText name="authorName" label="作者" rules={[{ required: true, message: '请输入作者' }]} />
            <ProFormText name="promoTitle" label="推广标题" />
            <ProFormDigit name="rating" label="评分" min={0} max={5} initialValue={4.5} />
            <ProFormSelect
              name="sourceLanguage"
              label="语言"
              initialValue="en"
              rules={[{ required: true, message: '请选择语言' }]}
              options={[
                { label: '英语', value: 'en' },
                { label: '西语', value: 'es' },
                { label: '葡语', value: 'pt' },
              ]}
            />
            <ProFormText name="genreName" label="题材" initialValue="Contemporary Romance" rules={[{ required: true, message: '请输入题材' }]} />
            <ProFormSelect
              name="tagNames"
              label="标签"
              mode="multiple"
              options={[
                { label: 'Reborn', value: 'Reborn' },
                { label: 'Contemporary Romance', value: 'Contemporary Romance' },
                { label: 'Billionaire', value: 'Billionaire' },
              ]}
            />
            <ProFormDigit name="plannedTotalItems" label="计划章节" min={0} initialValue={1} />
            <ProFormDigit name="totalItems" label="总章节" min={0} initialValue={1} />
            <ProFormDigit name="publishedItems" label="已发布章节" min={0} initialValue={0} />
            <ProFormDigit name="totalWordCount" label="总字数" min={0} initialValue={0} />
            <ProFormDigit name="readCount" label="阅读数" min={0} initialValue={0} />
            <ProFormText name="appPriceTemplateId" label="App价格模板ID" initialValue="325197909047922688" />
            <ProFormSelect
              name="status"
              label="项目状态"
              initialValue={1}
              rules={[{ required: true, message: '请选择状态' }]}
              options={[
                { label: '启用', value: 1 },
                { label: '停用', value: 0 },
              ]}
            />
            <ProFormSelect
              name="h5Status"
              label="H5状态"
              initialValue={1}
              options={[
                { label: '启用', value: 1 },
                { label: '停用', value: 0 },
              ]}
            />
            <ProFormSelect
              name="appStatus"
              label="App状态"
              initialValue={0}
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

export default NovelPage;
