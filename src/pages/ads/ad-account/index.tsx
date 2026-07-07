import AdsMockTable, { type AdsFieldConfig } from '../components/AdsMockTable';
import { createAdAccount, queryAdAccountPage } from '@/services/ads/ad-account';

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
  { title: '广告账户ID', dataIndex: 'accountId', width: 180, required: true, search: true },
  { title: '账户名称', dataIndex: 'accountName', width: 220, required: true, search: true },
  {
    title: '币种',
    dataIndex: 'currency',
    width: 100,
    valueType: 'select',
    initialValue: 'USD',
    options: [
      { label: 'USD', value: 'USD' },
      { label: 'BRL', value: 'BRL' },
      { label: 'MXN', value: 'MXN' },
    ],
  },
  { title: '时区', dataIndex: 'timezone', width: 150, initialValue: 'UTC', search: false },
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
    title="广告账户"
    createText="新增账户"
    rowKey="id"
    fields={fields}
    request={queryAdAccountPage}
    create={createAdAccount}
    scrollX={1530}
  />
);
