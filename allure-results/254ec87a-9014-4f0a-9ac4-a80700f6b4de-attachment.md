# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verifyorder.spec.ts >> Verify Order Page >> Verify Order Details
- Location: tests\verifyorder.spec.ts:36:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.order-id')
Error: expected value must be a string or regular expression
Expected has value: undefined

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]: 🛍️
        - generic [ref=e8]: ShopVN
      - generic [ref=e9]:
        - link "👤 Xin chào, Nhu Test" [ref=e10] [cursor=pointer]:
          - /url: /profile
          - generic [ref=e11]: 👤
          - generic [ref=e12]:
            - text: Xin chào,
            - strong [ref=e13]: Nhu Test
        - button "📦 Đơn hàng" [active] [ref=e14] [cursor=pointer]
        - button "🛒" [ref=e15] [cursor=pointer]
        - button "Đăng xuất" [ref=e16] [cursor=pointer]
        - button "Switch to English" [ref=e17] [cursor=pointer]: 🇻🇳
  - generic [ref=e19]:
    - heading "Mua sắm thả ga 🎉" [level=1] [ref=e20]
    - paragraph [ref=e21]: Hàng ngàn sản phẩm chính hãng, giao hàng toàn quốc
    - button "Khám phá ngay" [ref=e22] [cursor=pointer]
  - main [ref=e23]:
    - heading "Sản phẩm nổi bật" [level=2] [ref=e24]
    - paragraph [ref=e25]: Đang tải sản phẩm...
  - contentinfo [ref=e26]:
    - paragraph [ref=e27]: © 2024 ShopVN. All rights reserved.
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
  51 |     await expect(locator).toHaveText(expectedText);
  52 |   }
  53 | 
  54 |   async verifyTexts(locator: Locator, expectedTexts: string[]): Promise<void> {
  55 |     await expect(locator).toHaveText(expectedTexts);
  56 |   }
  57 | 
  58 |   async verifyContainsText(locator: Locator, expectedText: string): Promise<void> {
> 59 |     await expect(locator).toContainText(expectedText);
     |                           ^ Error: expect(locator).toContainText(expected) failed
  60 |   }
  61 | 
  62 |   async verifyVisible(locator: Locator): Promise<void> {
  63 |     await expect(locator).toBeVisible();
  64 |   }
  65 | }
  66 | 
```