import { configure, shallow, ShallowWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-15'
import * as React from 'react'
import Question from '../Question'

configure({ adapter: new Adapter() })

describe('Question', () => {
  const questionText = 'question'
  const answers = [
    { text: 'correct', correct: true },
    { text: 'wrong', correct: false },
    { text: 'still wrong', correct: false },
    { text: 'still wrong', correct: false },
  ]
  const callback = jest.fn()
  let wrapper: ShallowWrapper<undefined, undefined>

  beforeEach(() => {
    wrapper = shallow(
      <Question
        questionText={questionText}
        answers={answers}
        correctCallback={callback}
      />,
    )
  })

  it('should render the question', () => {
    expect(wrapper.find('h3').text()).toEqual(questionText)
  })
})
