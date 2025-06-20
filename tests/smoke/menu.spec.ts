import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main button', () => {
  test(
    'comments button navigates to comments page',
    { tag: '@GAD_R01_03' },
    async ({ page }) => {
      // Arrange:
      const expectedTitle = 'Comments';
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      // Act:
      await articlesPage.goto();
      await articlesPage.mainMenuComponents.commentsButton.click();

      // Assert:
      const title = await commentsPage.getTitle();
      expect(title).toContain(expectedTitle);
    },
  );

  test(
    'article button navigates to comments page',
    { tag: '@GAD_R01_03' },
    async ({ page }) => {
      // Arrange:
      const expectedTitle = 'Articles';
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      // Act:
      await commentsPage.goto();
      await commentsPage.mainMenuComponents.articlesButton.click();

      // Assert:
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedTitle);
    },
  );

  test(
    'home page button navigates to main page',
    { tag: '@GAD_R01_03' },
    async ({ page }) => {
      // Arrange:
      const expectedTitle = 'GAD';
      const articlesPage = new ArticlesPage(page);

      // Act:
      await articlesPage.goto();
      await articlesPage.mainMenuComponents.homePage.click();
      const homePage = new HomePage(page);

      // Assert:
      const title = await homePage.getTitle();
      expect(title).toContain(expectedTitle);
    },
  );
});
