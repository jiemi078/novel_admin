import AdsMockTable, { type AdsFieldConfig } from '../components/AdsMockTable';
import {
  createAttributionConfig,
  queryAttributionConfigPage,
} from '@/services/ads/attribution-config';

const fields: AdsFieldConfig[] = [
  { title: 'ID', dataIndex: 'id', width: 170, search: true },
  { title: 'App', dataIndex: 'appName', width: 220, search: false },
  {
    title: '平台',
    dataIndex: 'platform',
    width: 120,
    valueType: 'select',
    required: true,
    initialValue: 'h5',
    options: [
      { label: 'H5', value: 'h5' },
      { label: 'App', value: 'app' },
    ],
  },
  {
    title: '渠道',
    dataIndex: 'channel',
    width: 110,
    valueType: 'select',
    initialValue: 'fb',
    options: [
      { label: 'Facebook', value: 'fb' },
      { label: 'TikTok', value: 'tt' },
      { label: 'Google', value: 'gg' },
    ],
  },
  { title: '窗口期', dataIndex: 'attributionWindow', width: 120, valueType: 'digit', initialValue: 604800, suffix: ' 秒', search: false },
  {
    title: '匹配规则',
    dataIndex: 'matchTypes',
    width: 420,
    valueType: 'tagList',
    multiple: true,
    initialValue: ['pass_through'],
    options: [
      { label: 'pass_through', value: 'pass_through' },
      { label: 'clipboard', value: 'clipboard' },
      { label: 'google_referrer', value: 'google_referrer' },
      { label: 'ip_ua', value: 'ip_ua' },
      { label: 'h5_self_attributed', value: 'h5_self_attributed' },
    ],
    search: false,
  },
  { title: '优先级', dataIndex: 'priority', width: 100, valueType: 'digit', initialValue: 0, search: false },
  {
    title: '状态',
    dataIndex: 'isEnabled',
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
    title="归因配置列表"
    createText="新增归因配置"
    rowKey="id"
    fields={fields}
    request={queryAttributionConfigPage}
    create={createAttributionConfig}
    scrollX={1510}
  />
);
