import { MainMenuComponents } from '@_src/components/main-menu.components';
import { ArticlePage } from '@_src/pages/article.page';
import { BasePage } from '@_src/pages/base.page';
import { AddArticleView } from '@_src/views/add-article.view';
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

  async gotoArticle(title: string): Promise<ArticlePage> {
    await this.page.getByText(title).click();
    return new ArticlePage(this.page);
  }
  async clickAddArticleButton(): Promise<AddArticleView> {
    await this.addArticleButtonLogged.click();
    return new AddArticleView(this.page);
  }
}
