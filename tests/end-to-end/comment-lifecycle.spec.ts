import { prepareRandomArticle } from '../../src/factories/article.factory';
import { CreateArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create and verify comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: CreateArticleModel;
  let createdArticlePage: ArticlePage;
  let addCommentView: AddCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    createdArticlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);

    articleData = prepareRandomArticle();

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();

    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });

  test('Create new comment', { tag: '@GAD-R06-01' }, async () => {
    // Arrange:
    const commentText = 'czary mary hokus pokus';
    const expectedPopupText = 'Comment was created';
    const expectedAddCommentHeader = 'Add New Comment';

    // Act:
    await createdArticlePage.addCommentButton.click();
    await expect(addCommentView.addNewHeader).toHaveText(
      expectedAddCommentHeader,
    );
    await addCommentView.createComment(commentText);

    // Assert:
    await expect(addCommentView.alertPopup).toHaveText(expectedPopupText);
  });
});
