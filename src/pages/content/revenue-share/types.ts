export type RevenueShareItem = {
  id: string;
  partnerId: string;
  partnerName: string;
  revenueType: 'subscription' | 'coin_recharge' | 'ad_income';
  platformShareRate: number;
  partnerShareRate: number;
  minGuaranteeAmount: number;
  effectiveStartDate: string;
  effectiveEndDate?: string;
  status: 0 | 1;
  remark?: string;
};

export type RevenueSharePageParams = {
  current?: number;
  pageSize?: number;
  partnerName?: string;
  revenueType?: RevenueShareItem['revenueType'];
  status?: number;
};

export type RevenueShareCreateValues = Omit<RevenueShareItem, 'id'>;
