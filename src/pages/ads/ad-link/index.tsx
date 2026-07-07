import AdsMockTable, { type AdsFieldConfig } from '../components/AdsMockTable';
import { createAdLink, queryAdLinkPage } from '@/services/ads/ad-link';

const fields: AdsFieldConfig[] = [
  {
    title: 'CampName',
    dataIndex: 'campName',
    width: 260,
    required: true,
    search: true,
    searchOrder: 4,
    placeholder: '按 CampName 搜索',
  },
  { title: '编号', dataIndex: 'campaignNo', width: 90, required: true, search: false },
  { title: '投放链接', dataIndex: 'generatedLink', width: 460, required: true, search: false },
  { title: 'App名称', dataIndex: 'appName', width: 160, search: false },
  {
    title: '渠道',
    dataIndex: 'channel',
    width: 100,
    valueType: 'select',
    required: true,
    initialValue: 'fb',
    searchOrder: 2,
    options: [
      { label: 'Facebook', value: 'fb' },
      { label: 'TikTok', value: 'tt' },
      { label: 'Google', value: 'gg' },
    ],
  },
  {
    title: '投放类型',
    dataIndex: 'invest',
    width: 110,
    valueType: 'select',
    initialValue: 'w2a',
    searchOrder: 3,
    options: [
      { label: 'W2A', value: 'w2a' },
      { label: 'A2A', value: 'a2a' },
    ],
  },
  { title: '优化师', dataIndex: 'optimist', width: 100, search: true, searchOrder: 1 },
  { title: '创建时间', dataIndex: 'createdAt', width: 170, valueType: 'dateTime', search: false },
];

export default () => (
  <AdsMockTable
    title="投放配置"
    createText="新增配置"
    rowKey="id"
    fields={fields}
    request={queryAdLinkPage}
    create={createAdLink}
    scrollX={1590}
  />
);
