import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import TriviaApi from '../TriviaApi';

describe('TriviaApi', () => {
  let mock;
  const QUESTIONS = [{ question: 'question', answer: 'answer' }];
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet('https://opentdb.com/api.php?amount=10').reply(200, {
      results: QUESTIONS
    });
  });
  it('should call get on Open Trivia endpoint', async () => {
    const results = await TriviaApi.get();
    expect(results).toEqual(QUESTIONS);
  });
});
