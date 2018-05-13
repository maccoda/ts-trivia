import QuestionModel from '../model/QuestionModel';
import axios from 'axios';

export default class TriviaApi {
  static URL = 'https://opentdb.com/api.php?amount=10';

  static async get(): Promise<Array<QuestionModel>> {
    return axios.get(this.URL).then(x => x.data.results);
  }
}
