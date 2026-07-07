export type ReadHistoryItem = {
  id: string;
  userId: string;
  novelId: string;
  novelName: string;
  chapterId: string;
  chapterName: string;
  progress: string;
  consumedCoins: number;
  readAt: string;
};

export type ReadHistoryPageParams = {
  current?: number;
  pageSize?: number;
  userId?: string;
  novelId?: string;
  novelName?: string;
};
