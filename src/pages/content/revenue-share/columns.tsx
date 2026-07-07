import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { RevenueShareItem } from './types';

export const revenueShareColumns: ProColumns<RevenueShareItem>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 190,
    search: false,
    copyable: true,
    ellipsis: true,
  },
  {
    title: '合作方',
    dataIndex: 'partnerName',
    width: 160,
    fieldProps: { placeholder: '请输入合作方名称' },
  },
  {
    title: '合作方ID',
    dataIndex: 'partnerId',
    width: 170,
    search: false,
    copyable: true,
    ellipsis: true,
  },
  {
    title: '分账类型',
    dataIndex: 'revenueType',
    width: 130,
    valueEnum: {
      subscription: { text: '订阅收入' },
      coin_recharge: { text: '金币充值' },
      ad_income: { text: '广告收入' },
    },
  },
  {
    title: '平台比例',
    dataIndex: 'platformShareRate',
    width: 110,
    search: false,
    renderText: (value) => `${value}%`,
  },
  {
    title: '合作方比例',
    dataIndex: 'partnerShareRate',
    width: 120,
    search: false,
    renderText: (value) => `${value}%`,
  },
  {
    title: '保底金额',
    dataIndex: 'minGuaranteeAmount',
    width: 120,
    search: false,
    valueType: 'money',
  },
  {
    title: '生效开始时间',
    dataIndex: 'effectiveStartDate',
    width: 150,
    search: false,
  },
  {
    title: '生效结束时间',
    dataIndex: 'effectiveEndDate',
    width: 150,
    search: false,
    renderText: (value) => value || '-',
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
    width: 160,
    search: false,
    ellipsis: true,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 120,
    fixed: 'right',
    render: () => (
      <Space>
        <a>编辑</a>
        <a>停用</a>
      </Space>
    ),
  },
];
