# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AddProductToCart\removeproductfromcart.spec.ts >> Remove Product To Cart >> user can remove multiple products from the cart
- Location: tests\AddProductToCart\removeproductfromcart.spec.ts:42:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('.item-name')
Timeout: 5000ms
- Expected  - 1
+ Received  + 1

  Array [
-   "Giày sneaker",
    "Túi xách nữ",
+   "Giày sneaker",
  ]

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.item-name')
    14 × locator resolved to 2 elements

```

# Page snapshot

```yaml
- generic [ref=f4e3]:
  - banner [ref=f4e4]:
    - generic [ref=f4e5]:
      - button "← Tiếp tục mua sắm" [ref=f4e6] [cursor=pointer]
      - generic [ref=f4e7]:
        - generic [ref=f4e8]: 🛍️
        - generic [ref=f4e9]: ShopVN
  - main [ref=f4e10]:
    - heading "Giỏ hàng của bạn (3)" [level=1] [ref=f4e11]
    - generic [ref=f4e12]:
      - generic [ref=f4e13]:
        - generic [ref=f4e14]:
          - generic [ref=f4e15]: 👜
          - generic [ref=f4e16]:
            - heading "Túi xách nữ" [level=3] [ref=f4e17]
            - paragraph
            - paragraph [ref=f4e18]: 349.000đ / cái
          - generic [ref=f4e19]:
            - button "−" [ref=f4e20] [cursor=pointer]
            - generic [ref=f4e21]: "2"
            - button "+" [ref=f4e22] [cursor=pointer]
          - generic [ref=f4e23]: 698.000đ
          - button "✕" [ref=f4e24] [cursor=pointer]
        - generic [ref=f4e25]:
          - generic [ref=f4e26]: 👟
          - generic [ref=f4e27]:
            - heading "Giày sneaker" [level=3] [ref=f4e28]
            - paragraph [ref=f4e29]: Giày dép
            - paragraph [ref=f4e30]: 599.000đ / cái
          - generic [ref=f4e31]:
            - button "−" [ref=f4e32] [cursor=pointer]
            - generic [ref=f4e33]: "1"
            - button "+" [ref=f4e34] [cursor=pointer]
          - generic [ref=f4e35]: 599.000đ
          - button "✕" [ref=f4e36] [cursor=pointer]
      - generic [ref=f4e37]:
        - heading "Tổng cộng" [level=2] [ref=f4e38]
        - generic [ref=f4e39]:
          - generic [ref=f4e40]: (3)
          - generic [ref=f4e41]: 1.297.000đ
        - generic [ref=f4e42]:
          - generic [ref=f4e43]: Phí vận chuyển
          - generic [ref=f4e44]: Miễn phí
        - generic [ref=f4e45]:
          - generic [ref=f4e46]: Tổng cộng
          - generic [ref=f4e47]: 1.297.000đ
        - button "Thanh toán ngay" [ref=f4e48] [cursor=pointer]
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
  41 |     }
  42 |   }
  43 | 
  44 |   async getText(locator: Locator): Promise<string> {
  45 |     return (await locator.textContent())?.trim() ?? '';
  46 |   }
  47 | 
  48 |   async verifyText(locator: Locator, expectedText: string): Promise<void> {
  49 |     await expect(locator).toHaveText(expectedText);
  50 |   }
  51 | 
  52 |   async verifyTexts(locator: Locator, expectedTexts: string[]): Promise<void> {
> 53 |     await expect(locator).toHaveText(expectedTexts);
     |                           ^ Error: expect(locator).toHaveText(expected) failed
  54 |   }
  55 | 
  56 |   async verifyContainsText(locator: Locator, expectedText: string): Promise<void> {
  57 |     await expect(locator).toContainText(expectedText);
  58 |   }
  59 | 
  60 |   async verifyVisible(locator: Locator): Promise<void> {
  61 |     await expect(locator).toBeVisible();
  62 |   }
  63 | }
  64 | 
```