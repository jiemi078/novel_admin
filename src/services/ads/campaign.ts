import { createAdsMockService } from './mockService';

const service = createAdsMockService(
  [],
  'cmp',
  (values, id) => ({
    id,
    name: String(values.name || ''),
    platformCode: String(values.platformCode || 'facebook'),
    budget: Number(values.budget || 0),
    spend: Number(values.spend || 0),
    status: Number(values.status || 1),
  }),
);

export const queryCampaignPage = service.queryPage;
export const createCampaign = service.createItem;
