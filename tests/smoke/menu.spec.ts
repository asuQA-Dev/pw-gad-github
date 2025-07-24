import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify menu main button', () => {
  test('comments button navigates to comments page', { tag: '@GAD_R01_03' }, async ({ articlesPage }) => {
    // Arrange:
    const expectedTitle = 'Comments';

    // Act:
    const commentsPage = await articlesPage.mainMenuComponents.clickCommentsButton();
    const title = await commentsPage.getTitle();

    // Assert:
    expect(title).toContain(expectedTitle);
  });

  test('article button navigates to comments page', { tag: '@GAD_R01_03' }, async ({ commentsPage }) => {
    // Arrange:
    const expectedTitle = 'Articles';

    // Act:
    const articlesPage = await commentsPage.mainMenuComponents.clickArticlesButton();
    const title = await articlesPage.getTitle();

    // Assert:
    expect(title).toContain(expectedTitle);
  });

  test('home page button navigates to main page', { tag: '@GAD_R01_03' }, async ({ articlesPage }) => {
    // Arrange:
    const expectedTitle = 'GAD';

    // Act:
    await articlesPage.goto();
    const homePage = await articlesPage.mainMenuComponents.clickHomePageLink();

    const title = await homePage.getTitle();

    // Assert:
    expect(title).toContain(expectedTitle);
  });
});
