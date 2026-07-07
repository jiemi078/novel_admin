import ReportMockTable, { type ReportFieldConfig } from '../components/ReportMockTable';
import { queryNovelRecoveryPage } from '@/services/data-report/novel-recovery';

const fields: ReportFieldConfig[] = [
  { title: '开始日期', dataIndex: 'startDate', width: 120, valueType: 'date', search: true, searchOrder: 4 },
  { title: '结束日期', dataIndex: 'endDate', width: 120, valueType: 'date', search: true, searchOrder: 3 },
  { title: 'Campaign', dataIndex: 'campaignName', width: 420, search: true, searchOrder: 2, placeholder: '按 Campaign 搜索' },
  { title: '作品', dataIndex: 'contentProjectName', width: 240, search: true, searchOrder: 1, placeholder: '按作品名称搜索' },
  { title: '花费', dataIndex: 'spend', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: '注册数', dataIndex: 'registrations', width: 100, valueType: 'digit', search: false },
  { title: 'D0收入', dataIndex: 'revenueDay0', width: 100, valueType: 'digit', suffix: ' USD', search: false },
  { title: 'D1收入', dataIndex: 'revenueDay1', width: 100, valueType: 'digit', suffix: ' USD', search: false },
  { title: 'D2收入', dataIndex: 'revenueDay2', width: 100, valueType: 'digit', suffix: ' USD', search: false },
  { title: 'D3收入', dataIndex: 'revenueDay3', width: 100, valueType: 'digit', suffix: ' USD', search: false },
  { title: 'D7收入', dataIndex: 'revenueDay7', width: 100, valueType: 'digit', suffix: ' USD', search: false },
  { title: '累计收入', dataIndex: 'cumulativeRevenue', width: 110, valueType: 'digit', suffix: ' USD', search: false },
  { title: 'D0 ROI', dataIndex: 'roiDay0', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'D1 ROI', dataIndex: 'roiDay1', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'D2 ROI', dataIndex: 'roiDay2', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'D3 ROI', dataIndex: 'roiDay3', width: 100, valueType: 'ratioPercent', search: false },
  { title: 'D7 ROI', dataIndex: 'roiDay7', width: 100, valueType: 'ratioPercent', search: false },
  { title: '累计 ROI', dataIndex: 'roiToDate', width: 110, valueType: 'ratioPercent', search: false },
];

export default () => (
  <ReportMockTable title="投放回收报表" fields={fields} request={queryNovelRecoveryPage} scrollX={2510} />
);
