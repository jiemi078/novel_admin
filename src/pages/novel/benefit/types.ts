export type NovelBenefitItem = {
  id: string;
  appId: string;
  contentType: number;
  appName: string;
  type: 1 | 2;
  name: string;
  description: string;
  iconUrl: string;
  iconKey: string;
  status: 0 | 1;
};

export type NovelBenefitPageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  type?: number;
  status?: number;
};

export type NovelBenefitCreateValues = {
  type: 1 | 2;
  name: string;
  description?: string;
  iconUrl?: string;
  status?: 0 | 1;
};
