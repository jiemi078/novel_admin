import type {
  NovelSubscriptionCreateValues,
  NovelSubscriptionItem,
  NovelSubscriptionPageParams,
} from '@/pages/novel/subscription/types';

const rows: NovelSubscriptionItem[] = [
  {
    id: '323709084542967808',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: 'Weekly VIP',
    periodType: 'weekly',
    periodDays: 7,
    benefits: [],
    sortOrder: 0,
    status: 1,
    channelConfigs: [{ id: '323709173013417984', channel: 'stripe', planIdentifier: '', price: 37.99, trialDays: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-06-12 14:24:20',
    updatedAt: '2026-07-02 11:28:39',
  },
  {
    id: '319111128070234112',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: 'tets sub',
    periodType: 'weekly',
    periodDays: 1,
    benefits: [],
    sortOrder: 0,
    status: 0,
    channelConfigs: [{ id: '319155338483863552', channel: 'stripe', planIdentifier: '', price: 0.1, trialDays: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-30 21:53:42',
    updatedAt: '2026-06-09 13:12:08',
  },
  {
    id: '316501747822497792',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: 'Weekly subscription $9.90',
    periodType: 'weekly',
    periodDays: 7,
    benefits: [],
    sortOrder: 0,
    status: 1,
    channelConfigs: [{ id: '319090899801874432', channel: 'stripe', planIdentifier: '', price: 9.9, trialDays: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-23 17:04:57',
    updatedAt: '2026-06-11 14:20:17',
  },
  {
    id: '330879448146518016',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: 'Daily VIP',
    periodType: 'daily',
    periodDays: 1,
    benefits: [],
    sortOrder: 1,
    status: 1,
    channelConfigs: [{ id: '330880869394817024', channel: 'stripe', planIdentifier: '', price: 5.99, trialDays: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-07-02 09:16:48',
    updatedAt: '2026-07-02 11:42:20',
  },
  {
    id: '317487939074412544',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: 'Monthly membership $39.99',
    periodType: 'monthly',
    periodDays: 30,
    benefits: [],
    sortOrder: 1,
    status: 1,
    channelConfigs: [{ id: '319088657308864512', channel: 'stripe', planIdentifier: '', price: 39.99, trialDays: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-26 10:23:43',
    updatedAt: '2026-06-11 14:28:11',
  },
  {
    id: '323304258948571136',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: 'Weekly VIP',
    periodType: 'weekly',
    periodDays: 7,
    benefits: [],
    sortOrder: 2,
    status: 1,
    channelConfigs: [{ id: '323304376837873664', channel: 'stripe', planIdentifier: '', price: 19.9, trialDays: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-06-11 11:35:42',
    updatedAt: '2026-07-02 11:42:28',
  },
  {
    id: '317488028710883328',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: 'Annual membership $199.99',
    periodType: 'yearly',
    periodDays: 365,
    benefits: [],
    sortOrder: 2,
    status: 1,
    channelConfigs: [{ id: '319104970932637696', channel: 'stripe', planIdentifier: '', price: 199.99, trialDays: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-26 10:24:05',
    updatedAt: '2026-06-11 14:20:46',
  },
];

export async function queryNovelSubscriptionManagePage(params: NovelSubscriptionPageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const keyword = String(params.keyword || '').trim().toLowerCase();
  const filtered = rows.filter((item) => {
    if (params.periodType && item.periodType !== params.periodType) return false;
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

export async function createNovelSubscription(values: NovelSubscriptionCreateValues) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  rows.unshift({
    id: `mock_subscription_${Date.now()}`,
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: values.name,
    periodType: values.periodType,
    periodDays: Number(values.periodDays || 1),
    benefits: [],
    sortOrder: Number(values.sortOrder || 0),
    status: values.status ?? 1,
    channelConfigs: [],
    createdAt: now,
    updatedAt: now,
  });
  return { success: true };
}
