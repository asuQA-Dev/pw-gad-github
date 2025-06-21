import { MainMenuComponents } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

interface ArticleComment {
  body: Locator;
  link: Locator;
}

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenuComponents: MainMenuComponents;

  addArticleButtonLogged: Locator;
  searchInput: Locator;
  searchButton: Locator;
  noResults: Locator;
  deleteIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenuComponents = new MainMenuComponents(page);
    this.addArticleButtonLogged = this.page.locator('#add-new');
    this.searchInput = this.page.getByTestId('search-input');
    this.searchButton = this.page.getByTestId('search-button');
    this.noResults = this.page.getByTestId('no-results');
    this.deleteIcon = this.page.getByTestId('delete');
  }

  async gotoArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }

  async deleteArticle(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    this.deleteIcon.click();
  }

  getArticleComment(body: string): ArticleComment {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: body });

    return {
      body: commentContainer.locator(':text("comment:") + span'),
      link: commentContainer.locator('[id^="gotoComment"]'),
    };
  }
}
