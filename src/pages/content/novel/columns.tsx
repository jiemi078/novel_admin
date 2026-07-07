import type { ProColumns } from '@ant-design/pro-components';
import { Image, Space, Tag } from 'antd';
import type { NovelItem } from './types';

const statusMap = {
  1: { text: '启用', color: 'success' },
  0: { text: '停用', color: 'default' },
} as const;

export const getNovelColumns = (): ProColumns<NovelItem>[] => [
  { title: '项目ID', dataIndex: 'id', width: 180, fixed: 'left', fieldProps: { placeholder: '请输入项目ID' } },
  {
    title: '封面',
    dataIndex: 'coverAccessUrl',
    width: 90,
    search: false,
    render: (_, record) => <Image width={42} height={56} src={record.coverAccessUrl} style={{ objectFit: 'cover' }} />,
  },
  { title: '标题', dataIndex: 'title', width: 260, fieldProps: { placeholder: '请输入标题' } },
  { title: '作者', dataIndex: 'authorName', width: 140, search: false },
  { title: '推广标题', dataIndex: 'promoTitle', width: 220, search: false },
  { title: '评分', dataIndex: 'rating', width: 90, search: false },
  {
    title: '语言',
    dataIndex: 'sourceLanguage',
    width: 100,
    valueType: 'select',
    valueEnum: {
      en: { text: '英语' },
      es: { text: '西语' },
      pt: { text: '葡语' },
    },
  },
  {
    title: '题材',
    dataIndex: 'genreName',
    width: 170,
  },
  {
    title: '标签',
    dataIndex: 'tagNames',
    width: 180,
    search: false,
    render: (_, record) => (
      <Space size={4} wrap>
        {record.tagNames.map((tag) => (
          <Tag key={tag} color="blue">
            {tag}
          </Tag>
        ))}
      </Space>
    ),
  },
  { title: '计划章节', dataIndex: 'plannedTotalItems', width: 110, search: false },
  { title: '总章节', dataIndex: 'totalItems', width: 100, search: false },
  { title: '已发布章节', dataIndex: 'publishedItems', width: 120, search: false },
  { title: '总字数', dataIndex: 'totalWordCount', width: 110, search: false },
  { title: '阅读数', dataIndex: 'readCount', width: 110, search: false },
  { title: 'App价格模板ID', dataIndex: 'appPriceTemplateId', width: 180, search: false },
  {
    title: '项目状态',
    dataIndex: 'status',
    width: 110,
    valueType: 'select',
    valueEnum: {
      1: { text: '启用', status: 'Success' },
      0: { text: '停用', status: 'Default' },
    },
    render: (_, record) => {
      const status = statusMap[record.status];
      return <Tag color={status.color}>{status.text}</Tag>;
    },
  },
  {
    title: 'H5状态',
    dataIndex: 'h5Status',
    width: 100,
    search: false,
    render: (_, record) => {
      const status = statusMap[record.h5Status];
      return <Tag color={status.color}>{status.text}</Tag>;
    },
  },
  {
    title: 'App状态',
    dataIndex: 'appStatus',
    width: 100,
    search: false,
    render: (_, record) => {
      const status = statusMap[record.appStatus];
      return <Tag color={status.color}>{status.text}</Tag>;
    },
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
        <a>章节</a>
        <a>编辑</a>
        <a>详情</a>
      </Space>
    ),
  },
];
