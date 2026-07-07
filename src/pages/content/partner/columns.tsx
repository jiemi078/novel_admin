import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { ContentPartnerItem } from './types';

export const partnerColumns: ProColumns<ContentPartnerItem>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 170,
    search: false,
    copyable: true,
    ellipsis: true,
  },
  {
    title: '合作方名称',
    dataIndex: 'name',
    width: 160,
    fieldProps: { placeholder: '请输入合作方名称/公司' },
  },
  {
    title: '公司名称',
    dataIndex: 'company',
    width: 180,
    search: false,
    ellipsis: true,
  },
  {
    title: '联系人',
    dataIndex: 'contactName',
    width: 120,
    search: false,
  },
  {
    title: '联系电话',
    dataIndex: 'contactPhone',
    width: 140,
    search: false,
  },
  {
    title: '结算周期',
    dataIndex: 'settlementCycle',
    width: 120,
    search: false,
    valueEnum: {
      monthly: { text: '月结' },
      quarterly: { text: '季结' },
      yearly: { text: '年结' },
    },
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
    width: 180,
    search: false,
    ellipsis: true,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 140,
    render: () => (
      <Space>
        <a>编辑</a>
        <a>分账配置</a>
      </Space>
    ),
  },
];
