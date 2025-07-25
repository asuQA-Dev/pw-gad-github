import { prepareRandomArticle } from '@_src/factories/article.factory';
// import { expect, test } from '@_src/fixtures/merge.fixture';
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

    // await articlesPage.goto();
    // await articlesPage.addArticleButtonLogged.click();
    addArticleView = await articlesPage.clickAddArticleButton();

    await expect.soft(addArticleView.addNewHeader).toBeVisible();
  });

  test('user can access single article', { tag: '@GAD-R04-03, @logged' }, async ({ page }) => {
    // Arrange:
    const createdArticlePage = new ArticlePage(page);

    const articleData = prepareRandomArticle();
    await addArticleView.createArticle(articleData);
    await articlesPage.goto();

    // Act:
    await page.getByText(articleData.title).click();

    // Assert:
    await expect.soft(createdArticlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(createdArticlePage.articleBody).toHaveText(articleData.body);
  });

  test('Create new article', { tag: '@GAD-R04-01, @logged' }, async ({ page }) => {
    // Arrange:
    const createdArticlePage = new ArticlePage(page);
    const articleData = prepareRandomArticle();

    // Act:
    await addArticleView.createArticle(articleData);

    // Assert:
    await expect.soft(createdArticlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(createdArticlePage.articleBody).toHaveText(articleData.body);
  });

  test('reject new article with empty title', { tag: '@GAD-R04-01, @logged' }, async () => {
    // Arrange:
    const expectedAlertMessagePopup = 'Article was not created';
    const articleData = prepareRandomArticle();

    // Act:
    await addArticleView.addBodyInput.fill(articleData.body); // Create article with empty title
    await addArticleView.saveButton.click();

    // Assert:
    await expect(addArticleView.alertPopup).toHaveText(expectedAlertMessagePopup);
  });

  test('reject new article with empty body', { tag: '@GAD-R04-01, @logged' }, async () => {
    // Arrange:
    const expectedAlertMessagePopup = 'Article was not created';
    const articleData = prepareRandomArticle();
    articleData.body = '';

    // Act:
    await addArticleView.createArticle(articleData); // Create article with empty body
    // Assert:
    await expect(addArticleView.alertPopup).toHaveText(expectedAlertMessagePopup);
  });

  test.describe('Verify articles title length', () => {
    test('reject new article with title exceeding 129 signs', { tag: '@GAD-R04-02, @logged' }, async () => {
      // Arrange:
      const expectedAlertMessagePopup = 'Article was not created';
      const articleData = prepareRandomArticle(129);

      // Act:
      await addArticleView.createArticle(articleData); // Create article with 128 sign

      // Assert:
      await expect(addArticleView.alertPopup).toHaveText(expectedAlertMessagePopup);
    });
    test('create new article title with 128 signs', { tag: '@GAD-R04-02, @logged' }, async ({ page }) => {
      // Arrange:
      const articleData = prepareRandomArticle(128);
      const createdArticlePage = new ArticlePage(page);

      // Act:
      await addArticleView.createArticle(articleData); // Create article with 128 sign

      // Assert:
      await expect(createdArticlePage.articleTitle).toHaveText(articleData.title);
    });
  });
});
