import type {
  UnlockRecordItem,
  UnlockRecordPageParams,
} from '@/pages/novel-transaction/unlock-records/types';

const mockUnlockRecords: UnlockRecordItem[] = [
  {
    id: 'unlock_3409100001',
    userId: '311520572125220864',
    novelId: 'novel_10001',
    novelName: 'The Alpha Contract',
    chapterId: 'chapter_0012',
    chapterName: 'Chapter 12: The Hidden Deal',
    unlockType: 'coins',
    consumedCoins: 30,
    unlockedAt: '2026-07-07 09:40:10',
  },
  {
    id: 'unlock_3409100002',
    userId: '311520572125220865',
    novelId: 'novel_10002',
    novelName: 'Billionaire Secret Bride',
    chapterId: 'chapter_0035',
    chapterName: 'Chapter 35: Midnight Call',
    unlockType: 'subscription',
    consumedCoins: 0,
    unlockedAt: '2026-07-07 10:04:55',
  },
  {
    id: 'unlock_3409100003',
    userId: '311520572125220866',
    novelId: 'novel_10003',
    novelName: 'Runaway Luna',
    chapterId: 'chapter_0001',
    chapterName: 'Chapter 1: Moonlight',
    unlockType: 'free',
    consumedCoins: 0,
    unlockedAt: '2026-07-07 10:20:33',
  },
];

const includes = (source: string | undefined, keyword: string | undefined) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

export async function queryUnlockRecordPage(params: UnlockRecordPageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const filtered = mockUnlockRecords.filter((item) => {
    if (!includes(item.userId, params.userId)) return false;
    if (!includes(item.novelName, params.novelName)) return false;
    if (params.unlockType && item.unlockType !== params.unlockType) return false;
    return true;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}
