import { createAdsMockService } from './mockService';

const service = createAdsMockService(
  [
    {
      id: '330983388477403136',
      appName: '香港好消息科技有限公司默认App',
      platformCode: 'facebook',
      pixelId: '2189307364926269',
      pixelName: 'SuperPixel_V3_By_JsonXu',
      accessToken: '******',
      investType: 'w2a',
      excludedEvents: '',
      status: 1,
      createdAt: '2026-07-02 16:09:49',
      updatedAt: '2026-07-02 16:14:21',
    },
    {
      id: '317843939778383872',
      appName: '香港好消息科技有限公司默认App',
      platformCode: 'facebook',
      pixelId: '1398775825102887',
      pixelName: 'KoalaNovelPixel-LH',
      accessToken: '******',
      investType: 'w2a',
      excludedEvents: '',
      status: 1,
      createdAt: '2026-05-27 09:58:20',
      updatedAt: '2026-06-29 16:34:17',
    },
  ],
  'px',
  (values, id) => ({
    id,
    appName: '香港好消息科技有限公司默认App',
    platformCode: String(values.platformCode || 'facebook'),
    pixelId: String(values.pixelId || ''),
    pixelName: String(values.pixelName || ''),
    accessToken: '******',
    investType: String(values.investType || 'w2a'),
    excludedEvents: String(values.excludedEvents || ''),
    status: Number(values.status || 1),
    createdAt: String(values.createdAt || ''),
  }),
);

export const queryPixelPage = service.queryPage;
export const createPixel = service.createItem;
