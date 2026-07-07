import AdsMockTable, { type AdsFieldConfig } from '../components/AdsMockTable';
import { createPlatformConfig, queryPlatformConfigPage } from '@/services/ads/platform-config';

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
  { title: '平台 App ID', dataIndex: 'platformAppId', width: 180, required: true, search: true },
  { title: 'App Secret', dataIndex: 'platformAppSecret', width: 140, search: false },
  { title: 'Business ID', dataIndex: 'businessId', width: 140, search: false },
  { title: 'Access Token', dataIndex: 'accessToken', width: 130, search: false },
  { title: 'API版本', dataIndex: 'apiVersion', width: 110, initialValue: 'v24.0', search: false },
  {
    title: '启用状态',
    dataIndex: 'status',
    width: 120,
    valueType: 'select',
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
    title="平台配置"
    createText="新增平台配置"
    rowKey="id"
    fields={fields}
    request={queryPlatformConfigPage}
    create={createPlatformConfig}
    scrollX={1600}
  />
);
