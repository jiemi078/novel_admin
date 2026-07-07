export type ContentPartnerItem = {
  id: string;
  name: string;
  company: string;
  contactName: string;
  contactPhone: string;
  settlementCycle: 'monthly' | 'quarterly' | 'yearly';
  status: 0 | 1;
  remark?: string;
};

export type ContentPartnerPageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
};

export type ContentPartnerCreateValues = Omit<ContentPartnerItem, 'id'>;
