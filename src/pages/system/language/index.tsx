import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProTable,
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import {
  createSystemLanguage,
  querySystemLanguagePage,
  type SystemLanguageCreateValues,
  type SystemLanguageItem,
} from '@/services/system/language';

const columns: ProColumns<SystemLanguageItem>[] = [
  {
    title: '语言编码',
    dataIndex: 'keyword',
    width: 120,
    fieldProps: { placeholder: '编码/名称' },
    render: (_, row) => row.code,
  },
  {
    title: '语言名称',
    dataIndex: 'name',
    width: 160,
    search: false,
  },
  {
    title: '本地名称',
    dataIndex: 'nativeName',
    width: 160,
    search: false,
  },
  {
    title: '默认语言',
    dataIndex: 'isDefault',
    width: 110,
    search: false,
    render: (_, row) => (row.isDefault === 1 ? <Tag color="processing">默认</Tag> : '-'),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    valueEnum: {
      1: { text: '启用', status: 'Success' },
      0: { text: '禁用', status: 'Default' },
    },
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    width: 90,
    search: false,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 170,
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 120,
    render: () => (
      <Space>
        <a>编辑</a>
        <a>停用</a>
      </Space>
    ),
  },
];

const SystemLanguagePage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);

  return (
    <PageContainer title={false}>
      <ProTable<SystemLanguageItem>
        rowKey="code"
        actionRef={actionRef}
        columns={columns}
        request={querySystemLanguagePage}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        search={{ labelWidth: 80 }}
        toolBarRender={() => [
          <ModalForm<SystemLanguageCreateValues>
            key="create"
            title="新增语言"
            width={520}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createSystemLanguage(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="code" label="语言编码" rules={[{ required: true, message: '请输入语言编码' }]} />
            <ProFormText name="name" label="语言名称" rules={[{ required: true, message: '请输入语言名称' }]} />
            <ProFormText name="nativeName" label="本地名称" rules={[{ required: true, message: '请输入本地名称' }]} />
            <ProFormSelect
              name="isDefault"
              label="默认语言"
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
            <ProFormDigit name="sortOrder" label="排序" min={0} initialValue={0} />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};

export default SystemLanguagePage;
