import { AddCommentModel } from '../models/comment.model';
import { Locator, Page } from '@playwright/test';

export class EditCommentView {
  bodyInput: Locator;
  updateButton: Locator;
  alertPopup: Locator;
  returnLink: Locator;

  constructor(private page: Page) {
    this.bodyInput = this.page.getByTestId('body-input');

    this.updateButton = this.page.getByRole('button', { name: 'Update' });
    this.returnLink = this.page.getByRole('link', {
      name: 'Return to Article...',
    });
    this.alertPopup = this.page.getByTestId('alert-popup');
  }
  async updateComment(commentData: AddCommentModel): Promise<void> {
    await this.bodyInput.fill(commentData.body);
    await this.updateButton.click();
  }
}
