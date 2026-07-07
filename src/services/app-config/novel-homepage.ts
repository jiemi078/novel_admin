export type HomepageTab = {
  id: string;
  appId: string;
  platform: string;
  code: string;
  names: Record<string, string>;
  icon: string;
  sortOrder: number;
  status: 0 | 1;
  createdAt: string;
  updatedAt: string;
};

export type HomepageBlock = {
  id: string;
  tabId: string;
  blockType: string;
  title: Record<string, string>;
  config: string;
  targetCountries: string[] | null;
  sortOrder: number;
  status: 0 | 1;
  createdAt: string;
  updatedAt: string;
};

export type HomepageBlockItem = {
  id: string;
  blockId: string;
  itemType: number;
  refId: string;
  coverUrl: string;
  coverPreviewUrl: string;
  contentTitle: string;
  contentCoverUrl: string;
  contentCoverPreviewUrl: string;
  linkUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type HomepageBlockCreateValues = {
  title: string;
  blockType: string;
  sortOrder?: number;
  status?: 0 | 1;
};

const tabs: HomepageTab[] = [
  {
    id: '311525776757358592',
    appId: '311520262971461633',
    platform: 'h5',
    code: '311525776753164288',
    names: { zh: '首页' },
    icon: '1',
    sortOrder: 0,
    status: 1,
    createdAt: '2026-05-09 23:32:13',
    updatedAt: '2026-05-09 23:46:27',
  },
];

const blocks: HomepageBlock[] = [
  {
    id: '316500914401722368',
    tabId: '311525776757358592',
    blockType: 'banner',
    title: { en: 'Hot Picks', zh: 'Hot Picks' },
    config: '{}',
    targetCountries: null,
    sortOrder: 0,
    status: 1,
    createdAt: '2026-05-23 17:01:38',
    updatedAt: '2026-06-09 10:18:13',
  },
  {
    id: '317918064521781248',
    tabId: '311525776757358592',
    blockType: 'horizontal_scroll_3',
    title: { en: 'Hot Picks', zh: 'Hot Picks' },
    config: '{}',
    targetCountries: null,
    sortOrder: 1,
    status: 1,
    createdAt: '2026-05-27 14:52:53',
    updatedAt: '2026-06-09 10:18:17',
  },
  {
    id: '317918294055079936',
    tabId: '311525776757358592',
    blockType: 'dual_column',
    title: { en: 'For You', zh: 'For You' },
    config: '{}',
    targetCountries: null,
    sortOrder: 2,
    status: 1,
    createdAt: '2026-05-27 14:53:48',
    updatedAt: '2026-06-09 10:19:05',
  },
  {
    id: '317918628173324288',
    tabId: '311525776757358592',
    blockType: 'vertical_list',
    title: { en: 'Recommend', zh: 'Recommend' },
    config: '{}',
    targetCountries: null,
    sortOrder: 4,
    status: 1,
    createdAt: '2026-05-27 14:55:08',
    updatedAt: '2026-06-09 10:19:11',
  },
];

const blockItems: Record<string, HomepageBlockItem[]> = {
  '316500914401722368': [
    {
      id: '322572822243188736',
      blockId: '316500914401722368',
      itemType: 2,
      refId: '321527044494073856',
      coverUrl: '',
      coverPreviewUrl: '',
      contentTitle: "The Billionaire's Forsaken Wife",
      contentCoverUrl: '311520262954684416/content/novel/cover/content_0/2026/06/06/321526999023632384.webp',
      contentCoverPreviewUrl: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/06/321526999023632384.webp',
      linkUrl: '',
      sortOrder: 0,
      createdAt: '2026-06-09 11:09:14',
      updatedAt: '2026-06-09 11:09:14',
    },
    {
      id: '322572822243188737',
      blockId: '316500914401722368',
      itemType: 2,
      refId: '321523306748452864',
      coverUrl: '',
      coverPreviewUrl: '',
      contentTitle: 'Beyond status',
      contentCoverUrl: '311520262954684416/content/novel/cover/content_321523306748452864/2026/06/06/321524337062453248.webp',
      contentCoverPreviewUrl: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_321523306748452864/2026/06/06/321524337062453248.webp',
      linkUrl: '',
      sortOrder: 1,
      createdAt: '2026-06-09 11:09:14',
      updatedAt: '2026-06-09 11:09:14',
    },
    {
      id: '322572822243188738',
      blockId: '316500914401722368',
      itemType: 2,
      refId: '321525914829602816',
      coverUrl: '',
      coverPreviewUrl: '',
      contentTitle: 'Confessions While the Stars Are Still Out',
      contentCoverUrl: '311520262954684416/content/novel/cover/content_0/2026/06/06/321525889403723776.webp',
      contentCoverPreviewUrl: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/06/06/321525889403723776.webp',
      linkUrl: '',
      sortOrder: 2,
      createdAt: '2026-06-09 11:09:14',
      updatedAt: '2026-06-09 11:09:14',
    },
    {
      id: '322572822243188739',
      blockId: '316500914401722368',
      itemType: 2,
      refId: '316511620727574528',
      coverUrl: '',
      coverPreviewUrl: '',
      contentTitle: 'My Baby and I Died in Labor While He Celebrated Hers',
      contentCoverUrl: '311520262954684416/content/novel/cover/content_0/2026/05/23/316511588435640320.jpg',
      contentCoverPreviewUrl: 'https://img.iquickfic.com/311520262954684416/content/novel/cover/content_0/2026/05/23/316511588435640320.jpg',
      linkUrl: '',
      sortOrder: 3,
      createdAt: '2026-06-09 11:09:14',
      updatedAt: '2026-06-09 11:09:14',
    },
  ],
};

export async function queryHomepageTabs() {
  return { list: tabs };
}

export async function queryHomepageBlocks(tabId: string) {
  return { list: blocks.filter((block) => block.tabId === tabId).sort((a, b) => a.sortOrder - b.sortOrder) };
}

export async function queryHomepageBlockItems(blockId: string) {
  return { list: blockItems[blockId] || [] };
}

export async function createHomepageBlock(values: HomepageBlockCreateValues) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const tabId = tabs[0]?.id || '311525776757358592';
  blocks.push({
    id: `mock_home_block_${Date.now()}`,
    tabId,
    blockType: values.blockType,
    title: { en: values.title, zh: values.title },
    config: '{}',
    targetCountries: null,
    sortOrder: Number(values.sortOrder ?? blocks.length),
    status: values.status ?? 1,
    createdAt: now,
    updatedAt: now,
  });
  return { success: true };
}
