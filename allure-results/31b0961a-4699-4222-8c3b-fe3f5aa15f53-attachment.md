# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: updatefullname.spec.ts >> Update Full Name >> user can update full name on profile page
- Location: tests\updatefullname.spec.ts:17:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(received).toBeTruthy()

Received: false
```

```
Error: locator.clear: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('profile-name')

```

# Page snapshot

```yaml
- generic [ref=f1e4]:
  - button "Switch to English" [ref=f1e6] [cursor=pointer]: 🇻🇳
  - generic [ref=f1e7]:
    - generic [ref=f1e8]: 🛍️
    - heading "ShopVN" [level=1] [ref=f1e9]
  - heading "Đăng nhập" [level=2] [ref=f1e10]
  - paragraph [ref=f1e11]: Đăng nhập — ShopVN
  - generic [ref=f1e12]:
    - generic [ref=f1e13]:
      - generic [ref=f1e14]: Tài khoản
      - textbox "Tài khoản" [ref=f1e15]
    - generic [ref=f1e16]:
      - generic [ref=f1e17]: Mật khẩu
      - textbox "Mật khẩu" [ref=f1e18]
    - button "Đăng nhập" [ref=f1e19] [cursor=pointer]
  - paragraph [ref=f1e20]:
    - text: "Demo:"
    - strong [ref=f1e21]: admin
    - text: /
    - strong [ref=f1e22]: password123
  - paragraph [ref=f1e23]:
    - text: Chưa có tài khoản?
    - link "Đăng ký" [ref=f1e24] [cursor=pointer]:
      - /url: /register
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
> 30 |     await locator.clear();
     |                   ^ Error: locator.clear: Test timeout of 30000ms exceeded.
  31 |     await locator.fill(value);
  32 |   }
  33 | 
  34 |   async clickElement(locator: Locator): Promise<void> {
  35 |     await locator.click();
  36 |   }
  37 | 
  38 | 
  39 | async getText(locator: Locator): Promise<string> {
  40 |   return (await locator.textContent())?.trim() ?? '';
  41 | }
  42 | }
  43 | 
```