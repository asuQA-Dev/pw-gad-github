import { randomArticle } from '../../src/factories/article.factory';
import { CreateArticleModel } from '../../src/models/article.model';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CreatedArticlesPage } from '../../src/pages/created-article.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create and verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: CreateArticleModel;
  let createdArticlePage: CreatedArticlesPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    createdArticlePage = new CreatedArticlesPage(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
  });

  test('Create new article', { tag: '@GAD-R04-01' }, async () => {
    // Arrange:
    articleData = randomArticle();

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

  test('user can access single article', { tag: '@GAD-R04-03' }, async () => {
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
  });
  test('user can delete his own article', { tag: '@GAD-R04-04' }, async () => {
    // Arrange:
    await articlesPage.gotoArticle(articleData.title);
    articlesPage.deleteArticle();

    // Act:
    await createdArticlePage.deleteIcon.click();

    // Assert:
    await createdArticlePage.waitForPageLoadToUrl();
    const title = await articlesPage.title();
    expect(title).toContain('Article');

    await articlesPage.searchInput.fill(articleData.title);
    await articlesPage.searchButton.click();
    await expect(articlesPage.noResults).toHaveText('No data');
  });
});
