import { MainMenuComponents } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenuComponents: MainMenuComponents;

  addArticleButtonLogged: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenuComponents = new MainMenuComponents(page);
    this.addArticleButtonLogged = this.page.locator('#add-new');
  }

  async gotoArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }
}
