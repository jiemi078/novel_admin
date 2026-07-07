import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import type { PriceTemplateItem } from './types';

export const getPriceTemplateColumns = (): ProColumns<PriceTemplateItem>[] => [
  { title: '模板ID', dataIndex: 'id', width: 170, fixed: 'left', search: false },
  { title: '模板名称', dataIndex: 'name', width: 220, fieldProps: { placeholder: '请输入模板名称' } },
  {
    title: '内容类型',
    dataIndex: 'contentType',
    width: 110,
    search: false,
    render: (_, record) => (record.contentType === 2 ? '小说' : '短剧'),
  },
  { title: '计费模式', dataIndex: 'billingMode', width: 110, search: false },
  { title: '字数单位', dataIndex: 'wordCountUnit', width: 110, search: false },
  { title: '描述', dataIndex: 'description', width: 220, search: false },
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
    width: 180,
    fixed: 'right',
    render: () => (
      <Space size={8}>
        <a>国家配置</a>
        <a>编辑</a>
        <a>详情</a>
      </Space>
    ),
  },
];
