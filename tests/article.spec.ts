import { randomArticle } from '../src/factories/article.factory';
import { CreateArticleModel } from '../src/models/article.model';
import { ArticlesPage } from '../src/pages/articles.page';
import { CreatedArticlesPage } from '../src/pages/created-article.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  let articleData: CreateArticleModel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();

    articleData = randomArticle();

    await expect.soft(addArticleView.header).toBeVisible();
  });

  test('Create new articles', { tag: '@GAD-R04-01' }, async ({ page }) => {
    // Arrange:
    const createdArticlePage = new CreatedArticlesPage(page);

    // Act:
    await addArticleView.createArticle(articleData);

    // Assert:
    await expect
      .soft(createdArticlePage.createdArticleTitle)
      .toHaveText(articleData.title);
    await expect
      .soft(createdArticlePage.createdArticleBody)
      .toHaveText(articleData.body);
  });

  test(
    'Create new articles with empty title',
    { tag: '@GAD-R04-01' },
    async () => {
      // Arrange:
      const expectedAlertMessagePopup = 'Article was not created';
      // Act:
      // Create article with empty title
      await addArticleView.addBodyInput.fill(articleData.body);
      await addArticleView.saveButton.click();

      // Assert:
      await expect(addArticleView.alertPopup).toHaveText(
        expectedAlertMessagePopup,
      );
    },
  );

  test(
    'Create new articles with empty body',
    { tag: '@GAD-R04-01' },
    async () => {
      // Arrange:
      const expectedAlertMessagePopup = 'Article was not created';
      articleData.body = '';

      // Act:
      // Create article with empty body
      await addArticleView.createArticle(articleData);

      // Assert:
      await expect(addArticleView.alertPopup).toHaveText(
        expectedAlertMessagePopup,
      );
    },
  );
});
