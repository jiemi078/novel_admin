import type {
  ContentPartnerCreateValues,
  ContentPartnerItem,
  ContentPartnerPageParams,
} from '@/pages/content/partner/types';

let partnerRows: ContentPartnerItem[] = [];

export async function queryContentPartnerPage(params: ContentPartnerPageParams) {
  const { current = 1, pageSize = 10, keyword, status } = params;
  const filtered = partnerRows.filter((row) => {
    const keywordMatched =
      !keyword ||
      [row.name, row.company, row.contactName, row.contactPhone].some((value) =>
        value.toLowerCase().includes(keyword.toLowerCase()),
      );
    const statusMatched = status === undefined || Number(row.status) === Number(status);
    return keywordMatched && statusMatched;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    success: true,
    total: filtered.length,
  };
}

export async function createContentPartner(values: ContentPartnerCreateValues) {
  partnerRows = [
    {
      ...values,
      id: `mock_partner_${Date.now()}`,
      status: Number(values.status) as 0 | 1,
    },
    ...partnerRows,
  ];

  return { success: true };
}
