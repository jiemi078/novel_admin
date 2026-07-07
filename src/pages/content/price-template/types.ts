export type PriceTemplateStatus = 0 | 1;

export type PriceTemplateItem = {
  id: string;
  name: string;
  contentType: number;
  billingMode: number;
  wordCountUnit: number;
  description: string;
  status: PriceTemplateStatus;
  createdAt: string;
  updatedAt: string;
};

export type PriceTemplatePageParams = {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: PriceTemplateStatus;
};
