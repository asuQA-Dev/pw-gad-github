import { Locator, Page } from '@playwright/test';

export class AddArticleView {
  addTitleInput: Locator;
  addBodyInput: Locator;
  saveButton: Locator;
  header: Locator;

  constructor(private page: Page) {
    this.addTitleInput = this.page.getByTestId('title-input');
    this.addBodyInput = this.page.getByTestId('body-text');
    this.saveButton = this.page.getByTestId('save');
    this.header = this.page.getByRole('heading', { name: 'Add New Entry' });
  }
}
