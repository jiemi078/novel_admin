import ReportMockTable, { type ReportFieldConfig } from '../components/ReportMockTable';
import { queryNovelNewUserRoiPage } from '@/services/data-report/novel-new-user-roi';

const fields: ReportFieldConfig[] = [
  { title: '日期', dataIndex: 'date', width: 120, valueType: 'date', search: true, searchOrder: 4 },
  { title: '注册数', dataIndex: 'registrations', width: 100, valueType: 'digit', search: false },
  { title: '新用户注册数', dataIndex: 'newUserRegistrations', width: 130, valueType: 'digit', search: false },
  { title: '回流用户注册数', dataIndex: 'returningUserRegistrations', width: 140, valueType: 'digit', search: false },
  { title: 'CPI', dataIndex: 'cpi', width: 100, valueType: 'digit', precision: 4, suffix: ' USD', search: false },
  { title: '花费', dataIndex: 'spend', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '首日付费人数', dataIndex: 'firstDayPayers', width: 120, valueType: 'digit', search: false },
  { title: '订单数', dataIndex: 'orders', width: 90, valueType: 'digit', search: false },
  { title: '首日收入', dataIndex: 'firstDayRevenue', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '首日内购收入', dataIndex: 'firstDayIAPRevenue', width: 130, valueType: 'digit', suffix: ' USD', search: false },
  { title: '首日订阅收入', dataIndex: 'firstDaySubscriptionRevenue', width: 130, valueType: 'digit', suffix: ' USD', search: false },
  { title: 'D0 ROI', dataIndex: 'roi0', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'D1 ROI', dataIndex: 'roi1', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'D2 ROI', dataIndex: 'roi2', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'D3 ROI', dataIndex: 'roi3', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'D7 ROI', dataIndex: 'roi7', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'D14 ROI', dataIndex: 'roi14', width: 105, valueType: 'ratioPercent', search: false },
  { title: '累计 ROI', dataIndex: 'roiToDate', width: 110, valueType: 'ratioPercent', search: false },
];

export default () => (
  <ReportMockTable title="用户roi" fields={fields} request={queryNovelNewUserRoiPage} scrollX={2050} />
);
