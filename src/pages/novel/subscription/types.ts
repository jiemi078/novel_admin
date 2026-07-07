export type NovelSubscriptionChannelConfig = {
  id: string;
  channel: string;
  planIdentifier: string;
  price: number;
  trialDays: number;
  sortOrder: number;
  status: 0 | 1;
};

export type NovelSubscriptionItem = {
  id: string;
  appId: string;
  appName: string;
  contentType: number;
  name: string;
  periodType: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  periodDays: number;
  benefits: string[];
  sortOrder: number;
  status: 0 | 1;
  channelConfigs: NovelSubscriptionChannelConfig[];
  createdAt: string;
  updatedAt: string;
};

export type NovelSubscriptionPageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  periodType?: string;
  status?: number;
};

export type NovelSubscriptionCreateValues = {
  name: string;
  periodType: NovelSubscriptionItem['periodType'];
  periodDays: number;
  sortOrder?: number;
  status?: 0 | 1;
};
