import dayjs from 'dayjs';

export type AdsServiceRow = {
  id: string;
  [key: string]: string | number | string[];
};

export type AdsQueryParams = {
  current?: number;
  pageSize?: number;
  [key: string]: unknown;
};

const matches = (source: string | number | string[] | undefined, keyword: unknown) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  if (Array.isArray(source)) return source.some((item) => item.toLowerCase().includes(value));
  return String(source || '').toLowerCase().includes(value);
};

export const createAdsMockService = (
  initialRows: AdsServiceRow[],
  idPrefix: string,
  normalizeValues: (values: Record<string, unknown>, id: string) => AdsServiceRow,
) => {
  let rows = initialRows;

  const queryPage = async (params: AdsQueryParams) => {
    const current = Number(params.current || 1);
    const pageSize = Number(params.pageSize || 20);
    const filtered = rows.filter((row) =>
      Object.entries(params).every(([key, value]) => {
        if (['current', 'pageSize'].includes(key) || value === undefined || value === '') return true;
        return matches(row[key], value);
      }),
    );

    return {
      data: filtered.slice((current - 1) * pageSize, current * pageSize),
      total: filtered.length,
      success: true,
    };
  };

  const createItem = async (values: Record<string, unknown>) => {
    const id = `${idPrefix}_${Date.now()}`;
    rows = [
      {
        ...normalizeValues(values, id),
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
      ...rows,
    ];
    return { success: true };
  };

  return { queryPage, createItem };
};
