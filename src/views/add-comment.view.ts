import { AddCommentModel } from '../models/comment.model';
import { Locator, Page } from '@playwright/test';

export class AddCommentView {
  addTitleInput: Locator;
  commentBody: Locator;
  saveButton: Locator;
  alertPopup: Locator;
  addNewHeader: Locator;
  constructor(private page: Page) {
    this.addTitleInput = this.page.getByTestId('title-input');

    this.commentBody = this.page.locator('#body');
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.alertPopup = this.page.getByTestId('alert-popup');
    this.addNewHeader = this.page.getByRole('heading', {
      name: 'Add New Comment',
    });
  }
  async createComment(commentData: AddCommentModel): Promise<void> {
    await this.commentBody.fill(commentData.body);
    await this.saveButton.click();
  }
}
