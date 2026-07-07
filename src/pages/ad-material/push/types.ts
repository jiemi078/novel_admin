export type AdMaterialPushBatchItem = {
  id: string;
  appId: string;
  appName: string;
  contentType: number;
  contentTypeName: string;
  contentProjectId: string;
  contentProjectName: string;
  languageCode: string;
  languageName: string;
  platformCode: 'facebook' | 'tiktok' | string;
  adAccountIds: string[];
  accountCount: number;
  materialCreatorId: string;
  materialCreatorName: string;
  totalCount: number;
  successCount: number;
  failCount: number;
  processingCount: number;
  status: 0 | 1 | 2 | 3;
  statusName: string;
  createdBy: string;
  createdByName: string;
  createdAt: number;
};

export type AdMaterialPushPageParams = {
  current?: number;
  page?: number;
  pageSize?: number;
  contentType?: number;
  platformCode?: string;
  status?: number;
  keyword?: string;
};

export type AdMaterialPushCreateValues = {
  contentProjectName: string;
  languageCode: 'en' | 'zh';
  platformCode: 'facebook' | 'tiktok';
  materialCreatorName: string;
  adAccountIds: string[];
  totalCount: number;
};
