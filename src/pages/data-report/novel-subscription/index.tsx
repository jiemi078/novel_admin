import ReportMockTable, { type ReportFieldConfig } from '../components/ReportMockTable';
import { queryNovelSubscriptionReportPage } from '@/services/data-report/novel-subscription';

const fields: ReportFieldConfig[] = [
  { title: '日期', dataIndex: 'date', width: 120, valueType: 'date', search: true, searchOrder: 4 },
  { title: 'Campaign', dataIndex: 'campaignName', width: 420, search: true, searchOrder: 3, placeholder: '按 Campaign 搜索' },
  { title: '作品', dataIndex: 'contentProjectName', width: 240, search: true, searchOrder: 2, placeholder: '按作品名称搜索' },
  { title: '花费', dataIndex: 'spend', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '注册数', dataIndex: 'registrations', width: 100, valueType: 'digit', search: false },
  { title: '订阅订单数', dataIndex: 'subscriptionOrders', width: 120, valueType: 'digit', search: false },
  { title: '订阅收入', dataIndex: 'subscriptionRevenue', width: 120, valueType: 'digit', suffix: ' USD', search: false },
  { title: '订阅 ROI', dataIndex: 'subscriptionRoi', width: 120, valueType: 'ratioPercent', search: false },
];

export default () => (
  <ReportMockTable title="订阅报表" fields={fields} request={queryNovelSubscriptionReportPage} scrollX={1230} />
);
