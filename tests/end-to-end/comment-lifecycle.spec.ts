import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { addArticleModel } from '../../src/models/article.model';
import { AddCommentModel } from '../../src/models/comment.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create and verify comment', () => {
  let loginPage: LoginPage;
  let articlePage: ArticlePage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let addCommentView: AddCommentView;
  let editCommentView: EditCommentView;
  let articleData: addArticleModel;
  let commentPage: CommentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlePage = new ArticlePage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    articleData = prepareRandomArticle();

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();

    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });

  test('Operate on comment', { tag: '@GAD-R06-01' }, async () => {
    // Arrange:
    const newCommentData = prepareRandomComment();

    await test.step('1. Create new comment', async () => {
      // Arrange:
      const expectedPopupTextCreated = 'Comment was created';
      const expectedAddCommentHeader = 'Add New Comment';

      // Act:
      await articlePage.addCommentButton.click();
      await expect
        .soft(addCommentView.addNewHeader)
        .toHaveText(expectedAddCommentHeader);

      await addCommentView.createComment(newCommentData);

      // Assert:
      await expect
        .soft(addCommentView.alertPopup)
        .toHaveText(expectedPopupTextCreated);
    });

    await test.step('2. Verify comment', async () => {
      // Act
      const articleComment = articlesPage.getArticleComment(
        newCommentData.body,
      );
      await expect(articleComment.body).toHaveText(newCommentData.body);
      await articleComment.link.click();

      // Assert:
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
    });

    let editCommentData: AddCommentModel;

    await test.step('3. Update comment', async () => {
      // Act:
      const expectedPopupTextUpdated = 'Comment was updated';
      editCommentData = prepareRandomComment();

      // Act:
      await commentPage.editButton.click();
      await editCommentView.updateComment(editCommentData);

      // Assert:
      await expect
        .soft(editCommentView.alertPopup)
        .toHaveText(expectedPopupTextUpdated);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('4. Verify updated comment in article page', async () => {
      // Act:
      await editCommentView.returnLink.click();
      const updatedCommentData = articlesPage.getArticleComment(
        editCommentData.body,
      );
      // Assert:
      await expect(updatedCommentData.body).toHaveText(editCommentData.body);
    });
  });

  test(
    'User can add more than one comment',
    { tag: '@GAD-R06-03' },
    async () => {
      const secondCommentData = prepareRandomComment();

      await test.step('1. Create new comment', async () => {
        const expectedPopupTextCreated = 'Comment was created';

        await articlePage.addCommentButton.click();
        await addCommentView.createComment(secondCommentData);

        await expect
          .soft(addCommentView.alertPopup)
          .toHaveText(expectedPopupTextCreated);
      });
      await test.step('2. Create and verify second comment', async () => {
        const secondCommentBody = await test.step('1-step create', async () => {
          const secondCommentData = prepareRandomComment();

          await articlePage.addCommentButton.click();
          await addCommentView.createComment(secondCommentData);

          return secondCommentData.body;
        });

        await test.step('2-step verify', async () => {
          const articleComment =
            articlesPage.getArticleComment(secondCommentBody);
          await expect(articleComment.body).toHaveText(secondCommentBody);
          await articleComment.link.click();

          await expect(commentPage.commentBody).toHaveText(secondCommentBody);
        });
      });
    },
  );
});
