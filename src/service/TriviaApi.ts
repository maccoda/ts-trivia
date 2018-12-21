import axios from 'axios'
import TriviaApiQuestion from '../model/TriviaApiQuestion'

export default class TriviaApi {
  public static URL = 'https://opentdb.com/api.php?amount=10'

  public static async get(): Promise<TriviaApiQuestion[]> {
    return axios.get(this.URL).then((x) => x.data.results)
  }
}
