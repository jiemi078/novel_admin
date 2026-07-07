export type UnlockType = 'coins' | 'subscription' | 'free';

export type UnlockRecordItem = {
  id: string;
  userId: string;
  novelId: string;
  novelName: string;
  chapterId: string;
  chapterName: string;
  unlockType: UnlockType;
  consumedCoins: number;
  unlockedAt: string;
};

export type UnlockRecordPageParams = {
  current?: number;
  pageSize?: number;
  userId?: string;
  novelName?: string;
  unlockType?: UnlockType;
};
