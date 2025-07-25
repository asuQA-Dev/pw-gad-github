import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify article', () => {
  test(
    'Non logged user can access created article',
    { tag: '@GAD-R06-08, @predifined_data' },
    async ({ articlePage }) => {
      // Arrange:
      const expectedArticleTitle = 'How to write effective test cases	';

      const parameters = '?id=1';
      // Act:

      await articlePage.goto(parameters);
      // Assert:
      await expect(articlePage.articleTitle).toHaveText(expectedArticleTitle);
    },
  );
});
