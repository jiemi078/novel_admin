export type AccountStatus = 'normal' | 'frozen';

export type UserAccountItem = {
  userId: string;
  nickname: string;
  coinBalance: number;
  totalRechargeCoins: number;
  totalConsumedCoins: number;
  status: AccountStatus;
  registeredAt: string;
  updatedAt: string;
};

export type UserAccountPageParams = {
  current?: number;
  pageSize?: number;
  userId?: string;
  nickname?: string;
  status?: AccountStatus;
};
