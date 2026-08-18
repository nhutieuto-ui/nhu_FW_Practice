import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly passwordInput: Locator;
  readonly loginSubmitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByTestId('login-username');
    this.passwordInput = page.getByTestId('login-password');
    this.loginSubmitButton = page.getByTestId('login-submit');
    // app renders this alert regardless of the selected UI language
    this.errorMessage = page.locator('.error-message[role="alert"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillText(this.username, username);
    await this.fillText(this.passwordInput, password);
    await this.clickElement(this.loginSubmitButton);
  }
}
