import { addArticleModel } from '@_src/models/article.model';
import { Locator, Page } from '@playwright/test';

export class AddArticleView {
  addTitleInput: Locator;
  addBodyInput: Locator;
  saveButton: Locator;
  addNewHeader: Locator;
  alertPopup: Locator;

  constructor(private page: Page) {
    this.addTitleInput = this.page.getByTestId('title-input');
    this.addBodyInput = this.page.getByTestId('body-text');
    this.saveButton = this.page.getByTestId('save');
    this.addNewHeader = this.page.getByRole('heading', {
      name: 'Add New Entry',
    });
    this.alertPopup = this.page.getByTestId('alert-popup');
  }

  async createArticle(createArticle: addArticleModel): Promise<void> {
    await this.addTitleInput.fill(createArticle.title);
    await this.addBodyInput.fill(createArticle.body);
    await this.saveButton.click();
  }
}
