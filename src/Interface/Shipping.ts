export interface Shipping {
  _id: string;
  id: number;
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  paidAt: string;
  paymentMethodType: string;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: any[];
}
