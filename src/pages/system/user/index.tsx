import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProFormSelect,
  ProFormText,
  ProTable,
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import {
  createSystemUser,
  querySystemUserPage,
  type SystemUserCreateValues,
  type SystemUserItem,
} from '@/services/system/user';

const columns: ProColumns<SystemUserItem>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 170,
    search: false,
    copyable: true,
    ellipsis: true,
  },
  {
    title: '用户名',
    dataIndex: 'keyword',
    width: 140,
    fieldProps: { placeholder: '用户名/昵称/邮箱' },
    render: (_, row) => row.username,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 140,
    search: false,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
    search: false,
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 180,
    search: false,
    render: (_, row) => row.roles.map((role) => <Tag key={role}>{role}</Tag>),
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
    title: '最后登录时间',
    dataIndex: 'lastLoginAt',
    width: 170,
    search: false,
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
        <a>重置密码</a>
      </Space>
    ),
  },
];

const SystemUserPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);

  return (
    <PageContainer title={false}>
      <ProTable<SystemUserItem>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={querySystemUserPage}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        search={{ labelWidth: 80 }}
        toolBarRender={() => [
          <ModalForm<SystemUserCreateValues>
            key="create"
            title="新增用户"
            width={560}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createSystemUser(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]} />
            <ProFormText name="nickname" label="昵称" rules={[{ required: true, message: '请输入昵称' }]} />
            <ProFormText name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]} />
            <ProFormSelect
              name="roles"
              label="角色"
              mode="multiple"
              initialValue={['运营']}
              options={['超级管理员', '运营', '财务', '投放', '只读'].map((role) => ({ label: role, value: role }))}
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
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};

export default SystemUserPage;
