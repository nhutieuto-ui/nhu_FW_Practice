import { APIRequestContext, expect } from '@playwright/test';

export class CleanupOrderApi {
  constructor(private request: APIRequestContext) {}

  //cleanup Order page before place new order
  async cleanupOrder(
    token: string
  )
  {
    const response = await this.request.delete(
      `${process.env.BASE_URL}/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
