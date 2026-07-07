import AdsMockTable, { type AdsFieldConfig } from '../components/AdsMockTable';
import { createAdDomain, queryAdDomainPage } from '@/services/ads/ad-domain';

const fields: AdsFieldConfig[] = [
  { title: 'ID', dataIndex: 'id', width: 170, search: true },
  { title: 'App', dataIndex: 'appName', width: 220, search: false },
  { title: '名称', dataIndex: 'name', width: 180, required: true, search: true },
  { title: 'URL', dataIndex: 'url', width: 260, required: true, search: true },
  {
    title: '状态',
    dataIndex: 'status',
    width: 110,
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
    title="域名管理"
    createText="新增域名"
    rowKey="id"
    fields={fields}
    request={queryAdDomainPage}
    create={createAdDomain}
    scrollX={1280}
  />
);
