export type SystemCountryItem = {
  code: string;
  name: string;
  region: string;
  currencyCode: string;
  languageCode: string;
  status: 0 | 1;
  sortOrder: number;
  updatedAt: string;
};

export type SystemCountryPageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  region?: string;
  status?: number;
};

export type SystemCountryCreateValues = Omit<SystemCountryItem, 'updatedAt'>;

let countryRows: SystemCountryItem[] = [
  {
    code: 'US',
    name: 'United States',
    region: 'North America',
    currencyCode: 'USD',
    languageCode: 'en',
    status: 1,
    sortOrder: 0,
    updatedAt: '2026-06-09 10:18:13',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    region: 'Europe',
    currencyCode: 'GBP',
    languageCode: 'en',
    status: 1,
    sortOrder: 1,
    updatedAt: '2026-06-09 10:18:13',
  },
  {
    code: 'CA',
    name: 'Canada',
    region: 'North America',
    currencyCode: 'CAD',
    languageCode: 'en',
    status: 1,
    sortOrder: 2,
    updatedAt: '2026-06-12 09:31:45',
  },
  {
    code: 'AU',
    name: 'Australia',
    region: 'Oceania',
    currencyCode: 'AUD',
    languageCode: 'en',
    status: 1,
    sortOrder: 3,
    updatedAt: '2026-06-12 09:31:45',
  },
  {
    code: 'BR',
    name: 'Brazil',
    region: 'South America',
    currencyCode: 'BRL',
    languageCode: 'pt',
    status: 0,
    sortOrder: 4,
    updatedAt: '2026-06-15 18:06:22',
  },
];

export async function querySystemCountryPage(params: SystemCountryPageParams) {
  const { current = 1, pageSize = 10, keyword, region, status } = params;
  const filtered = countryRows.filter((row) => {
    const keywordMatched =
      !keyword ||
      [row.code, row.name, row.currencyCode, row.languageCode].some((value) =>
        value.toLowerCase().includes(keyword.toLowerCase()),
      );
    const regionMatched = !region || row.region === region;
    const statusMatched = status === undefined || Number(row.status) === Number(status);
    return keywordMatched && regionMatched && statusMatched;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    success: true,
    total: filtered.length,
  };
}

export async function createSystemCountry(values: SystemCountryCreateValues) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  countryRows = [
    {
      ...values,
      code: values.code.toUpperCase(),
      status: Number(values.status) as 0 | 1,
      sortOrder: Number(values.sortOrder || 0),
      updatedAt: now,
    },
    ...countryRows,
  ];

  return { success: true };
}
