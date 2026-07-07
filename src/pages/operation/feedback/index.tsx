import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
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
  createOperationFeedback,
  queryOperationFeedbackPage,
  updateOperationFeedbackStatus,
  type OperationFeedbackCreateValues,
  type OperationFeedbackItem,
} from '@/services/operation/feedback';

const feedbackTypeEnum = {
  bug: { text: 'Bug反馈' },
  payment: { text: '支付问题' },
  content: { text: '内容问题' },
  suggestion: { text: '产品建议' },
  other: { text: '其他' },
};

const statusEnum = {
  0: { text: '待处理', status: 'Warning' },
  1: { text: '已处理', status: 'Success' },
  2: { text: '已忽略', status: 'Default' },
};

const OperationFeedbackPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);

  const handleStatusChange = async (id: string, status: 1 | 2) => {
    await updateOperationFeedbackStatus(id, status);
    message.success(status === 1 ? '已标记处理' : '已忽略');
    actionRef.current?.reload();
  };

  const columns: ProColumns<OperationFeedbackItem>[] = [
    {
      title: '反馈ID',
      dataIndex: 'id',
      width: 150,
      search: false,
      copyable: true,
      ellipsis: true,
    },
    {
      title: '用户',
      dataIndex: 'keyword',
      width: 170,
      fieldProps: { placeholder: '用户ID/昵称/内容' },
      render: (_, row) => (
        <Space direction="vertical" size={0}>
          <span>{row.nickname}</span>
          <span style={{ color: '#999' }}>{row.userId}</span>
        </Space>
      ),
    },
    {
      title: '反馈类型',
      dataIndex: 'feedbackType',
      width: 120,
      valueEnum: feedbackTypeEnum,
    },
    {
      title: '反馈内容',
      dataIndex: 'content',
      width: 320,
      search: false,
      ellipsis: true,
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      width: 180,
      search: false,
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      width: 110,
      valueEnum: statusEnum,
      render: (_, row) => {
        const colors = { 0: 'warning', 1: 'success', 2: 'default' } as const;
        return <Tag color={colors[row.status]}>{statusEnum[row.status].text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 170,
      valueType: 'date',
      render: (_, row) => row.createdAt,
    },
    {
      title: '处理人',
      dataIndex: 'handler',
      width: 110,
      search: false,
      renderText: (value) => value || '-',
    },
    {
      title: '处理时间',
      dataIndex: 'handledAt',
      width: 170,
      search: false,
      renderText: (value) => value || '-',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 170,
      fixed: 'right',
      render: (_, row) => (
        <Space>
          <a>查看</a>
          {row.status === 0 && <a onClick={() => handleStatusChange(row.id, 1)}>标记已处理</a>}
          {row.status === 0 && <a onClick={() => handleStatusChange(row.id, 2)}>忽略</a>}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<OperationFeedbackItem>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={queryOperationFeedbackPage}
        scroll={{ x: 1550 }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        search={{ labelWidth: 90 }}
        toolBarRender={() => [
          <ModalForm<OperationFeedbackCreateValues>
            key="create"
            title="新增反馈"
            width={620}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createOperationFeedback(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="userId" label="用户ID" rules={[{ required: true, message: '请输入用户ID' }]} />
            <ProFormText name="nickname" label="用户昵称" rules={[{ required: true, message: '请输入用户昵称' }]} />
            <ProFormSelect
              name="feedbackType"
              label="反馈类型"
              initialValue="bug"
              valueEnum={feedbackTypeEnum}
              rules={[{ required: true, message: '请选择反馈类型' }]}
            />
            <ProFormText name="contact" label="联系方式" />
            <ProFormTextArea
              name="content"
              label="反馈内容"
              fieldProps={{ rows: 4 }}
              rules={[{ required: true, message: '请输入反馈内容' }]}
            />
            <ProFormTextArea name="remark" label="备注" fieldProps={{ rows: 3 }} />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};

export default OperationFeedbackPage;
