export type SystemLanguageItem = {
  code: string;
  name: string;
  nativeName: string;
  isDefault: 0 | 1;
  status: 0 | 1;
  sortOrder: number;
  updatedAt: string;
};

export type SystemLanguagePageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
};

export type SystemLanguageCreateValues = Omit<SystemLanguageItem, 'updatedAt'>;

let languageRows: SystemLanguageItem[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    isDefault: 1,
    status: 1,
    sortOrder: 0,
    updatedAt: '2026-06-09 10:18:13',
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    isDefault: 0,
    status: 1,
    sortOrder: 1,
    updatedAt: '2026-06-09 10:18:13',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    isDefault: 0,
    status: 1,
    sortOrder: 2,
    updatedAt: '2026-06-12 09:31:45',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    isDefault: 0,
    status: 0,
    sortOrder: 3,
    updatedAt: '2026-06-12 09:31:45',
  },
];

export async function querySystemLanguagePage(params: SystemLanguagePageParams) {
  const { current = 1, pageSize = 10, keyword, status } = params;
  const filtered = languageRows.filter((row) => {
    const keywordMatched =
      !keyword || [row.code, row.name, row.nativeName].some((value) => value.toLowerCase().includes(keyword.toLowerCase()));
    const statusMatched = status === undefined || Number(row.status) === Number(status);
    return keywordMatched && statusMatched;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    success: true,
    total: filtered.length,
  };
}

export async function createSystemLanguage(values: SystemLanguageCreateValues) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  languageRows = [
    {
      ...values,
      code: values.code.toLowerCase(),
      isDefault: Number(values.isDefault) as 0 | 1,
      status: Number(values.status) as 0 | 1,
      sortOrder: Number(values.sortOrder || 0),
      updatedAt: now,
    },
    ...languageRows,
  ];

  return { success: true };
}
