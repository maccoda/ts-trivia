import * as React from 'react';
import { ShallowWrapper, shallow, configure } from 'enzyme';
import AnswerTable, { AnswerValue } from '../AnswerTable';
import AnswerOption from '../AnswerOption';
import * as Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe('AnswerTable', () => {
  let wrapper: ShallowWrapper<any, any>;
  let correct, incorrect, callback;
  beforeEach(() => {
    correct = 'correct';
    incorrect = ['wrong', 'still wrong'];
    callback = jest.fn();
    wrapper = shallow(
      <AnswerTable
        correctAnswer={correct}
        incorrectAnswers={incorrect}
        correctCallback={callback}
      />
    );
  });

  it('should render 4 answer options', () => {
    expect(wrapper.find(AnswerOption).length).toEqual(4);
  });

  it('should initialize the state with selected as first option and correct answer as last', () => {
    expect(wrapper.state()).toEqual({
      selected: null,
      correctAnswer: AnswerValue.D,
      responseText: ''
    });
  });

  it('should change selected answer when the callback is made', () => {
    const event = {
      target: {
        name: 'D'
      }
    };
    wrapper
      .find(AnswerOption)
      .first()
      .prop('handleChange')(event);
    expect(wrapper.state()).toEqual({
      selected: AnswerValue.D,
      correctAnswer: AnswerValue.D,
      responseText: ''
    });
  });

  describe('Answer submission', () => {
    let event;
    beforeEach(() => {
      event = {
        preventDefault: jest.fn()
      };
      wrapper.find('form').simulate('submit', event);
    });
    it('should prevent default behaviour of the event', () => {
      expect(event.preventDefault).toBeCalled();
    });

    it('should set the show it is incorrect when the answer is not correct', () => {
      expect(wrapper.state()).toMatchObject({
        responseText: 'That was incorrect :('
      });
    });
    describe('correct choice', () => {
      beforeEach(() => {
        wrapper.setState({
          correctAnswer: AnswerValue.D,
          selected: AnswerValue.D
        });
        wrapper.find('form').simulate('submit', event);
      });
      it('should display the answer was correct when chosen response is correct', () => {
        expect(wrapper.state()).toMatchObject({
          responseText: 'That was correct!'
        });
      });
      it('should call the provided callback', () => {
        expect(callback).toHaveBeenCalled();
      });
      it('should reset the selected option to null', () => {
        expect(wrapper.state()).toMatchObject({
          selected: null
        });
      });
    });
  });
});
