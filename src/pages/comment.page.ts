import { MainMenuComponents } from '@_src/components/main-menu.components';
import { ArticlesPage } from '@_src/pages/articles.page';
import { BasePage } from '@_src/pages/base.page';
import { EditCommentView } from '@_src/views/edit-comment.view';
import { Locator, Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenuComponents: MainMenuComponents;

  commentBody: Locator;
  editButton: Locator;
  returnLink: Locator;
  alertPopup: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenuComponents = new MainMenuComponents(page);
    this.commentBody = this.page.getByTestId('comment-body');
    this.editButton = this.page.getByTestId('edit');
    this.returnLink = this.page.getByRole('link', {
      name: 'Return to Article...',
    });
    this.alertPopup = this.page.getByTestId('alert-popup');
  }
  async clickEditButton(): Promise<EditCommentView> {
    await this.editButton.click();
    return new EditCommentView(this.page);
  }
  async clickReturnLink(): Promise<ArticlesPage> {
    await this.returnLink.click();
    return new ArticlesPage(this.page);
  }
}
