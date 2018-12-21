import * as React from 'react';
import { shallow, ShallowWrapper, configure } from 'enzyme';
import App from '../App';
import * as Adapter from 'enzyme-adapter-react-15';
import TriviaApi from '../../service/TriviaApi';
import TriviaApiQuestion from '../../model/TriviaApiQuestion';
import Question from '../Question';

configure({ adapter: new Adapter() });
let app: ShallowWrapper<undefined, undefined>;

describe('Basic application testing', async () => {
  let questions, api;
  beforeEach(() => {
    const question: Partial<TriviaApiQuestion> = {
      question: 'aaa',
      incorrect_answers: ['bad', 'worse']
    };
    questions = [question, question];
    const promise = Promise.resolve(questions);
    api = jest.spyOn(TriviaApi, 'get').mockReturnValue(promise);
    app = shallow(<App title="App" />);
  });

  it('should render the title from the property when state is set', async () => {
    app.setState({ questions: questions, currentIndex: 0 });
    expect(app.find('h1').text()).toBe('App');
    expect(app.find(Question).exists()).toBe(true);
  });

  it('should show the loader when state is not set', () => {
    app.setState(null);
    expect(app.contains('<div className="loader"></div>'));
  });

  it('should increment the index when the answer is correct', () => {
    app.setState({ questions: questions, currentIndex: 0 });
    app.find(Question).prop('correctCallback')();
    expect(app.state()).toMatchObject({ currentIndex: 1 });
  });

  it('should fetch new questions when answer is correct for the last of the current questions', async () => {
    app.setState({ currentIndex: 1 });
    api.mockClear();

    await app.find(Question).prop('correctCallback')();

    expect(api).toHaveBeenCalledTimes(1);
    expect(app.state()).toMatchObject({ currentIndex: 0 });
  });
});
