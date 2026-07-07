import type {
  SubscriptionItem,
  SubscriptionPageParams,
} from '@/pages/novel-transaction/subscriptions/types';

const mockSubscriptions: SubscriptionItem[] = [
  {
    id: 'sub_3409100001',
    userId: '311520572125220865',
    productName: 'Monthly Premium',
    period: '月订阅',
    status: 'active',
    paymentChannel: 'Google Play',
    amount: 9.99,
    currency: 'USD',
    startedAt: '2026-07-07 10:02:03',
    expiredAt: '2026-08-07 10:02:03',
    renewedAt: '2026-07-07 10:02:03',
  },
  {
    id: 'sub_3409100002',
    userId: '311520572125220868',
    productName: 'Yearly Premium',
    period: '年订阅',
    status: 'cancelled',
    paymentChannel: 'Stripe',
    amount: 79.99,
    currency: 'USD',
    startedAt: '2026-06-06 22:14:31',
    expiredAt: '2027-06-06 22:14:31',
  },
  {
    id: 'sub_3409100003',
    userId: '311520572125220870',
    productName: 'Monthly Premium',
    period: '月订阅',
    status: 'renew_failed',
    paymentChannel: 'Apple',
    amount: 9.99,
    currency: 'USD',
    startedAt: '2026-06-01 08:30:00',
    expiredAt: '2026-07-01 08:30:00',
  },
  {
    id: 'sub_3409100004',
    userId: '311520572125220871',
    productName: 'Monthly Premium',
    period: '月订阅',
    status: 'expired',
    paymentChannel: 'PayPal',
    amount: 9.99,
    currency: 'USD',
    startedAt: '2026-05-15 19:20:11',
    expiredAt: '2026-06-15 19:20:11',
  },
];

const includes = (source: string | undefined, keyword: string | undefined) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

export async function querySubscriptionPage(params: SubscriptionPageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const filtered = mockSubscriptions.filter((item) => {
    if (!includes(item.userId, params.userId)) return false;
    if (!includes(item.productName, params.productName)) return false;
    if (params.period && item.period !== params.period) return false;
    if (params.status && item.status !== params.status) return false;
    if (params.paymentChannel && item.paymentChannel !== params.paymentChannel) return false;
    return true;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}
