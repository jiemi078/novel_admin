import type {
  NovelBenefitCreateValues,
  NovelBenefitItem,
  NovelBenefitPageParams,
} from '@/pages/novel/benefit/types';

const rows: NovelBenefitItem[] = [
  {
    id: '317602505192120320',
    appId: '311520262971461633',
    contentType: 2,
    appName: '香港好消息科技有限公司默认App',
    type: 1,
    name: 'Ad-free, Pure Reading Experience',
    description: '',
    iconUrl: '',
    iconKey: '',
    status: 1,
  },
  {
    id: '317599930560565248',
    appId: '311520262971461633',
    contentType: 2,
    appName: '香港好消息科技有限公司默认App',
    type: 1,
    name: 'Cancel anytime, no hidden fees.',
    description: '',
    iconUrl: '',
    iconKey: '',
    status: 1,
  },
  {
    id: '317599842371117056',
    appId: '311520262971461633',
    contentType: 2,
    appName: '香港好消息科技有限公司默认App',
    type: 1,
    name: 'All short stories are completely free.',
    description: '',
    iconUrl: '',
    iconKey: '',
    status: 1,
  },
];

export async function queryNovelBenefitPage(params: NovelBenefitPageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const keyword = String(params.keyword || '').trim().toLowerCase();
  const filtered = rows.filter((item) => {
    if (params.type && item.type !== Number(params.type)) return false;
    if (params.status !== undefined && item.status !== Number(params.status)) return false;
    if (!keyword) return true;
    return item.id.toLowerCase().includes(keyword) || item.name.toLowerCase().includes(keyword);
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}

export async function createNovelBenefit(values: NovelBenefitCreateValues) {
  rows.unshift({
    id: `mock_benefit_${Date.now()}`,
    appId: '311520262971461633',
    contentType: 2,
    appName: '香港好消息科技有限公司默认App',
    type: values.type,
    name: values.name,
    description: values.description || '',
    iconUrl: values.iconUrl || '',
    iconKey: values.iconUrl || '',
    status: values.status ?? 1,
  });
  return { success: true };
}
