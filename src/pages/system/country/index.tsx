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
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import {
  createSystemCountry,
  querySystemCountryPage,
  type SystemCountryCreateValues,
  type SystemCountryItem,
} from '@/services/system/country';

const regionOptions = ['North America', 'Europe', 'Oceania', 'South America', 'Asia'].map((region) => ({
  label: region,
  value: region,
}));

const columns: ProColumns<SystemCountryItem>[] = [
  {
    title: '国家编码',
    dataIndex: 'keyword',
    width: 120,
    fieldProps: { placeholder: '编码/名称/币种' },
    render: (_, row) => row.code,
  },
  {
    title: '国家名称',
    dataIndex: 'name',
    width: 180,
    search: false,
  },
  {
    title: '地区',
    dataIndex: 'region',
    width: 160,
    valueEnum: Object.fromEntries(regionOptions.map((item) => [item.value, { text: item.label }])),
  },
  {
    title: '币种',
    dataIndex: 'currencyCode',
    width: 100,
    search: false,
  },
  {
    title: '语言',
    dataIndex: 'languageCode',
    width: 100,
    search: false,
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

const SystemCountryPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);

  return (
    <PageContainer title={false}>
      <ProTable<SystemCountryItem>
        rowKey="code"
        actionRef={actionRef}
        columns={columns}
        request={querySystemCountryPage}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        search={{ labelWidth: 80 }}
        toolBarRender={() => [
          <ModalForm<SystemCountryCreateValues>
            key="create"
            title="新增国家"
            width={560}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createSystemCountry(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="code" label="国家编码" rules={[{ required: true, message: '请输入国家编码' }]} />
            <ProFormText name="name" label="国家名称" rules={[{ required: true, message: '请输入国家名称' }]} />
            <ProFormSelect
              name="region"
              label="地区"
              initialValue="North America"
              options={regionOptions}
            />
            <ProFormText name="currencyCode" label="币种" rules={[{ required: true, message: '请输入币种' }]} />
            <ProFormText name="languageCode" label="语言" rules={[{ required: true, message: '请输入语言' }]} />
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

export default SystemCountryPage;
