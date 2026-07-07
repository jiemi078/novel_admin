import type {
  UserAccountItem,
  UserAccountPageParams,
} from '@/pages/novel-transaction/accounts/types';

const mockAccounts: UserAccountItem[] = [
  {
    userId: '311520572125220864',
    nickname: 'reader_001',
    coinBalance: 6200,
    totalRechargeCoins: 14998,
    totalConsumedCoins: 8798,
    status: 'normal',
    registeredAt: '2026-07-01 10:12:31',
    updatedAt: '2026-07-07 09:35:28',
  },
  {
    userId: '311520572125220865',
    nickname: 'sub_user',
    coinBalance: 1200,
    totalRechargeCoins: 7998,
    totalConsumedCoins: 6798,
    status: 'normal',
    registeredAt: '2026-06-28 18:22:09',
    updatedAt: '2026-07-07 10:02:03',
  },
  {
    userId: '311520572125220866',
    nickname: 'trial_reader',
    coinBalance: 0,
    totalRechargeCoins: 3999,
    totalConsumedCoins: 3999,
    status: 'frozen',
    registeredAt: '2026-07-03 08:04:52',
    updatedAt: '2026-07-07 10:18:11',
  },
];

const includes = (source: string | undefined, keyword: string | undefined) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

export async function queryUserAccountPage(params: UserAccountPageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const filtered = mockAccounts.filter((item) => {
    if (!includes(item.userId, params.userId)) return false;
    if (!includes(item.nickname, params.nickname)) return false;
    if (params.status && item.status !== params.status) return false;
    return true;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}
