import { addArticleModel } from '@_src/models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomArticle(titleLength?: number, bodySentence = 5): addArticleModel {
  let title: string;

  if (titleLength) title = faker.string.alpha(titleLength);
  else title = faker.lorem.words(2);

  const body = faker.lorem.sentences(bodySentence);

  const newArticle: addArticleModel = { title: title, body: body };
  return newArticle;
}
