import { BasePage } from './base.page';
import { MainMenuComponents } from '@_src/components/main-menu.components';
import { Locator, Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenuComponents: MainMenuComponents;

  commentBody: Locator;
  editButton: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenuComponents = new MainMenuComponents(page);
    this.commentBody = this.page.getByTestId('comment-body');
    this.editButton = this.page.getByTestId('edit');
  }
}
