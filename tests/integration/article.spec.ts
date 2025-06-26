import { prepareRandomArticle } from '@_src/factories/article.factory';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();

    await expect.soft(addArticleView.addNewHeader).toBeVisible();
  });

  test(
    'user can access single article',
    { tag: '@GAD-R04-03, @logged' },
    async ({ page }) => {
      // Arrange:
      const createdArticlePage = new ArticlePage(page);

      const articleData = prepareRandomArticle();
      await addArticleView.createArticle(articleData);
      await articlesPage.goto();

      // Act:
      await page.getByText(articleData.title).click();

      // Assert:
      await expect
        .soft(createdArticlePage.createdArticleTitle)
        .toHaveText(articleData.title);
      await expect
        .soft(createdArticlePage.createdArticleBody)
        .toHaveText(articleData.body);
    },
  );

  test(
    'Create new article',
    { tag: '@GAD-R04-01, @logged' },
    async ({ page }) => {
      // Arrange:
      const createdArticlePage = new ArticlePage(page);
      const articleData = prepareRandomArticle();

      // Act:
      await addArticleView.createArticle(articleData);

      // Assert:
      await expect
        .soft(createdArticlePage.createdArticleTitle)
        .toHaveText(articleData.title);
      await expect
        .soft(createdArticlePage.createdArticleBody)
        .toHaveText(articleData.body);
    },
  );

  test(
    'reject new article with empty title',
    { tag: '@GAD-R04-01, @logged' },
    async () => {
      // Arrange:
      const expectedAlertMessagePopup = 'Article was not created';
      const articleData = prepareRandomArticle();

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
    { tag: '@GAD-R04-01, @logged' },
    async () => {
      // Arrange:
      const expectedAlertMessagePopup = 'Article was not created';
      const articleData = prepareRandomArticle();

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

  test.describe('Verify articles title length', () => {
    test(
      'reject new article with title exceeding 129 signs',
      { tag: '@GAD-R04-02, @logged' },
      async () => {
        // Arrange:
        const articleData = prepareRandomArticle(129);

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
      { tag: '@GAD-R04-02, @logged' },
      async ({ page }) => {
        // Arrange:
        const articleData = prepareRandomArticle(128);
        const createdArticlePage = new ArticlePage(page);

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
});
