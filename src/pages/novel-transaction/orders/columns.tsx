import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { PaymentOrderItem } from './types';

const statusMap = {
  paid: { text: '已支付', color: 'success' },
  pending: { text: '待支付', color: 'warning' },
  failed: { text: '支付失败', color: 'error' },
  refunded: { text: '已退款', color: 'default' },
} as const;

export const getPaymentOrderColumns = (): ProColumns<PaymentOrderItem>[] => [
  {
    title: '订单ID',
    dataIndex: 'id',
    width: 170,
    fixed: 'left',
    search: false,
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    width: 170,
    fieldProps: {
      placeholder: '请输入用户ID',
    },
  },
  {
    title: '系统',
    dataIndex: 'system',
    width: 100,
    valueType: 'select',
    valueEnum: {
      iOS: { text: 'iOS' },
      Android: { text: 'Android' },
      Web: { text: 'Web' },
    },
  },
  {
    title: '金币商品',
    dataIndex: 'coinProduct',
    hideInTable: true,
    fieldProps: {
      placeholder: '全部',
    },
  },
  {
    title: '订阅商品',
    dataIndex: 'subscriptionProduct',
    hideInTable: true,
    fieldProps: {
      placeholder: '全部',
    },
  },
  {
    title: '订单号',
    dataIndex: 'orderNo',
    width: 190,
    fieldProps: {
      placeholder: '请输入订单号',
    },
  },
  {
    title: '三方订单ID',
    dataIndex: 'thirdPartyOrderId',
    width: 200,
    fieldProps: {
      placeholder: '请输入三方订单ID',
    },
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    width: 110,
    valueType: 'select',
    valueEnum: {
      paid: { text: '已支付', status: 'Success' },
      pending: { text: '待支付', status: 'Warning' },
      failed: { text: '支付失败', status: 'Error' },
      refunded: { text: '已退款', status: 'Default' },
    },
    render: (_, record) => {
      const status = statusMap[record.orderStatus];
      return <Tag color={status.color}>{status.text}</Tag>;
    },
  },
  {
    title: '支付渠道',
    dataIndex: 'paymentChannel',
    width: 120,
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
    title: '用户注册时间',
    dataIndex: 'userRegisteredAt',
    width: 170,
    valueType: 'dateTime',
    search: false,
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
    width: 180,
    search: false,
  },
  {
    title: '支付金额',
    dataIndex: 'amount',
    width: 110,
    search: false,
    render: (_, record) => `${record.currency} ${record.amount.toFixed(2)}`,
  },
  {
    title: '下单时间',
    dataIndex: 'createdAt',
    width: 170,
    valueType: 'dateTime',
    search: {
      transform: (value: [string, string]) => ({ createdAt: value }),
    },
  },
  {
    title: '支付时间',
    dataIndex: 'paidAt',
    width: 170,
    valueType: 'dateTime',
    search: {
      transform: (value: [string, string]) => ({ paidAt: value }),
    },
    renderText: (value) => value || '-',
  },
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
