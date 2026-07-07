import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { UserAccountItem } from './types';

export const getUserAccountColumns = (): ProColumns<UserAccountItem>[] => [
  { title: '用户ID', dataIndex: 'userId', width: 180, fixed: 'left', fieldProps: { placeholder: '请输入用户ID' } },
  { title: '昵称', dataIndex: 'nickname', width: 140, fieldProps: { placeholder: '请输入昵称' } },
  { title: '余额金币', dataIndex: 'coinBalance', width: 110, search: false },
  { title: '累计充值金币', dataIndex: 'totalRechargeCoins', width: 130, search: false },
  { title: '累计消耗金币', dataIndex: 'totalConsumedCoins', width: 130, search: false },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    valueType: 'select',
    valueEnum: {
      normal: { text: '正常', status: 'Success' },
      frozen: { text: '冻结', status: 'Error' },
    },
    render: (_, record) =>
      record.status === 'normal' ? <Tag color="success">正常</Tag> : <Tag color="error">冻结</Tag>,
  },
  { title: '注册时间', dataIndex: 'registeredAt', width: 170, valueType: 'dateTime', search: false },
  { title: '更新时间', dataIndex: 'updatedAt', width: 170, valueType: 'dateTime', search: false },
  {
    title: '操作',
    valueType: 'option',
    width: 140,
    fixed: 'right',
    render: () => (
      <Space size={8}>
        <a>流水</a>
        <a>详情</a>
      </Space>
    ),
  },
];
