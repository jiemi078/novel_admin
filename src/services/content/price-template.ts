import type {
  PriceTemplateItem,
  PriceTemplatePageParams,
} from '@/pages/content/price-template/types';
import dayjs from 'dayjs';

export type PriceTemplateCreateValues = {
  name: string;
  contentType?: number;
  billingMode?: number;
  wordCountUnit?: number;
  description?: string;
  status: PriceTemplateItem['status'];
};

let mockTemplates: PriceTemplateItem[] = [
  {
    id: '325198746633641984',
    name: '8',
    contentType: 2,
    billingMode: 1,
    wordCountUnit: 1000,
    description: '',
    status: 1,
    createdAt: '2026-06-16 17:03:43',
    updatedAt: '2026-06-16 17:03:43',
  },
  {
    id: '325198639150407680',
    name: '7',
    contentType: 2,
    billingMode: 1,
    wordCountUnit: 1000,
    description: '',
    status: 1,
    createdAt: '2026-06-16 17:03:17',
    updatedAt: '2026-06-16 17:03:17',
  },
  {
    id: '325198540252913664',
    name: '6',
    contentType: 2,
    billingMode: 1,
    wordCountUnit: 1000,
    description: '',
    status: 1,
    createdAt: '2026-06-16 17:02:54',
    updatedAt: '2026-06-16 17:02:54',
  },
  {
    id: '325198428973846528',
    name: '5',
    contentType: 2,
    billingMode: 1,
    wordCountUnit: 1000,
    description: '',
    status: 1,
    createdAt: '2026-06-16 17:02:27',
    updatedAt: '2026-06-16 17:02:27',
  },
  {
    id: '325197909047922688',
    name: '4',
    contentType: 2,
    billingMode: 1,
    wordCountUnit: 1000,
    description: '',
    status: 1,
    createdAt: '2026-06-16 17:00:23',
    updatedAt: '2026-06-16 17:00:23',
  },
];

const includes = (source: string | undefined, keyword: string | undefined) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

export async function queryPriceTemplatePage(params: PriceTemplatePageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const filtered = mockTemplates.filter((item) => {
    if (!includes(item.name, params.name)) return false;
    if (params.status !== undefined && item.status !== Number(params.status)) return false;
    return true;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}

export async function createPriceTemplate(values: PriceTemplateCreateValues) {
  mockTemplates = [
    {
      id: `price_tpl_${Date.now()}`,
      name: values.name,
      contentType: Number(values.contentType || 2),
      billingMode: Number(values.billingMode || 1),
      wordCountUnit: Number(values.wordCountUnit || 1000),
      description: values.description || '',
      status: values.status,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
    ...mockTemplates,
  ];

  return { success: true };
}
