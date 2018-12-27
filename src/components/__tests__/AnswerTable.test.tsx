import { configure, shallow, ShallowWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-15'
import * as React from 'react'
import AnswerModel from '../../model/AnswerModal'
import AnswerOption from '../AnswerOption'
import AnswerTable, { AnswerValue } from '../AnswerTable'

configure({ adapter: new Adapter() })

describe('AnswerTable', () => {
  let wrapper: ShallowWrapper<any, any>
  let answers: AnswerModel[]
  let callback
  beforeEach(() => {
    answers = [
      { text: 'correct', correct: true },
      { text: 'wrong', correct: false },
      { text: 'still wrong', correct: false },
      { text: 'wrong again', correct: false },
    ]
    callback = jest.fn()
    wrapper = shallow(
      <AnswerTable
        correctAnswer={3}
        answers={answers}
        correctCallback={callback}
      />,
    )
  })

  it('should render 4 answer options', () => {
    expect(wrapper.find(AnswerOption).length).toEqual(4)
  })

  it('should initialize the state with selected as first option and correct answer as last', () => {
    expect(wrapper.state()).toEqual({
      buttonText: 0,
      responseText: '',
      selected: null,
    })
  })

  it('should change selected answer when the callback is made', () => {
    const event = {
      target: {
        name: 'D',
      },
    }
    wrapper
      .find(AnswerOption)
      .first()
      .prop('handleChange')(event)
    expect(wrapper.state()).toMatchObject({
      responseText: '',
      selected: AnswerValue.D,
    })
  })

  describe('Answer submission', () => {
    let event
    beforeEach(() => {
      event = {
        preventDefault: jest.fn(),
      }
      wrapper.find('form').simulate('submit', event)
    })
    it('should prevent default behaviour of the event', () => {
      expect(event.preventDefault).toBeCalled()
    })

    it('should set the show it is incorrect when the answer is not correct', () => {
      expect(wrapper.state()).toMatchObject({
        responseText: 'That was incorrect :(',
      })
    })
    describe('correct choice', () => {
      beforeEach(() => {
        wrapper.setState({
          buttonText: 0,
          selected: AnswerValue.D,
        })
        wrapper.find('form').simulate('submit', event)
      })
      it('should display the answer was correct when chosen response is correct', () => {
        expect(wrapper.state()).toMatchObject({
          responseText: 'That was correct!',
        })
      })
      it('should call the provided callback once the next button is shown', () => {
        wrapper.setState({ buttonText: 1 })
        wrapper.find('form').simulate('submit', event)

        expect(callback).toHaveBeenCalled()
      })
      it('should reset the selected option to null', () => {
        expect(wrapper.state()).toMatchObject({
          selected: null,
        })
      })
    })
  })
})
