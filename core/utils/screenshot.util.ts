import { Page } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { ContentType } from 'allure-js-commons';

export async function attachScreenshot(page: Page, name: string): Promise<void> {
  const screenshot = await page.screenshot();
  await allure.attachment(name, screenshot, ContentType.PNG);
}
