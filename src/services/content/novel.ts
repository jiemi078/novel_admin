import type { NovelItem, NovelPageParams } from '@/pages/content/novel/types';
import dayjs from 'dayjs';

export type NovelCreateValues = {
  title: string;
  authorName: string;
  promoTitle?: string;
  rating?: number;
  genreName: string;
  sourceLanguage: string;
  plannedTotalItems?: number;
  totalWordCount?: number;
  readCount?: number;
  totalItems?: number;
  publishedItems?: number;
  appPriceTemplateId?: string;
  tagNames?: string[];
  status: NovelItem['status'];
  h5Status?: NovelItem['h5Status'];
  appStatus?: NovelItem['appStatus'];
  coverAccessUrl?: string;
};

let mockNovels: NovelItem[] = [
  {
    id: '328709576331378688',
    title: 'Thanks for Pushing Me Off the Roof',
    authorName: 'Piper Hayes',
    promoTitle: 'Thanks for Pushing Me Off the Roof',
    rating: 4.3,
    genreName: 'Reborn',
    sourceLanguage: 'en',
    coverAccessUrl:
      'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/26/328708750749732864.jpg?auth_key=1783408490-d4a4ee71-0-1411ad56ea7539a2d5f65441e30ca33f',
    plannedTotalItems: 7,
    totalWordCount: 23115,
    readCount: 88423,
    totalItems: 7,
    publishedItems: 7,
    status: 1,
    appStatus: 0,
    h5Status: 1,
    appPriceTemplateId: '325197909047922688',
    tagNames: [],
    createdAt: '2026-06-26 09:34:30',
    updatedAt: '2026-06-26 09:35:48',
  },
  {
    id: '325462081677561856',
    title: 'On Engagement Night, I Switched the Groom',
    authorName: 'Joy Brown',
    promoTitle: '',
    rating: 4.6,
    genreName: 'Contemporary Romance',
    sourceLanguage: 'en',
    coverAccessUrl:
      'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325461771726884864.jpg?auth_key=1783408490-8031aefa-0-04502cbe9c75ef9e8ea7e078966b2b6b',
    plannedTotalItems: 16,
    totalWordCount: 35209,
    readCount: 46822,
    totalItems: 16,
    publishedItems: 16,
    status: 1,
    appStatus: 0,
    h5Status: 1,
    appPriceTemplateId: '325197909047922688',
    tagNames: [],
    createdAt: '2026-06-17 10:30:07',
    updatedAt: '2026-06-17 10:30:38',
  },
  {
    id: '325461341248688128',
    title: 'On the Wedding Invitation, He Changed the Bride to His First Love',
    authorName: 'Joy Brown',
    promoTitle: '',
    rating: 4.3,
    genreName: 'Contemporary Romance',
    sourceLanguage: 'en',
    coverAccessUrl:
      'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325461319828389888.jpg?auth_key=1783408490-256292ba-0-19c49e923255aab3d29e756e30910704',
    plannedTotalItems: 15,
    totalWordCount: 31583,
    readCount: 14568,
    totalItems: 15,
    publishedItems: 15,
    status: 0,
    appStatus: 0,
    h5Status: 1,
    appPriceTemplateId: '325198428973846528',
    tagNames: [],
    createdAt: '2026-06-17 10:27:11',
    updatedAt: '2026-06-17 10:27:52',
  },
  {
    id: '325461042131910656',
    title: 'After the Breakup, I Became the Supreme Queen',
    authorName: 'Joy Brown',
    promoTitle: '',
    rating: 4.8,
    genreName: 'Contemporary Romance',
    sourceLanguage: 'en',
    coverAccessUrl:
      'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325461009034657792.jpg?auth_key=1783408490-9af917a4-0-798da87959416c9a13782d07d22af412',
    plannedTotalItems: 14,
    totalWordCount: 34521,
    readCount: 58432,
    totalItems: 14,
    publishedItems: 14,
    status: 1,
    appStatus: 0,
    h5Status: 1,
    appPriceTemplateId: '325198428973846528',
    tagNames: [],
    createdAt: '2026-06-17 10:25:59',
    updatedAt: '2026-06-17 10:26:22',
  },
  {
    id: '325460686610120704',
    title: 'Reborn: The Billionaire Ex-Wife’s Revenge',
    authorName: 'Joy Brown',
    promoTitle: '',
    rating: 4.7,
    genreName: 'Contemporary Romance',
    sourceLanguage: 'en',
    coverAccessUrl:
      'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325460652736921600.jpg?auth_key=1783408490-8e97614c-0-31e1793691fe398d69e21daaca74de7c',
    plannedTotalItems: 24,
    totalWordCount: 54305,
    readCount: 65483,
    totalItems: 24,
    publishedItems: 24,
    status: 1,
    appStatus: 0,
    h5Status: 1,
    appPriceTemplateId: '325198639150407680',
    tagNames: [],
    createdAt: '2026-06-17 10:24:34',
    updatedAt: '2026-06-17 10:25:05',
  },
];

const includes = (source: string | undefined, keyword: string | undefined) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

export async function queryNovelPage(params: NovelPageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const filtered = mockNovels.filter((item) => {
    if (!includes(item.id, params.id)) return false;
    if (!includes(item.title, params.title)) return false;
    if (params.sourceLanguage && item.sourceLanguage !== params.sourceLanguage) return false;
    if (params.status !== undefined && item.status !== Number(params.status)) return false;
    if (params.genreName && !includes(item.genreName, params.genreName)) return false;
    return true;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}

export async function createNovel(values: NovelCreateValues) {
  const id = `novel_${Date.now()}`;
  mockNovels = [
    {
      id,
      coverAccessUrl: values.coverAccessUrl || `https://picsum.photos/seed/${id}/120/160`,
      title: values.title,
      authorName: values.authorName,
      promoTitle: values.promoTitle || '',
      rating: Number(values.rating || 0),
      genreName: values.genreName,
      sourceLanguage: values.sourceLanguage,
      plannedTotalItems: Number(values.plannedTotalItems || 0),
      totalWordCount: Number(values.totalWordCount || 0),
      readCount: Number(values.readCount || 0),
      totalItems: Number(values.totalItems || 0),
      publishedItems: Number(values.publishedItems || 0),
      appPriceTemplateId: values.appPriceTemplateId || '0',
      tagNames: values.tagNames || [],
      status: values.status,
      appStatus: values.appStatus ?? 0,
      h5Status: values.h5Status ?? 1,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
    ...mockNovels,
  ];

  return { success: true };
}
