import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProfilePage extends BasePage {
  readonly fullNameInput: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByTestId('profile-name'); 
    this.saveButton = page.getByTestId('profile-save');        
    this.successMessage = page.getByTestId('profile-success'); 
  }

  async updateFullName(fullName: string): Promise<void> {
    await this.fillText(this.fullNameInput, fullName);
    await this.clickElement(this.saveButton);
  }
}