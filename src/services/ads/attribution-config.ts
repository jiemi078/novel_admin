import { createAdsMockService } from './mockService';

const service = createAdsMockService(
  [
    {
      id: '318699476413849600',
      appName: '香港好消息科技有限公司默认App',
      platform: 'h5',
      channel: 'fb',
      attributionWindow: 604800,
      matchTypes: ['pass_through', 'clipboard', 'google_referrer', 'ip_ua', 'h5_self_attributed'],
      priority: 0,
      isEnabled: 1,
      createdAt: '2026-05-29 18:37:56',
      updatedAt: '2026-05-29 18:37:56',
    },
  ],
  'attr',
  (values, id) => ({
    id,
    appName: '香港好消息科技有限公司默认App',
    platform: String(values.platform || 'h5'),
    channel: String(values.channel || 'fb'),
    attributionWindow: Number(values.attributionWindow || 604800),
    matchTypes: Array.isArray(values.matchTypes) ? (values.matchTypes as string[]) : [],
    priority: Number(values.priority || 0),
    isEnabled: Number(values.isEnabled || 1),
    createdAt: String(values.createdAt || ''),
  }),
);

export const queryAttributionConfigPage = service.queryPage;
export const createAttributionConfig = service.createItem;
