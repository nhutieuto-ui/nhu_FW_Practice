import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  // Common locators visible across the app
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator('h1, h2').first();
  }

  // Navigate using playwright baseURL (set in playwright.config.ts)
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForLoadState(
    state: 'domcontentloaded' | 'load' | 'networkidle' = 'domcontentloaded'
  ): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  async fillText(locator: Locator, value: string): Promise<void> {
    await locator.clear();
    await locator.fill(value);
  }

  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  async clickMultipleTimes(locator: Locator, times: number): Promise<void> {
    for (let i = 0; i < times; i++) {
      await locator.click();
      // let the app's cart update round-trip settle before the next click, otherwise a stale read causes lost updates
      await this.page.waitForLoadState('networkidle');
    }
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }

  async verifyText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async verifyTexts(locator: Locator, expectedTexts: string[]): Promise<void> {
    await expect(locator).toHaveText(expectedTexts);
  }

  async verifyContainsText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }

  async verifyVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
