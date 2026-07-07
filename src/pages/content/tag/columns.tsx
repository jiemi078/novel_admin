import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { TagItem } from './types';

export const getTagColumns = (): ProColumns<TagItem>[] => [
  { title: '标签ID', dataIndex: 'id', width: 150, fixed: 'left', search: false },
  {
    title: '标签名称',
    dataIndex: 'name',
    width: 260,
    fieldProps: { placeholder: '请输入标签名称' },
    render: (_, record) => (
      <Space size={4} wrap>
        {record.names.map((item) => (
          <Tag key={item.id}>
            {item.language}: {item.name}
          </Tag>
        ))}
      </Space>
    ),
  },
  { title: '内容类型', dataIndex: 'contentType', width: 110, search: false, render: (_, record) => (record.contentType === 2 ? '小说' : '短剧') },
  { title: '排序', dataIndex: 'sortOrder', width: 90, search: false },
  {
    title: '状态',
    dataIndex: 'status',
    width: 110,
    valueType: 'select',
    valueEnum: {
      1: { text: '启用', status: 'Success' },
      0: { text: '停用', status: 'Default' },
    },
    render: (_, record) =>
      record.status === 1 ? <Tag color="success">启用</Tag> : <Tag>停用</Tag>,
  },
  { title: '创建时间', dataIndex: 'createdAt', width: 170, valueType: 'dateTime', search: false },
  { title: '更新时间', dataIndex: 'updatedAt', width: 170, valueType: 'dateTime', search: false },
  {
    title: '操作',
    valueType: 'option',
    width: 150,
    fixed: 'right',
    render: () => (
      <Space size={8}>
        <a>编辑</a>
        <a style={{ color: '#ff4d4f' }}>删除</a>
      </Space>
    ),
  },
];
