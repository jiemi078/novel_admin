export type TagStatus = 0 | 1;

export type TagName = {
  id: string;
  language: string;
  name: string;
};

export type TagItem = {
  id: string;
  contentType: number;
  status: TagStatus;
  sortOrder: number;
  names: TagName[];
  createdAt: string;
  updatedAt: string;
};

export type TagPageParams = {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: TagStatus;
};
