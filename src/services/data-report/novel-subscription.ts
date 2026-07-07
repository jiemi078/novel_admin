import { createReportMockQuery, type ReportServiceRow } from './mockService';

const rows: ReportServiceRow[] = [];

export const queryNovelSubscriptionReportPage = createReportMockQuery(rows);
