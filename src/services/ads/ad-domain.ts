import { createAdsMockService } from './mockService';

const service = createAdsMockService(
  [
    {
      id: '311526930052546560',
      appName: '香港好消息科技有限公司默认App',
      name: 'H5小说网站',
      url: 'https://novel.iquickfic.com',
      status: 1,
      createdAt: '2026-05-09 23:36:48',
      updatedAt: '2026-05-09 23:36:48',
    },
  ],
  'domain',
  (values, id) => ({
    id,
    appName: '香港好消息科技有限公司默认App',
    name: String(values.name || ''),
    url: String(values.url || ''),
    status: Number(values.status || 1),
    createdAt: String(values.createdAt || ''),
  }),
);

export const queryAdDomainPage = service.queryPage;
export const createAdDomain = service.createItem;
