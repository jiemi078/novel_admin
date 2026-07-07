import type {
  RevenueShareCreateValues,
  RevenueShareItem,
  RevenueSharePageParams,
} from '@/pages/content/revenue-share/types';

let revenueShareRows: RevenueShareItem[] = [];

export async function queryRevenueSharePage(params: RevenueSharePageParams) {
  const { current = 1, pageSize = 10, partnerName, revenueType, status } = params;
  const filtered = revenueShareRows.filter((row) => {
    const partnerMatched = !partnerName || row.partnerName.toLowerCase().includes(partnerName.toLowerCase());
    const typeMatched = !revenueType || row.revenueType === revenueType;
    const statusMatched = status === undefined || Number(row.status) === Number(status);
    return partnerMatched && typeMatched && statusMatched;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    success: true,
    total: filtered.length,
  };
}

export async function createRevenueShare(values: RevenueShareCreateValues) {
  revenueShareRows = [
    {
      ...values,
      id: `mock_revenue_share_${Date.now()}`,
      platformShareRate: Number(values.platformShareRate),
      partnerShareRate: Number(values.partnerShareRate),
      minGuaranteeAmount: Number(values.minGuaranteeAmount || 0),
      status: Number(values.status) as 0 | 1,
    },
    ...revenueShareRows,
  ];

  return { success: true };
}
