import { MainMenuComponents } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenuComponents: MainMenuComponents;

  addArticleButtonLogged: Locator;
  searchInput: Locator;
  searchButton: Locator;
  noResults: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenuComponents = new MainMenuComponents(page);
    this.addArticleButtonLogged = this.page.locator('#add-new');
    this.searchInput = this.page.getByTestId('search-input');
    this.searchButton = this.page.getByTestId('search-button');
    this.noResults = this.page.getByTestId('no-results');
  }

  async gotoArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }

  async deleteArticle(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
  }
}
