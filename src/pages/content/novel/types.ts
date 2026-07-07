export type NovelStatus = 0 | 1;

export type NovelItem = {
  id: string;
  title: string;
  authorName: string;
  promoTitle: string;
  rating: number;
  genreName: string;
  sourceLanguage: string;
  coverAccessUrl: string;
  plannedTotalItems: number;
  totalWordCount: number;
  readCount: number;
  totalItems: number;
  publishedItems: number;
  status: NovelStatus;
  appStatus: NovelStatus;
  h5Status: NovelStatus;
  appPriceTemplateId: string;
  tagNames: string[];
  createdAt: string;
  updatedAt: string;
};

export type NovelPageParams = {
  current?: number;
  pageSize?: number;
  id?: string;
  title?: string;
  sourceLanguage?: string;
  status?: NovelStatus;
  genreName?: string;
};
