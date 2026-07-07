import { createReportMockQuery } from './mockService';

const rows = [
  {
    id: 'novel_total_roi_20260701',
    date: '2026-07-01',
    spend: 234.06,
    revenue: 0,
    iapRevenue: 0,
    subscriptionRevenue: 0,
    roi: 0,
    registrations: 404,
  },
  {
    id: 'novel_total_roi_20260630',
    date: '2026-06-30',
    spend: 103.78,
    revenue: 59.98,
    iapRevenue: 59.98,
    subscriptionRevenue: 0,
    roi: 0.5779533628830218,
    registrations: 173,
  },
  {
    id: 'novel_total_roi_20260629',
    date: '2026-06-29',
    spend: 2.65,
    revenue: 0,
    iapRevenue: 0,
    subscriptionRevenue: 0,
    roi: 0,
    registrations: 3,
  },
  {
    id: 'novel_total_roi_summary',
    date: '汇总',
    spend: 340.49,
    revenue: 59.98,
    iapRevenue: 59.98,
    subscriptionRevenue: 0,
    roi: 0.17615789009956237,
    registrations: 588,
  },
];

export const queryNovelTotalRoiPage = createReportMockQuery(rows);
