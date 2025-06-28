import { Page } from '@playwright/test';

export class BasePage {
  url = '';

  constructor(protected page: Page) {}

  async goto(parameters = ''): Promise<void> {
    await this.page.goto(`${this.url}${parameters}`);
  }
  async getTitle(): Promise<string> {
    await this.page.waitForLoadState();
    return this.page.title();
  }
  async waitForPageLoadToUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }
}
