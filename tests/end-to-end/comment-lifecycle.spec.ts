import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { addArticleModel } from '../../src/models/article.model';
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
  let articleData: addArticleModel;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

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

  test('Create new comment', { tag: '@GAD-R06-01' }, async () => {
    // Create new comment
    // Arrange:
    const expectedPopupTextCreated = 'Comment was created';
    const expectedAddCommentHeader = 'Add New Comment';
    const newCommentData = prepareRandomComment();

    // Act:
    await articlePage.addCommentButton.click();
    await expect(addCommentView.addNewHeader).toHaveText(
      expectedAddCommentHeader,
    );
    await addCommentView.createComment(newCommentData);

    // Assert:
    await expect(addCommentView.alertPopup).toHaveText(
      expectedPopupTextCreated,
    );

    // Verify comment:
    // Act
    const articleComment = articlesPage.getArticleComment(newCommentData.body);

    await expect(articleComment.body).toHaveText(newCommentData.body);
    await articleComment.link.click();

    await expect(commentPage.commentBody).toHaveText(newCommentData.body);

    // Edit comment
    //Act:
    const editCommentData = prepareRandomComment();
    const expectedPopupTextUpdated = 'Comment was updated';

    await commentPage.editButton.click();

    await editCommentView.updateComment(editCommentData);

    await expect(editCommentView.alertPopup).toHaveText(
      expectedPopupTextUpdated,
    );
    await expect(commentPage.commentBody).toHaveText(editCommentData.body);

    await editCommentView.returnLink.click();
    const updatedCommentData = articlesPage.getArticleComment(
      editCommentData.body,
    );
    await expect(updatedCommentData.body).toHaveText(editCommentData.body);
  });
});
