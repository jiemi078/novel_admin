export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'renew_failed';

export type SubscriptionItem = {
  id: string;
  userId: string;
  productName: string;
  period: '月订阅' | '年订阅';
  status: SubscriptionStatus;
  paymentChannel: 'Stripe' | 'Apple' | 'Google Play' | 'PayPal';
  amount: number;
  currency: string;
  startedAt: string;
  expiredAt: string;
  renewedAt?: string;
};

export type SubscriptionPageParams = {
  current?: number;
  pageSize?: number;
  userId?: string;
  productName?: string;
  period?: string;
  status?: SubscriptionStatus;
  paymentChannel?: string;
};
