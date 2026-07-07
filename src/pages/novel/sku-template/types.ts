export type NovelSkuTemplateItem = {
  id: string;
  appId: string;
  appName: string;
  contentType: number;
  name: string;
  position: 'store' | 'unlock' | 'popup';
  status: 0 | 1;
  isDefault: 0 | 1;
  createdAt: string;
  updatedAt: string;
};

export type NovelSkuTemplatePageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  position?: string;
  status?: number;
};

export type NovelSkuTemplateCreateValues = {
  name: string;
  position: 'store' | 'unlock' | 'popup';
  isDefault?: 0 | 1;
  status?: 0 | 1;
};
