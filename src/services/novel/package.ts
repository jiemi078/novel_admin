import type {
  NovelPackageCreateValues,
  NovelPackageItem,
  NovelPackagePageParams,
} from '@/pages/novel/package/types';

const mockPackages: NovelPackageItem[] = [
  {
    id: '319110687940943872',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '线上支付测试金币',
    productType: 1,
    coins: 1,
    bonusCoins: 1,
    sortOrder: 0,
    status: 0,
    channelConfigs: [{ id: '319155301943099392', channel: 'stripe', skuId: '', price: 4, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-30 21:51:57',
    updatedAt: '2026-06-12 13:59:38',
  },
  {
    id: '319090073008099328',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '7998Coins',
    productType: 1,
    coins: 7998,
    bonusCoins: 6000,
    sortOrder: 2,
    status: 0,
    channelConfigs: [{ id: '319096020837351424', channel: 'stripe', skuId: '', price: 79.99, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-30 20:30:02',
    updatedAt: '2026-06-12 13:59:33',
  },
  {
    id: '319090000878641152',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '5500 Coins',
    productType: 1,
    coins: 3999,
    bonusCoins: 1500,
    sortOrder: 2,
    status: 1,
    channelConfigs: [{ id: '319096119407677440', channel: 'stripe', skuId: '', price: 39.99, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-30 20:29:45',
    updatedAt: '2026-06-12 14:21:18',
  },
  {
    id: '330889726045196288',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '990Coins',
    productType: 1,
    coins: 990,
    bonusCoins: 450,
    sortOrder: 3,
    status: 1,
    channelConfigs: [{ id: '330897532865482752', channel: 'stripe', skuId: '', price: 9.9, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-07-02 09:57:38',
    updatedAt: '2026-07-02 11:27:54',
  },
  {
    id: '319090310049177600',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '8999 Coins',
    productType: 1,
    coins: 5999,
    bonusCoins: 3000,
    sortOrder: 3,
    status: 1,
    channelConfigs: [{ id: '323706523744210944', channel: 'stripe', skuId: '', price: 59.99, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-30 20:30:58',
    updatedAt: '2026-06-12 14:21:36',
  },
  {
    id: '319090139672354816',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '1599Coins',
    productType: 1,
    coins: 1599,
    bonusCoins: 1,
    sortOrder: 3,
    status: 0,
    channelConfigs: [{ id: '319095924871663616', channel: 'stripe', skuId: '', price: 15.99, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-30 20:30:18',
    updatedAt: '2026-06-12 13:59:27',
  },
  {
    id: '323708280385835008',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '16999 Coins',
    productType: 1,
    coins: 9999,
    bonusCoins: 7000,
    sortOrder: 4,
    status: 1,
    channelConfigs: [{ id: '323710598493769728', channel: 'stripe', skuId: '', price: 99.99, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-06-12 14:21:08',
    updatedAt: '2026-06-12 14:21:08',
  },
  {
    id: '319090248137068544',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '2599Coins',
    productType: 1,
    coins: 2599,
    bonusCoins: 500,
    sortOrder: 4,
    status: 0,
    channelConfigs: [{ id: '319095835461697536', channel: 'stripe', skuId: '', price: 25.99, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-05-30 20:30:44',
    updatedAt: '2026-06-12 13:59:19',
  },
  {
    id: '323702967775535104',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '1999 Coins',
    productType: 1,
    coins: 1999,
    bonusCoins: 0,
    sortOrder: 5,
    status: 1,
    channelConfigs: [{ id: '323708098067828736', channel: 'stripe', skuId: '', price: 19.99, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-06-12 14:00:02',
    updatedAt: '2026-06-12 14:16:43',
  },
  {
    id: '323707122036510720',
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: '2999 Coins',
    productType: 1,
    coins: 2999,
    bonusCoins: 2999,
    sortOrder: 6,
    status: 1,
    channelConfigs: [{ id: '323707362974113792', channel: 'stripe', skuId: '', price: 29.99, bonusPercent: 0, sortOrder: 0, status: 1 }],
    createdAt: '2026-06-12 14:16:32',
    updatedAt: '2026-07-02 11:27:45',
  },
];

export async function queryNovelPackagePage(params: NovelPackagePageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const keyword = String(params.keyword || '').trim().toLowerCase();
  const filtered = mockPackages.filter((item) => {
    if (params.productType && item.productType !== Number(params.productType)) return false;
    if (params.status !== undefined && item.status !== Number(params.status)) return false;
    if (!keyword) return true;
    return (
      item.id.toLowerCase().includes(keyword) ||
      item.name.toLowerCase().includes(keyword) ||
      item.appName.toLowerCase().includes(keyword)
    );
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}

export async function createNovelPackage(values: NovelPackageCreateValues) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  mockPackages.unshift({
    id: `mock_product_${Date.now()}`,
    appId: '311520262971461633',
    appName: '香港好消息科技有限公司默认App',
    contentType: 2,
    name: values.name,
    productType: values.productType,
    coins: Number(values.coins || 0),
    bonusCoins: Number(values.bonusCoins || 0),
    sortOrder: Number(values.sortOrder || 0),
    status: values.status ?? 1,
    channelConfigs: [],
    createdAt: now,
    updatedAt: now,
  });
  return { success: true };
}
