import testData from '../source/testData.json';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

export interface OrderData {
  items: OrderItem[];
  recipientName: string;
  recipientPhone: string;
  address: string;
  paymentMethod: string;
  totalPrice: number;
}

export interface OrderDetailData {
  status: string;
  itemName: string;
  quantity: string;
  itemPrice: string;
  recipient: string;
  totalPrice: string;
  paymentMethod: string;
}

export const orderData: OrderData = testData.order;
export const orderDetailData: OrderDetailData = testData.orderDetail;
