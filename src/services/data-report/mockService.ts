export type ReportServiceRow = {
  id: string;
  [key: string]: string | number | undefined;
};

export type ReportQueryParams = {
  current?: number;
  pageSize?: number;
  [key: string]: unknown;
};

const includes = (source: string | number | undefined, keyword: unknown) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

export const createReportMockQuery = (rows: ReportServiceRow[]) => async (params: ReportQueryParams) => {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const filtered = rows.filter((row) =>
    Object.entries(params).every(([key, value]) => {
      if (['current', 'pageSize'].includes(key) || value === undefined || value === '') return true;
      return includes(row[key], value);
    }),
  );

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
};
