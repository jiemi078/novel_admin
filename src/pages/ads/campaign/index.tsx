import AdsMockTable, { type AdsFieldConfig } from '../components/AdsMockTable';
import { createCampaign, queryCampaignPage } from '@/services/ads/campaign';

const fields: AdsFieldConfig[] = [
  { title: 'Campaign ID', dataIndex: 'id', width: 170, search: true },
  { title: '投放名称', dataIndex: 'name', width: 240, required: true, search: true },
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
  { title: '预算', dataIndex: 'budget', width: 120, valueType: 'digit', initialValue: 1000, suffix: ' USD', search: false },
  { title: '消耗', dataIndex: 'spend', width: 120, valueType: 'digit', initialValue: 0, suffix: ' USD', search: false },
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
  { title: '更新时间', dataIndex: 'updatedAt', width: 170, valueType: 'dateTime', search: false },
];

export default () => (
  <AdsMockTable
    title="广告投放"
    createText="新增投放"
    rowKey="id"
    fields={fields}
    request={queryCampaignPage}
    create={createCampaign}
    scrollX={1200}
  />
);
