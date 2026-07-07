import ReportMockTable, { type ReportFieldConfig } from '../components/ReportMockTable';
import { queryNovelPerformancePage } from '@/services/data-report/novel-performance';

const fields: ReportFieldConfig[] = [
  { title: '日期', dataIndex: 'date', width: 120, valueType: 'date', search: true, searchOrder: 4 },
  { title: 'Campaign', dataIndex: 'campaignName', width: 420, search: true, searchOrder: 3, placeholder: '按 Campaign 搜索' },
  { title: '作品', dataIndex: 'contentProjectName', width: 240, search: true, searchOrder: 2, placeholder: '按作品名称搜索' },
  { title: '花费', dataIndex: 'spend', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '展示', dataIndex: 'impressions', width: 100, valueType: 'digit', search: false },
  { title: '点击', dataIndex: 'clicks', width: 90, valueType: 'digit', search: false },
  { title: '视频播放', dataIndex: 'videoViews', width: 100, valueType: 'digit', search: false },
  { title: '注册数', dataIndex: 'registrations', width: 100, valueType: 'digit', search: false },
  { title: '新用户注册数', dataIndex: 'newUserRegistrations', width: 130, valueType: 'digit', search: false },
  { title: '付费人数', dataIndex: 'payers', width: 100, valueType: 'digit', search: false },
  { title: '订单数', dataIndex: 'orders', width: 90, valueType: 'digit', search: false },
  { title: '收入', dataIndex: 'revenue', width: 100, valueType: 'digit', suffix: ' USD', search: false },
  { title: '内购收入', dataIndex: 'iapRevenue', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '订阅收入', dataIndex: 'subscriptionRevenue', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: 'CTR', dataIndex: 'ctr', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'CPC', dataIndex: 'cpc', width: 100, valueType: 'digit', precision: 4, suffix: ' USD', search: false },
  { title: 'CPM', dataIndex: 'cpm', width: 100, valueType: 'digit', precision: 4, suffix: ' USD', search: false },
  { title: 'CPI', dataIndex: 'cpi', width: 100, valueType: 'digit', precision: 4, suffix: ' USD', search: false },
  { title: '付费率', dataIndex: 'payRate', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'ROI', dataIndex: 'roi', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'ARPU', dataIndex: 'arpu', width: 100, valueType: 'digit', precision: 4, suffix: ' USD', search: false },
  { title: 'ARPPU', dataIndex: 'arppu', width: 100, valueType: 'digit', precision: 4, suffix: ' USD', search: false },
];

export default () => (
  <ReportMockTable title="投放效果" fields={fields} request={queryNovelPerformancePage} scrollX={2760} />
);
