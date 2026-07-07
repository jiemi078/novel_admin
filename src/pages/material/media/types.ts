export type MaterialMediaItem = {
  id: string;
  folderId: string;
  name: string;
  originalName: string;
  type: 1 | 2;
  url: string;
  size: number;
  mimeType: string;
  autoSync: 0 | 1;
  status: 0 | 1;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tagIds?: string[];
};

export type MaterialFolderItem = {
  id: string;
  parentId: string;
  name: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
};

export type MaterialTagItem = {
  id: string;
  name: string;
  color: string;
};

export type MaterialMediaPageParams = {
  current?: number;
  page?: number;
  pageSize?: number;
  type?: number;
  keyword?: string;
  folderId?: string;
  tagIds?: string[];
};
