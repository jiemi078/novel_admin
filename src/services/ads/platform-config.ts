import { createAdsMockService } from './mockService';

const service = createAdsMockService(
  [
    {
      id: '319051526108610560',
      appName: '香港好消息科技有限公司默认App',
      platformCode: 'facebook',
      platformAppId: '2362619284262025',
      platformAppSecret: '',
      businessId: '',
      accessToken: '******',
      apiVersion: 'v24.0',
      status: 1,
      createdAt: '2026-05-30 17:57:10',
      updatedAt: '2026-06-29 16:35:52',
    },
  ],
  'pf',
  (values, id) => ({
    id,
    appName: '香港好消息科技有限公司默认App',
    platformCode: String(values.platformCode || 'facebook'),
    platformAppId: String(values.platformAppId || ''),
    platformAppSecret: String(values.platformAppSecret || ''),
    businessId: String(values.businessId || ''),
    accessToken: '******',
    apiVersion: String(values.apiVersion || 'v24.0'),
    status: Number(values.status || 1),
    createdAt: String(values.createdAt || ''),
  }),
);

export const queryPlatformConfigPage = service.queryPage;
export const createPlatformConfig = service.createItem;
