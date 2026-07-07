import { GlobalOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { Image, Space, Tag } from 'antd';
import type { NovelBenefitItem } from './types';

const benefitTypeLabels: Record<number, string> = {
  1: '顶部权益',
  2: '商品权益',
};

export const getNovelBenefitColumns = (): ProColumns<NovelBenefitItem>[] => [
  { title: 'ID', dataIndex: 'id', width: 180, fixed: 'left', search: false },
  { title: '关键词', dataIndex: 'keyword', hideInTable: true, fieldProps: { placeholder: '请输入名称或ID' } },
  {
    title: '权益类型',
    dataIndex: 'type',
    width: 120,
    valueType: 'select',
    valueEnum: {
      1: { text: '顶部权益' },
      2: { text: '商品权益' },
    },
    render: (_, record) => <Tag color={record.type === 1 ? 'blue' : 'purple'}>{benefitTypeLabels[record.type] || '未知'}</Tag>,
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
  { title: '名称', dataIndex: 'name', width: 280, search: false },
  { title: '描述', dataIndex: 'description', width: 260, ellipsis: true, search: false },
  {
    title: '图标',
    dataIndex: 'iconUrl',
    width: 90,
    search: false,
    render: (_, record) => (record.iconUrl ? <Image src={record.iconUrl} width={40} height={40} /> : '-'),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    search: false,
    render: (_, record) => <Tag color={record.status === 1 ? 'success' : 'default'}>{record.status === 1 ? '启用' : '禁用'}</Tag>,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    fixed: 'right',
    render: () => (
      <Space size={8}>
        <a>编辑</a>
        <a>
          <GlobalOutlined /> 多语言
        </a>
        <a style={{ color: '#ff4d4f' }}>删除</a>
      </Space>
    ),
  },
];
