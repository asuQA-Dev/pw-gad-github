import { randomArticle } from '../src/factories/article.factory';
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

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();

    await expect.soft(addArticleView.header).toBeVisible();
  });

  test('Create new article', { tag: '@GAD-R04-01' }, async ({ page }) => {
    // Arrange:
    const createdArticlePage = new CreatedArticlesPage(page);
    const articleData = randomArticle();

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
    'reject new article with empty title',
    { tag: '@GAD-R04-01' },
    async () => {
      // Arrange:
      const expectedAlertMessagePopup = 'Article was not created';
      const articleData = randomArticle();

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
    'reject new article with empty body',
    { tag: '@GAD-R04-01' },
    async () => {
      // Arrange:
      const expectedAlertMessagePopup = 'Article was not created';
      const articleData = randomArticle();

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
  test(
    'reject new article with title exceeding 129 signs',
    { tag: '@GAD-R04-02' },
    async () => {
      // Arrange:
      const articleData = randomArticle(129);

      const expectedAlertMessagePopup = 'Article was not created';

      // Act:
      // Create article with 128 sign
      await addArticleView.createArticle(articleData);

      // Assert:
      await expect(addArticleView.alertPopup).toHaveText(
        expectedAlertMessagePopup,
      );
    },
  );
  test(
    'create new article title with 128 signs',
    { tag: '@GAD-R04-02' },
    async ({ page }) => {
      // Arrange:
      const articleData = randomArticle(128);
      const createdArticlePage = new CreatedArticlesPage(page);

      // Act:
      // Create article with 128 sign
      await addArticleView.createArticle(articleData);

      // Assert:
      await expect(createdArticlePage.createdArticleTitle).toHaveText(
        articleData.title,
      );
    },
  );
});
