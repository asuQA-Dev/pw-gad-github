import { MainMenuComponents } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class CreatedArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenuComponents: MainMenuComponents;

  createdArticleTitle: Locator;
  createdArticleBody: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenuComponents = new MainMenuComponents(page);

    this.createdArticleTitle = this.page.getByTestId('article-title');
    this.createdArticleBody = this.page.getByTestId('article-body');
  }
}
