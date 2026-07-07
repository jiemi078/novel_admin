import ReportMockTable, { type ReportFieldConfig } from '../components/ReportMockTable';
import { queryNovelTotalRoiPage } from '@/services/data-report/novel-total-roi';

const fields: ReportFieldConfig[] = [
  { title: '日期', dataIndex: 'date', width: 120, valueType: 'date', search: true, searchOrder: 4 },
  { title: '花费', dataIndex: 'spend', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '总收入', dataIndex: 'revenue', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '内购收入', dataIndex: 'iapRevenue', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '订阅收入', dataIndex: 'subscriptionRevenue', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '总 ROI', dataIndex: 'roi', width: 110, valueType: 'ratioPercent', search: false },
  { title: '注册数', dataIndex: 'registrations', width: 100, valueType: 'digit', search: false },
];

export default () => (
  <ReportMockTable title="总 ROI" fields={fields} request={queryNovelTotalRoiPage} scrollX={850} />
);
