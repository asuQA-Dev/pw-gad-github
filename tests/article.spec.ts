import { randomArticle } from '../src/factories/article.factory';
import { ArticlesPage } from '../src/pages/articles.page';
import { CreatedArticlesPage } from '../src/pages/created-article.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  test('Create new articles', { tag: '@GAD-R04-01' }, async ({ page }) => {
    // Arrange:
    // const articleData = randomArticleData();
    const articleData = randomArticle();

    // Act:
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);

    // Act:
    // Enter articles page
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();

    // Click add article button
    await articlesPage.addArticleButtonLogged.click();

    const addArticleView = new AddArticleView(page);
    await expect.soft(addArticleView.header).toBeVisible();

    // Create article with correct data
    await addArticleView.createArticle(articleData);

    // Assert:
    // Check result
    const createdArticlePage = new CreatedArticlesPage(page);
    await expect
      .soft(createdArticlePage.createdArticleTitle)
      .toHaveText(articleData.title);
    await expect
      .soft(createdArticlePage.createdArticleBody)
      .toHaveText(articleData.body);
  });
});
