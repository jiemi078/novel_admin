import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProTable,
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import { Button, message, Space, Tag } from 'antd';
import React, { useMemo, useRef } from 'react';
import type { ReactNode } from 'react';

export type AdsMockRow = {
  id: string;
  [key: string]: string | number | string[];
};

export type AdsFieldConfig = {
  title: string;
  dataIndex: string;
  width?: number;
  search?: boolean;
  searchOrder?: number;
  placeholder?: string;
  valueType?: 'text' | 'digit' | 'select' | 'dateTime' | 'tagList';
  options?: { label: string; value: string }[];
  required?: boolean;
  initialValue?: string | number | string[];
  multiple?: boolean;
  suffix?: string;
};

type AdsMockTableProps = {
  title: string;
  createText: string;
  rowKey: string;
  fields: AdsFieldConfig[];
  request: (params: Record<string, unknown>) => Promise<{ data: AdsMockRow[]; total: number; success: boolean }>;
  create: (values: Record<string, unknown>) => Promise<{ success: boolean }>;
  scrollX?: number;
};

const renderFieldValue = (field: AdsFieldConfig, record: AdsMockRow) => {
  const value = record[field.dataIndex];
  const optionLabel = field.options?.find((option) => String(option.value) === String(value))?.label;
  const displayValue = optionLabel ?? value;
  if (field.valueType === 'tagList') {
    const tags = Array.isArray(value) ? value : String(value || '').split(',').filter(Boolean);
    return (
      <Space size={4} wrap>
        {tags.map((tag) => (
          <Tag key={tag} color="blue">
            {tag}
          </Tag>
        ))}
      </Space>
    );
  }
  if (['status', 'isEnabled'].includes(field.dataIndex)) {
    const text = String(displayValue || '');
    const color = ['启用', '运行中', '已验证', '正常', '已绑定'].includes(text)
      ? 'success'
      : ['暂停', '待验证', '告警'].includes(text)
        ? 'warning'
        : 'default';
    return <Tag color={color}>{text}</Tag>;
  }
  if (field.suffix && displayValue !== undefined && displayValue !== '') return `${displayValue}${field.suffix}`;
  return displayValue;
};

const buildColumns = (fields: AdsFieldConfig[]): ProColumns<AdsMockRow>[] => [
  ...fields.map((field, index) => ({
    title: field.title,
    dataIndex: field.dataIndex,
    width: field.width || 140,
    fixed: index === 0 ? ('left' as const) : undefined,
    valueType:
      field.valueType === 'tagList'
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
    render: (_: ReactNode, record: AdsMockRow) => renderFieldValue(field, record),
  })),
  {
    title: '操作',
    valueType: 'option',
    width: 150,
    fixed: 'right',
    render: () => (
      <Space size={8}>
        <a>编辑</a>
        <a style={{ color: '#ff4d4f' }}>删除</a>
      </Space>
    ),
  },
];

const renderFormField = (field: AdsFieldConfig) => {
  const commonProps = {
    key: field.dataIndex,
    name: field.dataIndex,
    label: field.title,
    initialValue: field.initialValue,
    rules: field.required ? [{ required: true, message: `请填写${field.title}` }] : undefined,
  };

  if (field.valueType === 'digit') {
    return <ProFormDigit {...commonProps} min={0} fieldProps={field.suffix ? { addonAfter: field.suffix } : undefined} />;
  }
  if (field.valueType === 'select' || field.valueType === 'tagList') {
    return (
      <ProFormSelect
        {...commonProps}
        mode={field.multiple || field.valueType === 'tagList' ? 'multiple' : undefined}
        options={field.options || []}
      />
    );
  }
  return <ProFormText {...commonProps} />;
};

const AdsMockTable: React.FC<AdsMockTableProps> = ({
  title,
  createText,
  rowKey,
  fields,
  request,
  create,
  scrollX = 1280,
}) => {
  const actionRef = useRef<ActionType | undefined>(undefined);
  const columns = useMemo(() => buildColumns(fields), [fields]);

  return (
    <PageContainer title={false}>
      <ProTable<AdsMockRow, Record<string, unknown>>
        headerTitle={title}
        rowKey={rowKey}
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: scrollX }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => request(params)}
        actionRef={actionRef}
        toolBarRender={() => [
          <ModalForm<Record<string, unknown>>
            key="create"
            title={createText}
            width={560}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                {createText}
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (values) => {
              await create(values);
              message.success('新增成功');
              actionRef.current?.reload();
              return true;
            }}
          >
            {fields.filter((field) => field.dataIndex !== rowKey).map(renderFormField)}
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};

export default AdsMockTable;
