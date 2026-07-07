export type PaymentOrderStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export type PaymentOrderItem = {
  id: string;
  orderNo: string;
  userId: string;
  userRegisteredAt: string;
  system: 'iOS' | 'Android' | 'Web';
  paymentChannel: 'Stripe' | 'Apple' | 'Google Play' | 'PayPal';
  productName: string;
  productType: 'coin' | 'subscription';
  orderStatus: PaymentOrderStatus;
  amount: number;
  currency: string;
  thirdPartyOrderId: string;
  createdAt: string;
  paidAt?: string;
};

export type PaymentOrderPageParams = {
  current?: number;
  pageSize?: number;
  userId?: string;
  system?: string;
  coinProduct?: string;
  subscriptionProduct?: string;
  orderNo?: string;
  thirdPartyOrderId?: string;
  orderStatus?: PaymentOrderStatus;
  paymentChannel?: string;
  createdAt?: [string, string];
  paidAt?: [string, string];
};
