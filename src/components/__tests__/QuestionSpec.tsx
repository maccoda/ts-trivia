import { shallow, configure, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
import Question from '../Question';
import * as React from 'react';
import AnswerTable from '../AnswerTable';

configure({ adapter: new Adapter() });

describe('Question', () => {
  let questionText, correct, incorrect, callback;
  let wrapper: ShallowWrapper<undefined, undefined>;
  beforeEach(() => {
    questionText = 'question';
    correct = 'correct';
    incorrect = ['wrong', 'still wrong'];
    wrapper = shallow(
      <Question
        questionText={questionText}
        correctOption={correct}
        incorrectOptions={incorrect}
        correctCallback={callback}
      />
    );
  });
  it('should pass answers and callback to the answer table', () => {
    const table = wrapper.find(AnswerTable);
    expect(table.prop('correctAnswer')).toBe(correct);
    expect(table.prop('incorrectAnswers')).toBe(incorrect);
    expect(table.prop('correctCallback')).toBe(callback);
  });

  it('should render the question', () => {
    expect(wrapper.find('h3').text()).toEqual(questionText);
  });
});
