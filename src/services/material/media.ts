import type {
  MaterialFolderItem,
  MaterialMediaItem,
  MaterialMediaPageParams,
  MaterialTagItem,
} from '@/pages/material/media/types';

const folders: MaterialFolderItem[] = [
  { id: '322278152267124736', parentId: '0', name: 'Beyond status', sort: 0, createdAt: '2026-06-08 15:38:19', updatedAt: '2026-06-08 15:38:19' },
  { id: '322289394465656832', parentId: '0', name: 'Confessions While the Stars Are Still Out', sort: 0, createdAt: '2026-06-08 16:22:59', updatedAt: '2026-06-08 16:22:59' },
  { id: '322296237577490432', parentId: '0', name: 'Five years of reply', sort: 0, createdAt: '2026-06-08 16:50:11', updatedAt: '2026-06-08 16:50:11' },
  { id: '322297500201406464', parentId: '0', name: 'Blade of Farewell Spring', sort: 0, createdAt: '2026-06-08 16:55:12', updatedAt: '2026-06-08 16:55:12' },
  { id: '322304428537294848', parentId: '0', name: 'Rules of High Society', sort: 0, createdAt: '2026-06-08 17:22:43', updatedAt: '2026-06-08 17:22:43' },
  { id: '322313122700333056', parentId: '0', name: "The Billionaire's Forsaken Wife", sort: 0, createdAt: '2026-06-08 17:57:16', updatedAt: '2026-06-08 17:57:16' },
  { id: '322314196756742144', parentId: '0', name: 'The Birthday Betrayal The Wife Alliance', sort: 0, createdAt: '2026-06-08 18:01:32', updatedAt: '2026-06-08 18:01:32' },
  { id: '322990162931888128', parentId: '0', name: 'The Love He Erased', sort: 0, createdAt: '2026-06-10 14:47:35', updatedAt: '2026-06-10 14:47:35' },
  { id: '323704442056609792', parentId: '0', name: 'The Bride He Left Behind', sort: 0, createdAt: '2026-06-12 14:05:53', updatedAt: '2026-06-12 14:05:53' },
];

const tags: MaterialTagItem[] = [];

const rows: MaterialMediaItem[] = [
  {
    id: '328708750753927168',
    folderId: '0',
    name: 'Thanks for Pushing Me Off the Roof_cover.jpg',
    originalName: 'Thanks for Pushing Me Off the Roof_cover.jpg',
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/26/328708750749732864.jpg',
    size: 915442,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-26 09:31:13',
    updatedAt: '2026-06-26 09:31:17',
  },
  {
    id: '325461771731079168',
    folderId: '0',
    name: 'On Engagement Night, I Switched the Groom.jpg',
    originalName: 'On Engagement Night, I Switched the Groom.jpg',
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325461771726884864.jpg',
    size: 1589875,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-17 10:28:53',
    updatedAt: '2026-06-17 10:29:16',
  },
  {
    id: '325461319836778496',
    folderId: '0',
    name: 'On the Wedding Invitation, He Changed the Bride to His First Love.jpg',
    originalName: 'On the Wedding Invitation, He Changed the Bride to His First Love.jpg',
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325461319828389888.jpg',
    size: 1366426,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-17 10:27:05',
    updatedAt: '2026-06-17 10:27:07',
  },
  {
    id: '325461009038852096',
    folderId: '0',
    name: 'After the Breakup, I Became the Supreme Queen.jpg',
    originalName: 'After the Breakup, I Became the Supreme Queen.jpg',
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325461009034657792.jpg',
    size: 1507053,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-17 10:25:51',
    updatedAt: '2026-06-17 10:25:55',
  },
  {
    id: '325460652741115904',
    folderId: '0',
    name: "Reborn: The Billionaire Ex-Wife's Revenge.jpg",
    originalName: "Reborn: The Billionaire Ex-Wife's Revenge.jpg",
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325460652736921600.jpg',
    size: 1319459,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-17 10:24:26',
    updatedAt: '2026-06-17 10:24:29',
  },
  {
    id: '325459943274594304',
    folderId: '0',
    name: 'After a Whirlwind Marriage, My Ex-Fiance Went Crazy.jpg',
    originalName: 'After a Whirlwind Marriage, My Ex-Fiance Went Crazy.jpg',
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325459943270400000.jpg',
    size: 2214356,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-17 10:21:37',
    updatedAt: '2026-06-17 10:21:44',
  },
  {
    id: '325459488951767040',
    folderId: '0',
    name: "Fed 200 Pounds by a Cheater, Now I'm Out of His League.jpg",
    originalName: "Fed 200 Pounds by a Cheater, Now I'm Out of His League.jpg",
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325459488947572736.jpg',
    size: 1530821,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-17 10:19:49',
    updatedAt: '2026-06-17 10:20:12',
  },
  {
    id: '325459114790502400',
    folderId: '0',
    name: 'Runaway Bride.jpg',
    originalName: 'Runaway Bride.jpg',
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325459114782113792.jpg',
    size: 1578021,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-17 10:18:20',
    updatedAt: '2026-06-17 10:18:39',
  },
  {
    id: '325458771977453568',
    folderId: '0',
    name: "My Ex-Husband's Rival Is Now My Lawyer.jpg",
    originalName: "My Ex-Husband's Rival Is Now My Lawyer.jpg",
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/17/325458771969064960.jpg',
    size: 1379089,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-17 10:16:58',
    updatedAt: '2026-06-17 10:17:03',
  },
  {
    id: '325209173002309632',
    folderId: '0',
    name: "This Thanksgiving, I'm Done Waiting for Him.jpg",
    originalName: "This Thanksgiving, I'm Done Waiting for Him.jpg",
    type: 1,
    url: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/16/325209172993921024.jpg',
    size: 1012930,
    mimeType: 'image/jpeg',
    autoSync: 0,
    status: 1,
    createdBy: '324753848478482432',
    createdAt: '2026-06-16 17:45:09',
    updatedAt: '2026-06-16 17:45:12',
  },
  {
    id: '322255172367568896',
    folderId: '0',
    name: 'ADXray domestic industry edition.mp4',
    originalName: 'ADXray domestic industry edition.mp4',
    type: 2,
    url: 'https://video.iquickfic.com/311520262954684416/ads/material/content_0/2026/06/08/322255172363374592.mp4',
    size: 39009612,
    mimeType: 'video/mp4',
    autoSync: 0,
    status: 1,
    createdBy: '311520572125220864',
    createdAt: '2026-06-08 14:07:00',
    updatedAt: '2026-06-08 14:14:49',
  },
];

const includes = (source: string | number | undefined, keyword: string) =>
  String(source || '').toLowerCase().includes(keyword);

export async function queryMaterialMediaPage(params: MaterialMediaPageParams) {
  const current = Number(params.current || params.page || 1);
  const pageSize = Number(params.pageSize || 20);
  const keyword = String(params.keyword || '').trim().toLowerCase();
  const tagIds = Array.isArray(params.tagIds) ? params.tagIds : [];

  const filtered = rows.filter((item) => {
    if (params.type && item.type !== Number(params.type)) return false;
    if (params.folderId && !['-1', '0'].includes(String(params.folderId)) && item.folderId !== String(params.folderId)) return false;
    if (tagIds.length && !tagIds.every((tagId) => item.tagIds?.includes(tagId))) return false;
    if (!keyword) return true;
    return includes(item.id, keyword) || includes(item.name, keyword) || includes(item.originalName, keyword);
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}

export async function queryMaterialFolders() {
  return { list: folders };
}

export async function queryMaterialTags() {
  return { list: tags, total: tags.length };
}
