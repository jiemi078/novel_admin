import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { NovelPackageItem } from './types';

const channelLabels: Record<string, string> = {
  apple: 'Apple',
  google: 'Google Play',
  airwallex: 'Airwallex',
  paypal: 'PayPal',
  stripe: 'Stripe',
};

export const getNovelPackageColumns = (): ProColumns<NovelPackageItem>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 180,
    search: false,
    fixed: 'left',
  },
  {
    title: '类型',
    dataIndex: 'productType',
    valueType: 'select',
    valueEnum: {
      1: { text: '金币包' },
      2: { text: '订阅包' },
    },
    width: 110,
    render: (_, record) => <Tag color="blue">{record.productType === 1 ? '金币包' : '订阅包'}</Tag>,
  },
  {
    title: '关键词',
    dataIndex: 'keyword',
    hideInTable: true,
    fieldProps: {
      placeholder: '请输入',
    },
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
  {
    title: 'App',
    dataIndex: 'appName',
    width: 220,
    search: false,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 180,
    search: false,
  },
  {
    title: '金币数',
    dataIndex: 'coins',
    width: 110,
    search: false,
  },
  {
    title: '赠送金币',
    dataIndex: 'bonusCoins',
    width: 120,
    search: false,
  },
  {
    title: '支付方式',
    dataIndex: 'channelConfigs',
    width: 220,
    search: false,
    render: (_, record) => (
      <Space size={4} wrap>
        {record.channelConfigs.length ? (
          record.channelConfigs.map((config) => (
            <Tag key={config.id} color={config.status === 1 ? 'processing' : 'default'}>
              {channelLabels[config.channel] || config.channel} ${config.price}
            </Tag>
          ))
        ) : (
          <span style={{ color: '#999' }}>未配置</span>
        )}
      </Space>
    ),
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    width: 90,
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    search: false,
    render: (_, record) => <Tag color={record.status === 1 ? 'success' : 'default'}>{record.status === 1 ? '启用' : '禁用'}</Tag>,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 170,
    valueType: 'dateTime',
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 220,
    fixed: 'right',
    render: () => (
      <Space size={8}>
        <a>支付方式</a>
        <a>多语言</a>
        <a>编辑</a>
        <a style={{ color: '#ff4d4f' }}>删除</a>
      </Space>
    ),
  },
];
