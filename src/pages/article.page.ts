import { MainMenuComponents } from '@_src/components/main-menu.components';
import { BasePage } from '@_src/pages/base.page';
import { AddCommentView } from '@_src/views/add-comment.view';
import { Locator, Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/articles.html';
  mainMenuComponents: MainMenuComponents;

  createdArticleTitle: Locator;
  createdArticleBody: Locator;
  addCommentButton: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenuComponents = new MainMenuComponents(page);

    this.createdArticleTitle = this.page.getByTestId('article-title');
    this.createdArticleBody = this.page.getByTestId('article-body');

    this.addCommentButton = this.page.locator('#add-new-comment');
  }

  async clickAddCommentButton(): Promise<AddCommentView> {
    await this.addCommentButton.click();
    return new AddCommentView(this.page);
  }
}
