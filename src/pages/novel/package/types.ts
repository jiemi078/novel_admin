export type NovelPackageItem = {
  id: string;
  appId: string;
  appName: string;
  contentType: number;
  name: string;
  productType: 1 | 2;
  coins: number;
  bonusCoins: number;
  sortOrder: number;
  status: 0 | 1;
  channelConfigs: NovelPackageChannelConfig[];
  createdAt: string;
  updatedAt: string;
};

export type NovelPackageChannelConfig = {
  id: string;
  channel: string;
  skuId: string;
  price: number;
  bonusPercent: number;
  sortOrder: number;
  status: 0 | 1;
};

export type NovelPackagePageParams = {
  current?: number;
  pageSize?: number;
  productType?: number;
  keyword?: string;
  status?: number;
};

export type NovelPackageCreateValues = {
  name: string;
  productType: 1 | 2;
  coins: number;
  bonusCoins: number;
  sortOrder?: number;
  status?: 0 | 1;
};
