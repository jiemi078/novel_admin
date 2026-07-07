import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { SubscriptionItem } from './types';

const statusMap = {
  active: { text: '订阅中', color: 'success' },
  expired: { text: '已过期', color: 'default' },
  cancelled: { text: '已取消', color: 'warning' },
  renew_failed: { text: '续订失败', color: 'error' },
} as const;

export const getSubscriptionColumns = (): ProColumns<SubscriptionItem>[] => [
  { title: '订阅ID', dataIndex: 'id', width: 180, fixed: 'left', search: false },
  { title: '用户ID', dataIndex: 'userId', width: 180, fieldProps: { placeholder: '请输入用户ID' } },
  { title: '商品', dataIndex: 'productName', width: 180, fieldProps: { placeholder: '请输入商品名称' } },
  {
    title: '周期',
    dataIndex: 'period',
    width: 100,
    valueType: 'select',
    valueEnum: {
      月订阅: { text: '月订阅' },
      年订阅: { text: '年订阅' },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 110,
    valueType: 'select',
    valueEnum: {
      active: { text: '订阅中', status: 'Success' },
      expired: { text: '已过期', status: 'Default' },
      cancelled: { text: '已取消', status: 'Warning' },
      renew_failed: { text: '续订失败', status: 'Error' },
    },
    render: (_, record) => {
      const status = statusMap[record.status];
      return <Tag color={status.color}>{status.text}</Tag>;
    },
  },
  {
    title: '支付渠道',
    dataIndex: 'paymentChannel',
    width: 130,
    valueType: 'select',
    valueEnum: {
      Stripe: { text: 'Stripe' },
      Apple: { text: 'Apple' },
      'Google Play': { text: 'Google Play' },
      PayPal: { text: 'PayPal' },
    },
    render: (_, record) => <Tag color="processing">{record.paymentChannel}</Tag>,
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 110,
    search: false,
    render: (_, record) => `${record.currency} ${record.amount.toFixed(2)}`,
  },
  { title: '开始时间', dataIndex: 'startedAt', width: 170, valueType: 'dateTime', search: false },
  { title: '到期时间', dataIndex: 'expiredAt', width: 170, valueType: 'dateTime', search: false },
  { title: '最近续订时间', dataIndex: 'renewedAt', width: 170, valueType: 'dateTime', search: false, renderText: (value) => value || '-' },
  {
    title: '操作',
    valueType: 'option',
    width: 120,
    fixed: 'right',
    render: () => (
      <Space size={8}>
        <a>详情</a>
      </Space>
    ),
  },
];
