import type {
  NovelSkuTemplateCreateValues,
  NovelSkuTemplateItem,
  NovelSkuTemplatePageParams,
} from '@/pages/novel/sku-template/types';

const rows: NovelSkuTemplateItem[] = [
  {
    id: '330893575011180544',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '小额',
    position: 'store',
    status: 1,
    isDefault: 1,
    createdAt: '2026-07-02 10:12:56',
    updatedAt: '2026-07-02 12:04:39',
  },
  {
    id: '324807812746067968',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '纯订阅',
    position: 'store',
    status: 1,
    isDefault: 0,
    createdAt: '2026-06-15 15:10:17',
    updatedAt: '2026-06-15 15:11:06',
  },
  {
    id: '319090391284469760',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '书币模板',
    position: 'store',
    status: 1,
    isDefault: 0,
    createdAt: '2026-05-30 20:31:18',
    updatedAt: '2026-07-02 10:14:13',
  },
];

export async function queryNovelSkuTemplatePage(params: NovelSkuTemplatePageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const keyword = String(params.keyword || '').trim().toLowerCase();
  const filtered = rows.filter((item) => {
    if (params.position && item.position !== params.position) return false;
    if (params.status !== undefined && item.status !== Number(params.status)) return false;
    if (!keyword) return true;
    return item.id.toLowerCase().includes(keyword) || item.name.toLowerCase().includes(keyword);
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}

export async function createNovelSkuTemplate(values: NovelSkuTemplateCreateValues) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  rows.unshift({
    id: `mock_sku_template_${Date.now()}`,
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: values.name,
    position: values.position,
    status: values.status ?? 1,
    isDefault: values.isDefault ?? 0,
    createdAt: now,
    updatedAt: now,
  });
  return { success: true };
}
