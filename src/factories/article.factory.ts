import { CreateArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale//en';

// export function randomArticleData(): CreateArticleModel {

//   const articleData: CreateArticleModel = {

//     articleTitle: faker.lorem.words(2),
//     articleBody: faker.lorem.sentences(5),
//   };

//   return articleData;
// }

export function randomArticle(): CreateArticleModel {
  const title = faker.lorem.words(2);
  const body = faker.lorem.sentences(5);

  const newArticle: CreateArticleModel = { title: title, body: body };
  return newArticle;
}
