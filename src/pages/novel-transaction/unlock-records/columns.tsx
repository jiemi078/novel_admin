import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { UnlockRecordItem } from './types';

const unlockTypeMap = {
  coins: { text: '金币解锁', color: 'blue' },
  subscription: { text: '订阅解锁', color: 'green' },
  free: { text: '免费解锁', color: 'default' },
} as const;

export const getUnlockRecordColumns = (): ProColumns<UnlockRecordItem>[] => [
  { title: '记录ID', dataIndex: 'id', width: 170, fixed: 'left', search: false },
  { title: '用户ID', dataIndex: 'userId', width: 180, fieldProps: { placeholder: '请输入用户ID' } },
  { title: '小说名称', dataIndex: 'novelName', width: 200, fieldProps: { placeholder: '请输入小说名称' } },
  { title: '小说ID', dataIndex: 'novelId', width: 150, search: false },
  { title: '章节ID', dataIndex: 'chapterId', width: 150, search: false },
  { title: '章节', dataIndex: 'chapterName', width: 180, search: false },
  {
    title: '解锁类型',
    dataIndex: 'unlockType',
    width: 120,
    valueType: 'select',
    valueEnum: {
      coins: { text: '金币解锁' },
      subscription: { text: '订阅解锁' },
      free: { text: '免费解锁' },
    },
    render: (_, record) => {
      const type = unlockTypeMap[record.unlockType];
      return <Tag color={type.color}>{type.text}</Tag>;
    },
  },
  { title: '消耗金币', dataIndex: 'consumedCoins', width: 110, search: false },
  { title: '解锁时间', dataIndex: 'unlockedAt', width: 170, valueType: 'dateTime', search: false },
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
