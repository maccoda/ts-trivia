import { configure, shallow, ShallowWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-15'
import * as React from 'react'
import AnswerOption from '../AnswerOption'
import { AnswerValue } from '../AnswerTable'

configure({ adapter: new Adapter() })
describe('AnswerOption', () => {
  let wrapper: ShallowWrapper<any, any>
  let text, name, checked, handleChange

  beforeEach(() => {
    text = 'text'
    name = 'name'
    checked = AnswerValue.A
    handleChange = jest.fn()

    wrapper = shallow(
      <AnswerOption
        text={text}
        name={name}
        checked={checked}
        handleChange={handleChange}
      />,
    )
  })

  it('should match props provided', () => {
    const input = wrapper.find('input')
    expect(input.prop('name')).toBe(name)
    // Props don't match for checked and name
    expect(input.prop('checked')).toBe(false)
    expect(input.prop('onChange')).toBe(handleChange)
    expect(wrapper.find('label').text()).toBe(text)
  })

  it('should be checked when property matches the name', () => {
    name = 'A'
    checked = AnswerValue.A
    wrapper = shallow(
      <AnswerOption
        text={text}
        name={name}
        checked={checked}
        handleChange={handleChange}
      />,
    )
    expect(wrapper.find('input').prop('checked')).toBe(true)
  })
})
