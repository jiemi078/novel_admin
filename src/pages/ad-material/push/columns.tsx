import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { AdMaterialPushBatchItem } from './types';

const platformLabels: Record<string, string> = {
  facebook: 'Facebook',
  tiktok: 'TikTok',
};

const statusColors: Record<number, string> = {
  0: 'processing',
  1: 'success',
  2: 'warning',
  3: 'error',
};

const formatUnixTime = (value?: number) => {
  if (!value) return '-';
  return new Date(value * 1000).toLocaleString('zh-CN');
};

export const getAdMaterialPushColumns = (): ProColumns<AdMaterialPushBatchItem>[] => [
  { title: 'ID', dataIndex: 'id', width: 180, fixed: 'left', search: false },
  { title: '搜索素材名称', dataIndex: 'keyword', hideInTable: true, fieldProps: { placeholder: '内容项目/素材师/操作人' } },
  {
    title: '内容类型',
    dataIndex: 'contentType',
    valueType: 'select',
    valueEnum: {
      2: { text: '小说' },
    },
    hideInTable: true,
  },
  {
    title: '推送平台',
    dataIndex: 'platformCode',
    valueType: 'select',
    valueEnum: {
      facebook: { text: 'Facebook' },
      tiktok: { text: 'TikTok' },
    },
    hideInTable: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      [-1]: { text: '全部' },
      0: { text: '处理中' },
      1: { text: '已完成' },
      2: { text: '部分失败' },
      3: { text: '失败' },
    },
    initialValue: -1,
    hideInTable: true,
  },
  { title: 'App', dataIndex: 'appName', width: 220, search: false },
  { title: '内容类型', dataIndex: 'contentTypeName', width: 90, search: false },
  { title: '内容项目', dataIndex: 'contentProjectName', width: 260, search: false },
  { title: '语种', dataIndex: 'languageName', width: 90, search: false },
  {
    title: '平台',
    dataIndex: 'platformCode',
    width: 110,
    search: false,
    render: (_, record) => (
      <Tag color={record.platformCode === 'facebook' ? 'blue' : 'cyan'}>
        {platformLabels[record.platformCode] || record.platformCode}
      </Tag>
    ),
  },
  { title: '账号数', dataIndex: 'accountCount', width: 80, search: false },
  { title: '素材师', dataIndex: 'materialCreatorName', width: 120, search: false },
  {
    title: '进度 (成功/失败/处理中)',
    dataIndex: 'progress',
    width: 190,
    search: false,
    render: (_, record) => (
      <Space size={4} wrap>
        <Tag color="success">{record.successCount}</Tag>
        <Tag color={record.failCount > 0 ? 'error' : 'default'}>{record.failCount}</Tag>
        <Tag color={record.processingCount > 0 ? 'processing' : 'default'}>{record.processingCount}</Tag>
        <span style={{ color: '#999' }}>/ {record.totalCount}</span>
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'statusName',
    width: 110,
    search: false,
    render: (_, record) => <Tag color={statusColors[record.status] || 'default'}>{record.statusName}</Tag>,
  },
  { title: '操作人', dataIndex: 'createdByName', width: 110, search: false },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    search: false,
    render: (_, record) => formatUnixTime(record.createdAt),
  },
  {
    title: '操作',
    valueType: 'option',
    width: 90,
    fixed: 'right',
    render: () => <a>详情</a>,
  },
];
