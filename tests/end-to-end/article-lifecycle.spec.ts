import { prepareRandomArticle } from '../../src/factories/article.factory';
import { addArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { AddArticleView } from '../../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create and verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: addArticleModel;
  let createdArticlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    createdArticlePage = new ArticlePage(page);

    await articlesPage.goto();
  });

  test('Create new article', { tag: '@GAD-R04-01, @logged' }, async () => {
    // Arrange:
    articleData = prepareRandomArticle();

    // Act:
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.addNewHeader).toBeVisible();
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
    'user can access single article',
    { tag: '@GAD-R04-03, @logged' },
    async () => {
      // Arrange:

      // Act:
      await articlesPage.gotoArticle(articleData.title);

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
    'user can delete his own article',
    { tag: '@GAD-R04-04, @logged' },
    async () => {
      // Arrange:
      const expectedToContainTitle = 'Article';
      const expectedToHaveText = 'No data';
      await articlesPage.gotoArticle(articleData.title);

      // Act:
      await articlesPage.deleteArticle();

      // Assert:
      await createdArticlePage.waitForPageLoadToUrl();
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedToContainTitle);

      await articlesPage.searchInput.fill(articleData.title);
      await articlesPage.searchButton.click();
      await expect(articlesPage.noResults).toHaveText(expectedToHaveText);
    },
  );
});
