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
import { Button, Image, message, Popconfirm, Space, Tag } from 'antd';
import React, { useMemo, useRef } from 'react';
import {
  createRewardTask,
  deleteRewardTask,
  queryRewardTaskPage,
  type RewardTaskCreateValues,
  type RewardTaskItem,
  type RewardTaskPageParams,
} from '@/services/reward-center/tasks';

const taskCodeOptions = [
  { label: '阅读章节 (read_chapter)', value: 'read_chapter' },
  { label: '点赞小说 (like_novel)', value: 'like_novel' },
  { label: '收藏小说 (favorite_novel)', value: 'favorite_novel' },
  { label: '分享小说 (share_novel)', value: 'share_novel' },
  { label: '绑定邮箱 (bind_email)', value: 'bind_email' },
  { label: '观看广告 (watch_ad)', value: 'watch_ad' },
];

const getColumns = (actionRef: React.RefObject<ActionType | undefined>): ProColumns<RewardTaskItem>[] => [
  {
    title: '任务 Icon',
    dataIndex: 'taskIcon',
    width: 90,
    search: false,
    render: (_, record) =>
      record.taskIconPreviewUrl || record.taskIcon ? (
        <Image width={40} height={40} src={record.taskIconPreviewUrl || record.taskIcon} />
      ) : (
        '-'
      ),
  },
  { title: '关键词', dataIndex: 'keyword', hideInTable: true, fieldProps: { placeholder: '任务标题/编码/备注' } },
  {
    title: '状态',
    dataIndex: 'status',
    hideInTable: true,
    valueType: 'select',
    initialValue: -1,
    valueEnum: {
      [-1]: { text: '全部' },
      1: { text: '启用' },
      0: { text: '禁用' },
    },
  },
  { title: '任务标题', dataIndex: 'taskTitle', width: 200, search: false },
  { title: '任务编码', dataIndex: 'taskCode', width: 160, search: false },
  {
    title: '任务类型',
    dataIndex: 'taskType',
    width: 120,
    search: false,
    render: (_, record) => (record.taskType === 'daily' ? '每日任务' : '一次性任务'),
  },
  { title: '奖励 Bonus', dataIndex: 'bonusAmount', width: 120, search: false },
  { title: '每日上限', dataIndex: 'dailyLimit', width: 120, search: false },
  { title: '排序', dataIndex: 'sortOrder', width: 100, search: false },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    search: false,
    render: (_, record) => <Tag color={record.status === 1 ? 'success' : 'default'}>{record.status === 1 ? '启用' : '禁用'}</Tag>,
  },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180, valueType: 'dateTime', search: false },
  {
    title: '操作',
    valueType: 'option',
    width: 140,
    fixed: 'right',
    render: (_, record) => (
      <Space size={8}>
        <a>编辑</a>
        <Popconfirm
          title="确定删除该任务？"
          onConfirm={async () => {
            await deleteRewardTask(record.id);
            message.success('删除成功');
            actionRef.current?.reload();
          }}
        >
          <a style={{ color: '#ff4d4f' }}>删除</a>
        </Popconfirm>
      </Space>
    ),
  },
];

const TasksPage: React.FC = () => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => getColumns(actionRef), []);

  return (
    <PageContainer title={false}>
      <ProTable<RewardTaskItem, RewardTaskPageParams>
        headerTitle="日常任务"
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: 1350 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryRewardTaskPage(params)}
        actionRef={actionRef}
        toolBarRender={() => [
          <ModalForm<RewardTaskCreateValues>
            key="create"
            title="新增任务"
            width={720}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增任务
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await createRewardTask(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText name="taskTitle" label="任务标题" rules={[{ required: true, message: '请输入任务标题' }]} />
            <ProFormText name="taskIcon" label="任务 Icon" placeholder="请输入图标 URL" />
            <ProFormSelect
              name="taskType"
              label="任务类型"
              initialValue="daily"
              options={[
                { label: '每日任务', value: 'daily' },
                { label: '一次性任务', value: 'one_time' },
              ]}
              rules={[{ required: true, message: '请选择任务类型' }]}
            />
            <ProFormSelect
              name="taskCode"
              label="任务编码"
              initialValue="read_chapter"
              options={taskCodeOptions}
              rules={[{ required: true, message: '请选择任务编码' }]}
            />
            <ProFormDigit name="bonusAmount" label="奖励 Bonus" min={0} initialValue={0} rules={[{ required: true }]} />
            <ProFormDigit name="dailyLimit" label="每日上限" min={1} initialValue={1} rules={[{ required: true }]} />
            <ProFormText name="jumpUrl" label="跳转链接" placeholder="可选，未来前台任务跳转使用" />
            <ProFormDigit name="sortOrder" label="排序" min={0} initialValue={0} />
            <ProFormSelect
              name="status"
              label="状态"
              initialValue={1}
              options={[
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
              ]}
            />
            <ProFormTextArea name="remark" label="备注" placeholder="后台备注" />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};

export default TasksPage;
