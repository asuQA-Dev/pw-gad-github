import { prepareRandomArticle } from '@_src/factories/article.factory';
import { prepareRandomComment } from '@_src/factories/comment.factory';
import { addArticleModel } from '@_src/models/article.model';
import { AddCommentModel } from '@_src/models/comment.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentPage } from '@_src/pages/comment.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Create and verify comment', () => {
  let articlePage: ArticlePage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  let articleData: addArticleModel;

  test.beforeEach(async ({ page }) => {
    articlePage = new ArticlePage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    articleData = prepareRandomArticle();

    await articlesPage.goto();

    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });

  test('Operate on comment', { tag: '@GAD-R06-01, @logged' }, async () => {
    // Arrange:
    const newCommentData = prepareRandomComment();

    await test.step('1. Create new comment', async () => {
      // Arrange:
      const expectedPopupTextCreated = 'Comment was created';
      const expectedAddCommentHeader = 'Add New Comment';

      // Act:
      const addCommentView = await articlePage.clickAddCommentButton();

      await expect.soft(addCommentView.addNewHeader).toHaveText(expectedAddCommentHeader);

      await addCommentView.createComment(newCommentData);

      // Assert:
      await expect.soft(addCommentView.alertPopup).toHaveText(expectedPopupTextCreated);
    });

    const commentPage: CommentPage = await test.step('2. Verify comment', async () => {
      // Act
      const articleComment = articlesPage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      // await articleComment.link.click();
      const commentPage = await articlesPage.clickCommentLink(articleComment.link);

      // Assert:
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
      return commentPage;
    });

    let editCommentData: AddCommentModel;
    await test.step('3. Update comment', async () => {
      // Act:
      const expectedPopupTextUpdated = 'Comment was updated';
      editCommentData = prepareRandomComment();

      // Act:
      const editCommentView = await commentPage.clickEditButton();
      await editCommentView.updateComment(editCommentData);

      // Assert:
      await expect.soft(commentPage.alertPopup).toHaveText(expectedPopupTextUpdated);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('4. Verify updated comment in article page', async () => {
      // Act:

      const articlesPage = await commentPage.clickReturnLink();
      const updatedCommentData = articlesPage.getArticleComment(editCommentData.body);
      // Assert:
      await expect(updatedCommentData.body).toHaveText(editCommentData.body);
    });
  });

  test('User can add more than one comment', { tag: '@GAD-R06-03, @logged' }, async () => {
    const secondCommentData = prepareRandomComment();

    await test.step('1. Create new comment', async () => {
      const expectedPopupTextCreated = 'Comment was created';

      const addCommentView = await articlePage.clickAddCommentButton();
      await addCommentView.createComment(secondCommentData);

      await expect.soft(addCommentView.alertPopup).toHaveText(expectedPopupTextCreated);
    });
    await test.step('2. Create and verify second comment', async () => {
      const secondCommentBody = await test.step('1-step create', async () => {
        const secondCommentData = prepareRandomComment();

        const addCommentView = await articlePage.clickAddCommentButton();
        await addCommentView.createComment(secondCommentData);

        return secondCommentData.body;
      });

      await test.step('2-step verify', async () => {
        const articleComment = articlesPage.getArticleComment(secondCommentBody);
        await expect(articleComment.body).toHaveText(secondCommentBody);

        const commentPage = await articlesPage.clickCommentLink(articleComment.link);

        await expect(commentPage.commentBody).toHaveText(secondCommentBody);
      });
    });
  });
});
