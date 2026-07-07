import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import {
  createSystemRole,
  querySystemRolePage,
  type SystemRoleCreateValues,
  type SystemRoleItem,
} from '@/services/system/role';

const columns: ProColumns<SystemRoleItem>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 170,
    search: false,
    copyable: true,
    ellipsis: true,
  },
  {
    title: '角色名称',
    dataIndex: 'keyword',
    width: 150,
    fieldProps: { placeholder: '角色名称/编码' },
    render: (_, row) => row.name,
  },
  {
    title: '角色编码',
    dataIndex: 'code',
    width: 160,
    search: false,
  },
  {
    title: '权限数',
    dataIndex: 'permissionCount',
    width: 100,
    search: false,
  },
  {
    title: '用户数',
    dataIndex: 'userCount',
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
    render: (_, row) => <Tag color={row.status === 1 ? 'success' : 'default'}>{row.status === 1 ? '启用' : '禁用'}</Tag>,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 220,
    search: false,
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 170,
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 140,
    render: () => (
      <Space>
        <a>编辑</a>
        <a>权限配置</a>
      </Space>
    ),
  },
];

const SystemRolePage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);

  return (
    <PageContainer title={false}>
      <ProTable<SystemRoleItem>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={querySystemRolePage}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        search={{ labelWidth: 80 }}
        toolBarRender={() => [
          <ModalForm<SystemRoleCreateValues>
            key="create"
            title="新增角色"
            width={560}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createSystemRole(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="name" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]} />
            <ProFormText name="code" label="角色编码" rules={[{ required: true, message: '请输入角色编码' }]} />
            <ProFormDigit name="permissionCount" label="权限数" min={0} initialValue={0} />
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

export default SystemRolePage;
