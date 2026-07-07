import type {
  ReadHistoryItem,
  ReadHistoryPageParams,
} from '@/pages/novel-transaction/read-history/types';

const mockReadHistory: ReadHistoryItem[] = [
  {
    id: 'read_3409100001',
    userId: '311520572125220864',
    novelId: 'novel_10001',
    novelName: 'The Alpha Contract',
    chapterId: 'chapter_0012',
    chapterName: 'Chapter 12: The Hidden Deal',
    progress: '78%',
    consumedCoins: 30,
    readAt: '2026-07-07 09:41:22',
  },
  {
    id: 'read_3409100002',
    userId: '311520572125220865',
    novelId: 'novel_10002',
    novelName: 'Billionaire Secret Bride',
    chapterId: 'chapter_0035',
    chapterName: 'Chapter 35: Midnight Call',
    progress: '100%',
    consumedCoins: 45,
    readAt: '2026-07-07 10:05:17',
  },
  {
    id: 'read_3409100003',
    userId: '311520572125220866',
    novelId: 'novel_10003',
    novelName: 'Runaway Luna',
    chapterId: 'chapter_0008',
    chapterName: 'Chapter 8: Escape',
    progress: '34%',
    consumedCoins: 0,
    readAt: '2026-07-07 10:22:51',
  },
];

const includes = (source: string | undefined, keyword: string | undefined) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

export async function queryReadHistoryPage(params: ReadHistoryPageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const filtered = mockReadHistory.filter((item) => {
    if (!includes(item.userId, params.userId)) return false;
    if (!includes(item.novelId, params.novelId)) return false;
    if (!includes(item.novelName, params.novelName)) return false;
    return true;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}
