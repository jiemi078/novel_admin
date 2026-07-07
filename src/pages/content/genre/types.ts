export type GenreStatus = 0 | 1;

export type GenreName = {
  id: string;
  language: string;
  name: string;
};

export type GenreItem = {
  id: string;
  contentType: number;
  status: GenreStatus;
  sortOrder: number;
  names: GenreName[];
  createdAt: string;
  updatedAt: string;
};

export type GenrePageParams = {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: GenreStatus;
};
