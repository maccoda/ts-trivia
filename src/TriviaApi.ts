import QuestionModel from './model/QuestionModel';

export default class TriviaApi {
  static URL = 'https://opentdb.com/api.php?amount=10';

  static async get(): Promise<Array<QuestionModel>> {
    return fetch(this.URL, { method: 'get' })
      .then(x => x.json())
      .then(x => x.results);
  }
}
