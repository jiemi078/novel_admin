import type { ProColumns } from '@ant-design/pro-components';
import { Space } from 'antd';
import type { ReadHistoryItem } from './types';

export const getReadHistoryColumns = (): ProColumns<ReadHistoryItem>[] => [
  { title: '记录ID', dataIndex: 'id', width: 170, fixed: 'left', search: false },
  { title: '用户ID', dataIndex: 'userId', width: 180, fieldProps: { placeholder: '请输入用户ID' } },
  { title: '小说ID', dataIndex: 'novelId', width: 160, fieldProps: { placeholder: '请输入小说ID' } },
  { title: '小说名称', dataIndex: 'novelName', width: 180, fieldProps: { placeholder: '请输入小说名称' } },
  { title: '章节ID', dataIndex: 'chapterId', width: 150, search: false },
  { title: '章节', dataIndex: 'chapterName', width: 180, search: false },
  { title: '阅读进度', dataIndex: 'progress', width: 110, search: false },
  { title: '消耗金币', dataIndex: 'consumedCoins', width: 110, search: false },
  { title: '阅读时间', dataIndex: 'readAt', width: 170, valueType: 'dateTime', search: false },
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
