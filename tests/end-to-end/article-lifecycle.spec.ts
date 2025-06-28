import { prepareRandomArticle } from '@_src/factories/article.factory';
import { addArticleModel } from '@_src/models/article.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create and verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: addArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);

    await articlesPage.goto();
  });

  test('Create new article', { tag: '@GAD-R04-01, @logged' }, async () => {
    // Arrange:
    articleData = prepareRandomArticle();

    // Act:
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.addNewHeader).toBeVisible();
    const articlePage = await addArticleView.createArticle(articleData);

    // Assert:
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
  });

  test('user can access single article', { tag: '@GAD-R04-03, @logged' }, async () => {
    // Arrange:

    // Act:
    await articlesPage.gotoArticle(articleData.title);

    // Assert:
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
  });
  test('user can delete his own article', { tag: '@GAD-R04-04, @logged' }, async () => {
    // Arrange:
    const expectedToContainTitle = 'Article';
    const expectedToHaveText = 'No data';
    await articlesPage.gotoArticle(articleData.title);

    // Act:
    articlesPage = await articlePage.deleteArticle();

    // Assert:
    await articlesPage.waitForPageLoadToUrl();
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedToContainTitle);

    await articlesPage.searchInput.fill(articleData.title);
    await articlesPage.searchButton.click();
    await expect(articlesPage.noResults).toHaveText(expectedToHaveText);
  });
});
