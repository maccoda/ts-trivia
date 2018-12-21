import { shallow, configure, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
import Question from '../Question';
import * as React from 'react';

configure({ adapter: new Adapter() });

describe('Question', () => {
  let questionText, correct, incorrect, callback;
  let wrapper: ShallowWrapper<undefined, undefined>;
  beforeEach(() => {
    questionText = 'question';
    correct = { text: 'correct', correct: true };
    incorrect = [
      { text: 'wrong', correct: false },
      { text: 'still wrong', correct: false }
    ];
    const answers = [correct, ...incorrect];
    wrapper = shallow(
      <Question
        questionText={questionText}
        answers={answers}
        correctCallback={callback}
      />
    );
  });

  it('should render the question', () => {
    expect(wrapper.find('h3').text()).toEqual(questionText);
  });
});
