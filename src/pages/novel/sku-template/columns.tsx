import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { NovelSkuTemplateItem } from './types';

const positionLabels: Record<string, string> = {
  store: '商店',
  unlock: '解锁',
  popup: '弹窗',
};

export const getNovelSkuTemplateColumns = (): ProColumns<NovelSkuTemplateItem>[] => [
  { title: 'ID', dataIndex: 'id', width: 180, fixed: 'left', search: false },
  { title: '关键词', dataIndex: 'keyword', hideInTable: true, fieldProps: { placeholder: '请输入名称或ID' } },
  {
    title: '展示位置',
    dataIndex: 'position',
    width: 120,
    valueType: 'select',
    valueEnum: {
      store: { text: '商店' },
      unlock: { text: '解锁' },
      popup: { text: '弹窗' },
    },
    render: (_, record) => positionLabels[record.position] || record.position,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      1: { text: '启用', status: 'Success' },
      0: { text: '禁用', status: 'Default' },
    },
    hideInTable: true,
  },
  { title: 'App', dataIndex: 'appName', width: 220, search: false },
  { title: '名称', dataIndex: 'name', width: 180, search: false },
  {
    title: '兜底模版',
    dataIndex: 'isDefault',
    width: 110,
    search: false,
    render: (_, record) => (record.isDefault === 1 ? <Tag color="blue">兜底</Tag> : '-'),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    search: false,
    render: (_, record) => <Tag color={record.status === 1 ? 'success' : 'default'}>{record.status === 1 ? '启用' : '禁用'}</Tag>,
  },
  { title: '更新时间', dataIndex: 'updatedAt', width: 170, valueType: 'dateTime', search: false },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    fixed: 'right',
    render: () => (
      <Space size={8}>
        <a>编辑</a>
        <a>编辑SKU</a>
        <a style={{ color: '#ff4d4f' }}>删除</a>
      </Space>
    ),
  },
];
