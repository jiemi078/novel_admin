import type { GenreItem, GenrePageParams } from '@/pages/content/genre/types';
import dayjs from 'dayjs';

export type GenreCreateValues = {
  name: string;
  language?: string;
  contentType?: number;
  sortOrder?: number;
  status: GenreItem['status'];
};

let mockGenres: GenreItem[] = [
  {
    id: '315730482044096512',
    contentType: 2,
    status: 0,
    sortOrder: 0,
    names: [
      { id: '322564721033097216', language: 'zh-CN', name: '11' },
      { id: '322564721033097217', language: 'en', name: '11' },
    ],
    createdAt: '2026-05-21 14:00:13',
    updatedAt: '2026-06-09 10:37:02',
  },
  {
    id: '315751731067625472',
    contentType: 2,
    status: 1,
    sortOrder: 0,
    names: [{ id: '315751731096985600', language: 'en', name: 'Dark Romance' }],
    createdAt: '2026-05-21 15:24:39',
    updatedAt: '2026-05-21 15:24:39',
  },
  {
    id: '315752212447895552',
    contentType: 2,
    status: 1,
    sortOrder: 0,
    names: [
      { id: '325177662391734272', language: 'zh-CN', name: 'Mafia Romance' },
      { id: '325177662391734273', language: 'en', name: 'Mafia' },
    ],
    createdAt: '2026-05-21 15:26:34',
    updatedAt: '2026-05-21 15:26:34',
  },
  {
    id: '315752286695477248',
    contentType: 2,
    status: 1,
    sortOrder: 0,
    names: [{ id: '315752286724837376', language: 'en', name: 'Billionaire' }],
    createdAt: '2026-05-21 15:26:52',
    updatedAt: '2026-05-21 15:26:52',
  },
  {
    id: '322575955023376384',
    contentType: 2,
    status: 1,
    sortOrder: 0,
    names: [
      { id: '322575955048542208', language: 'en', name: 'Reborn' },
      { id: '322575955048542209', language: 'zh', name: 'Reborn' },
    ],
    createdAt: '2026-06-09 11:21:41',
    updatedAt: '2026-06-09 11:21:41',
  },
];

const includes = (source: string | undefined, keyword: string | undefined) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

export async function queryGenrePage(params: GenrePageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const filtered = mockGenres.filter((item) => {
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

export async function createGenre(values: GenreCreateValues) {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  mockGenres = [
    {
      id: `genre_${Date.now()}`,
      contentType: Number(values.contentType || 2),
      names: [{ id: `genre_name_${Date.now()}`, language: values.language || 'en', name: values.name }],
      sortOrder: Number(values.sortOrder || 0),
      status: values.status,
      createdAt: now,
      updatedAt: now,
    },
    ...mockGenres,
  ];

  return { success: true };
}
