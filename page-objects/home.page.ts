import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { homeData } from "../core/utils/home.data";

export class HomePage extends BasePage {
  readonly sneakerProduct: Locator;
  readonly sneakerAddToCartButton: Locator;
  readonly cartButton: Locator;
  readonly ordersButton: Locator;

  constructor(page: Page) {
    super(page);

    this.sneakerProduct = page.getByText(homeData.products.sneaker, { exact: true });
    this.sneakerAddToCartButton = page.locator(".product-card").filter({ has: this.sneakerProduct }).getByRole("button", { name: /Thêm vào giỏ|Add to Cart/ });
    this.cartButton = page.locator("button.cart-btn");
    this.ordersButton = page.locator("button.orders-btn");
  }
  // Method to add a single product to the cart
  async addSingleProducttoCart(): Promise<void> {
    await this.sneakerAddToCartButton.click();
  }

  // Method to add the same product to the cart multiple times
  async addSameProductMultipleTimes(times: number): Promise<void> {
    await this.clickMultipleTimes(this.sneakerAddToCartButton, times);
  }

  private getAddToCartButton(productName: string): Locator {
    const product = this.page.getByText(productName, { exact: true });
    return this.page.locator(".product-card").filter({ has: product }).getByRole("button", { name: /Thêm vào giỏ|Add to Cart/ });
  }

  // Method to add any product (by name) to the cart
  async addProductToCart(productName: string): Promise<void> {
    await this.clickElement(this.getAddToCartButton(productName));
  }

  // Method to navigate to the cart page 

    async goToCart(): Promise<void> {
    await this.cartButton.click();
  }
  // Method to navigate to the orders page
  async goToOrders(): Promise<void> {
    await this.ordersButton.click();
  }


}