import { APIRequestContext, expect } from '@playwright/test';
import { orderData, OrderItem } from '../utils/order.data';

export class PlaceOrderApi {
  constructor(private request: APIRequestContext) {}

  async PlaceOrder(
    token: string,
    items: OrderItem[] = orderData.items,
    recipientName: string = orderData.recipientName,
    recipientPhone: string = orderData.recipientPhone,
    address: string = orderData.address,
    paymentMethod: string = orderData.paymentMethod,
    totalPrice: number = orderData.totalPrice
  ) {
    const response = await this.request.post(
      `${process.env.BASE_URL}/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          items,
          recipientName,
          recipientPhone,
          address,
          paymentMethod,
          totalPrice,
        },
      }
    );
    // Assert that the response status is 201 (Created)
    expect(response.status()).toBe(201);

    // API returns the created order's id in the "id" field
    const { id } = await response.json();
    return id;
  }
}
