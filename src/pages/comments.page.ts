import { BasePage } from './base.page';
import { MainMenuComponents } from '@_src/components/main-menu.components';
import { Page } from '@playwright/test';

export class CommentsPage extends BasePage {
  url = '/comments.html';

  mainMenuComponents: MainMenuComponents;

  constructor(page: Page) {
    super(page);
    this.mainMenuComponents = new MainMenuComponents(page);
  }
}
