# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Checkout.spec.ts >> Checkout Process >> should complete the checkout process successfully
- Location: tests\Checkout.spec.ts:15:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('checkout-success-heading')
Expected: "Order Placed Successfully!"
Received: "Đặt hàng thành công!"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('checkout-success-heading')
    10 × locator resolved to <h2 data-testid="checkout-success-heading">Đặt hàng thành công!</h2>
       - unexpected value "Đặt hàng thành công!"

```

```yaml
- heading "Đặt hàng thành công!" [level=2]
```

# Test source

```ts
  1  | import { Locator, Page, expect } from '@playwright/test';
  2  | 
  3  | export class BasePage {
  4  |   protected readonly page: Page;
  5  | 
  6  |   // Common locators visible across the app
  7  |   readonly pageHeading: Locator;
  8  | 
  9  |   constructor(page: Page) {
  10 |     this.page = page;
  11 |     this.pageHeading = page.locator('h1, h2').first();
  12 |   }
  13 | 
  14 |   // Navigate using playwright baseURL (set in playwright.config.ts)
  15 |   async goto(path: string = '/') {
  16 |     await this.page.goto(path);
  17 |   }
  18 | 
  19 |   async getTitle(): Promise<string> {
  20 |     return this.page.title();
  21 |   }
  22 | 
  23 |   async waitForLoadState(
  24 |     state: 'domcontentloaded' | 'load' | 'networkidle' = 'domcontentloaded'
  25 |   ): Promise<void> {
  26 |     await this.page.waitForLoadState(state);
  27 |   }
  28 | 
  29 |   async fillText(locator: Locator, value: string): Promise<void> {
  30 |     await locator.clear();
  31 |     await locator.fill(value);
  32 |   }
  33 | 
  34 |   async clickElement(locator: Locator): Promise<void> {
  35 |     await locator.click();
  36 |   }
  37 | 
  38 |   async clickMultipleTimes(locator: Locator, times: number): Promise<void> {
  39 |     for (let i = 0; i < times; i++) {
  40 |       await locator.click();
  41 |       // let the app's cart update round-trip settle before the next click, otherwise a stale read causes lost updates
  42 |       await this.page.waitForLoadState('networkidle');
  43 |     }
  44 |   }
  45 | 
  46 |   async getText(locator: Locator): Promise<string> {
  47 |     return (await locator.textContent())?.trim() ?? '';
  48 |   }
  49 | 
  50 |   async verifyText(locator: Locator, expectedText: string): Promise<void> {
> 51 |     await expect(locator).toHaveText(expectedText);
     |                           ^ Error: expect(locator).toHaveText(expected) failed
  52 |   }
  53 | 
  54 |   async verifyTexts(locator: Locator, expectedTexts: string[]): Promise<void> {
  55 |     await expect(locator).toHaveText(expectedTexts);
  56 |   }
  57 | 
  58 |   async verifyContainsText(locator: Locator, expectedText: string): Promise<void> {
  59 |     await expect(locator).toContainText(expectedText);
  60 |   }
  61 | 
  62 |   async verifyVisible(locator: Locator): Promise<void> {
  63 |     await expect(locator).toBeVisible();
  64 |   }
  65 | }
  66 | 
```