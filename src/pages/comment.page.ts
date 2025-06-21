import { MainMenuComponents } from '../components/main-menu.components';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenuComponents: MainMenuComponents;

  commentBody: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenuComponents = new MainMenuComponents(page);
    this.commentBody = this.page.getByTestId('comment-body');
  }
}
