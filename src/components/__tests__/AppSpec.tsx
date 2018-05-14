import * as React from 'react';
import { shallow, ShallowWrapper, configure } from 'enzyme';
import App from '../App';
import * as Adapter from 'enzyme-adapter-react-15';
import TriviaApi from '../../service/TriviaApi';
import QuestionModel from '../../model/QuestionModel';
import Question from '../Question';

configure({ adapter: new Adapter() });
let app: ShallowWrapper<undefined, undefined>;
let mock;

describe('Basic application testing', async () => {
  let questions;
  beforeEach(() => {
    const question = new QuestionModel();
    question.question = 'aaa';
    question.incorrect_answers = ['bad', 'worse'];
    questions = [question, question];
    const promise = Promise.resolve(questions);
    const api = jest.spyOn(TriviaApi, 'get').mockReturnValue(promise);
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
});
