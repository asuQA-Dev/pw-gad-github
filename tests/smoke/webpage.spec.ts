import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify service main page', () => {
  test('home page title', { tag: '@GAD-R01-01' }, async ({ homePage }) => {
    // Arrange:
    const expectedTitle = 'GAD';

    // Assert:
    const title = await homePage.getTitle();
    expect(title).toContain(expectedTitle);
  });

  test('articles page title', { tag: '@GAD-R01-02' }, async ({ articlesPage }) => {
    // Arrange:
    const expectedTitle = 'Articles';

    // Assert:
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedTitle);
  });

  test('comments page title', { tag: '@GAD-R01-02' }, async ({ commentsPage }) => {
    // Arrange:
    const expectedTitle = 'Comments';

    // Assert:
    const title = await commentsPage.getTitle();
    expect(title).toContain(expectedTitle);
  });

  test('home page title simple', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle(/GAD/);
  });
});
