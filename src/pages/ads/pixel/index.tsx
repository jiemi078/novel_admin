import AdsMockTable, { type AdsFieldConfig } from '../components/AdsMockTable';
import { createPixel, queryPixelPage } from '@/services/ads/pixel';

const fields: AdsFieldConfig[] = [
  { title: 'ID', dataIndex: 'id', width: 170, search: true },
  { title: 'App', dataIndex: 'appName', width: 220, search: false },
  {
    title: '平台',
    dataIndex: 'platformCode',
    width: 120,
    valueType: 'select',
    required: true,
    initialValue: 'facebook',
    options: [
      { label: 'Facebook', value: 'facebook' },
      { label: 'TikTok', value: 'tiktok' },
      { label: 'Google', value: 'google' },
    ],
  },
  { title: 'Pixel ID', dataIndex: 'pixelId', width: 180, required: true, search: true },
  { title: 'Pixel名称', dataIndex: 'pixelName', width: 220, required: true, search: true },
  { title: 'Access Token', dataIndex: 'accessToken', width: 130, search: false },
  {
    title: '投放类型',
    dataIndex: 'investType',
    width: 120,
    valueType: 'select',
    initialValue: 'w2a',
    options: [
      { label: 'Web2App', value: 'w2a' },
      { label: 'App2App', value: 'a2a' },
    ],
  },
  { title: '排除事件', dataIndex: 'excludedEvents', width: 160, search: false },
  {
    title: '状态',
    dataIndex: 'status',
    width: 110,
    valueType: 'select',
    required: true,
    initialValue: '1',
    options: [
      { label: '启用', value: '1' },
      { label: '停用', value: '0' },
    ],
  },
  { title: '创建时间', dataIndex: 'createdAt', width: 170, valueType: 'dateTime', search: false },
  { title: '更新时间', dataIndex: 'updatedAt', width: 170, valueType: 'dateTime', search: false },
];

export default () => (
  <AdsMockTable
    title="Pixel管理"
    createText="新增 Pixel"
    rowKey="id"
    fields={fields}
    request={queryPixelPage}
    create={createPixel}
    scrollX={1570}
  />
);
