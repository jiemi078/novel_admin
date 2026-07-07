import { PageContainer, ProTable, type ProColumns } from '@ant-design/pro-components';
import { Tag } from 'antd';
import React, { useMemo } from 'react';

export type ReportRow = {
  id: string;
  [key: string]: string | number | undefined;
};

export type ReportFieldConfig = {
  title: string;
  dataIndex: string;
  width?: number;
  search?: boolean;
  searchOrder?: number;
  valueType?: 'text' | 'digit' | 'date' | 'dateTime' | 'select' | 'percent' | 'ratioPercent';
  options?: { label: string; value: string }[];
  suffix?: string;
  precision?: number;
  placeholder?: string;
};

type ReportMockTableProps = {
  title: string;
  fields: ReportFieldConfig[];
  request: (params: Record<string, unknown>) => Promise<{ data: ReportRow[]; total: number; success: boolean }>;
  scrollX?: number;
};

const renderValue = (field: ReportFieldConfig, record: ReportRow) => {
  const raw = record[field.dataIndex];
  const optionLabel = field.options?.find((option) => String(option.value) === String(raw))?.label;
  const value = optionLabel ?? raw;

  if (field.valueType === 'percent') {
    return `${Number(raw || 0).toFixed(field.precision ?? 2)}%`;
  }
  if (field.valueType === 'ratioPercent') {
    return `${(Number(raw || 0) * 100).toFixed(field.precision ?? 2)}%`;
  }
  if (field.dataIndex.toLowerCase().includes('roi')) {
    const num = Number(raw || 0);
    return <Tag color={num >= 100 ? 'success' : num >= 60 ? 'warning' : 'default'}>{num.toFixed(field.precision ?? 2)}%</Tag>;
  }
  if (field.valueType === 'digit' && typeof raw === 'number' && field.precision !== undefined) {
    const formatted = raw.toFixed(field.precision);
    return field.suffix ? `${formatted}${field.suffix}` : formatted;
  }
  if (field.suffix && value !== undefined && value !== '') return `${value}${field.suffix}`;
  return value;
};

const buildColumns = (fields: ReportFieldConfig[]): ProColumns<ReportRow>[] =>
  fields.map((field, index) => ({
    title: field.title,
    dataIndex: field.dataIndex,
    width: field.width || 130,
    fixed: index === 0 ? ('left' as const) : undefined,
    valueType:
      field.valueType === 'percent' || field.valueType === 'ratioPercent'
        ? undefined
        : field.valueType === 'select'
          ? ('select' as const)
          : field.valueType,
    valueEnum:
      field.valueType === 'select' && field.options
        ? Object.fromEntries(field.options.map((option) => [option.value, { text: option.label }]))
        : undefined,
    search: field.search,
    order: field.searchOrder,
    fieldProps: field.valueType === 'select' ? undefined : { placeholder: field.placeholder || `请输入${field.title}` },
    render: (_, record) => renderValue(field, record),
  }));

const ReportMockTable: React.FC<ReportMockTableProps> = ({ title, fields, request, scrollX = 1280 }) => {
  const columns = useMemo(() => buildColumns(fields), [fields]);

  return (
    <PageContainer title={false}>
      <ProTable<ReportRow, Record<string, unknown>>
        headerTitle={title}
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: scrollX }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => request(params)}
      />
    </PageContainer>
  );
};

export default ReportMockTable;
