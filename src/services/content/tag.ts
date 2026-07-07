import type { TagItem, TagPageParams } from '@/pages/content/tag/types';
import dayjs from 'dayjs';

export type TagCreateValues = {
  name: string;
  language?: string;
  contentType?: number;
  sortOrder?: number;
  status: TagItem['status'];
};

let mockTags: TagItem[] = [];

const includes = (source: string | undefined, keyword: string | undefined) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

export async function queryTagPage(params: TagPageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const filtered = mockTags.filter((item) => {
    if (params.name && !item.names.some((name) => includes(name.name, params.name))) return false;
    if (params.status !== undefined && item.status !== Number(params.status)) return false;
    return true;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}

export async function createTag(values: TagCreateValues) {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  mockTags = [
    {
      id: `tag_${Date.now()}`,
      contentType: Number(values.contentType || 2),
      names: [{ id: `tag_name_${Date.now()}`, language: values.language || 'en', name: values.name }],
      sortOrder: Number(values.sortOrder || 0),
      status: values.status,
      createdAt: now,
      updatedAt: now,
    },
    ...mockTags,
  ];

  return { success: true };
}
