import type {
  PaymentOrderItem,
  PaymentOrderPageParams,
} from '@/pages/novel-transaction/orders/types';

const mockOrders: PaymentOrderItem[] = [
  {
    id: '340910687940943872',
    orderNo: 'NO202607070001',
    userId: '311520572125220864',
    userRegisteredAt: '2026-07-01 10:12:31',
    system: 'iOS',
    paymentChannel: 'Stripe',
    productName: '7998Coins',
    productType: 'coin',
    orderStatus: 'paid',
    amount: 19.99,
    currency: 'USD',
    thirdPartyOrderId: 'pi_3QxMock001',
    createdAt: '2026-07-07 09:35:12',
    paidAt: '2026-07-07 09:35:28',
  },
  {
    id: '340910687940943873',
    orderNo: 'NO202607070002',
    userId: '311520572125220865',
    userRegisteredAt: '2026-06-28 18:22:09',
    system: 'Android',
    paymentChannel: 'Google Play',
    productName: 'Monthly Premium',
    productType: 'subscription',
    orderStatus: 'paid',
    amount: 9.99,
    currency: 'USD',
    thirdPartyOrderId: 'GPA.3381-0001-0002-00003',
    createdAt: '2026-07-07 10:01:45',
    paidAt: '2026-07-07 10:02:03',
  },
  {
    id: '340910687940943874',
    orderNo: 'NO202607070003',
    userId: '311520572125220866',
    userRegisteredAt: '2026-07-03 08:04:52',
    system: 'iOS',
    paymentChannel: 'Apple',
    productName: '5500 Coins',
    productType: 'coin',
    orderStatus: 'pending',
    amount: 12.99,
    currency: 'USD',
    thirdPartyOrderId: 'apple_txn_mock_003',
    createdAt: '2026-07-07 10:18:11',
  },
  {
    id: '340910687940943875',
    orderNo: 'NO202607070004',
    userId: '311520572125220867',
    userRegisteredAt: '2026-06-20 21:11:30',
    system: 'Web',
    paymentChannel: 'PayPal',
    productName: '990Coins',
    productType: 'coin',
    orderStatus: 'failed',
    amount: 2.99,
    currency: 'USD',
    thirdPartyOrderId: 'PAYID-MOCK-004',
    createdAt: '2026-07-07 10:30:44',
  },
  {
    id: '340910687940943876',
    orderNo: 'NO202607070005',
    userId: '311520572125220868',
    userRegisteredAt: '2026-06-18 12:07:18',
    system: 'iOS',
    paymentChannel: 'Stripe',
    productName: 'Yearly Premium',
    productType: 'subscription',
    orderStatus: 'refunded',
    amount: 79.99,
    currency: 'USD',
    thirdPartyOrderId: 'pi_3QxMock005',
    createdAt: '2026-07-06 22:14:17',
    paidAt: '2026-07-06 22:14:31',
  },
];

const includes = (source: string | undefined, keyword: string | undefined) => {
  const value = String(keyword || '').trim().toLowerCase();
  if (!value) return true;
  return String(source || '').toLowerCase().includes(value);
};

const inRange = (source: string | undefined, range: [string, string] | undefined) => {
  if (!range?.[0] || !range?.[1] || !source) return true;
  const time = new Date(source).getTime();
  return time >= new Date(range[0]).getTime() && time <= new Date(range[1]).getTime();
};

export async function queryPaymentOrderPage(params: PaymentOrderPageParams) {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);

  const filtered = mockOrders.filter((item) => {
    if (!includes(item.userId, params.userId)) return false;
    if (params.system && item.system !== params.system) return false;
    if (params.paymentChannel && item.paymentChannel !== params.paymentChannel) return false;
    if (params.orderStatus && item.orderStatus !== params.orderStatus) return false;
    if (!includes(item.orderNo, params.orderNo)) return false;
    if (!includes(item.thirdPartyOrderId, params.thirdPartyOrderId)) return false;
    if (params.coinProduct && item.productType === 'coin' && !includes(item.productName, params.coinProduct)) {
      return false;
    }
    if (
      params.subscriptionProduct &&
      item.productType === 'subscription' &&
      !includes(item.productName, params.subscriptionProduct)
    ) {
      return false;
    }
    if (!inRange(item.createdAt, params.createdAt)) return false;
    if (!inRange(item.paidAt, params.paidAt)) return false;
    return true;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
}
