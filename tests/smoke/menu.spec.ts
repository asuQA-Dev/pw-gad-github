// import { ArticlesPage } from '@_src/pages/articles.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { test as baseTest, expect } from '@playwright/test';

interface Pages {
  articlesPage: ArticlesPage;
  commentsPage: CommentsPage;
}

const test = baseTest.extend<Pages>({
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await use(articlesPage);
  },
  commentsPage: async ({ page }, use) => {
    const commentsPage = new CommentsPage(page);
    await commentsPage.goto();
    await use(commentsPage);
  },
});

test.describe('Verify menu main button', () => {
  test('comments button navigates to comments page', { tag: '@GAD_R01_03' }, async ({ articlesPage }) => {
    // Arrange:
    const expectedTitle = 'Comments';
    // const articlesPage = new ArticlesPage(page);

    // Act:
    // await articlesPage.goto();
    const commentsPage = await articlesPage.mainMenuComponents.clickCommentsButton();
    const title = await commentsPage.getTitle();

    // Assert:
    expect(title).toContain(expectedTitle);
  });

  test('article button navigates to comments page', { tag: '@GAD_R01_03' }, async ({ commentsPage }) => {
    // Arrange:
    const expectedTitle = 'Articles';
    // const commentsPage = new CommentsPage(page);

    // Act:
    // await commentsPage.goto();
    const articlesPage = await commentsPage.mainMenuComponents.clickArticlesButton();
    const title = await articlesPage.getTitle();

    // Assert:
    expect(title).toContain(expectedTitle);
  });

  test('home page button navigates to main page', { tag: '@GAD_R01_03' }, async ({ articlesPage }) => {
    // Arrange:
    const expectedTitle = 'GAD';
    // const articlesPage = new ArticlesPage(page);

    // Act:
    await articlesPage.goto();
    const homePage = await articlesPage.mainMenuComponents.clickHomePageLink();

    const title = await homePage.getTitle();

    // Assert:
    expect(title).toContain(expectedTitle);
  });
});
