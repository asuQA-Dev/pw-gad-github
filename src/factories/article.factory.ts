import { CreateArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale//en';

export function randomArticle(
  titleLength?: number,
  bodySentence = 5,
): CreateArticleModel {
  let title: string;

  if (titleLength) title = faker.string.alpha(titleLength);
  else title = faker.lorem.words(2);

  const body = faker.lorem.sentences(bodySentence);

  const newArticle: CreateArticleModel = { title: title, body: body };
  return newArticle;
}
