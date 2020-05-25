import * as React from 'react'
import { AnswerValue } from './AnswerTable'
export interface AnswerOptionProps {
  text: string
  name: string
  checked: AnswerValue | null
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void
}

export default class AnswerOption extends React.Component<
  AnswerOptionProps,
  any
> {
  public render() {
    return (
      <div className='answer-option'>
        <label>
          <input
            type='radio'
            name={this.props.name}
            onChange={this.props.handleChange}
            checked={this.props.checked ? this.props.name === AnswerValue[this.props.checked]: false}
          />
          {this.props.text}
        </label>
      </div>
    )
  }
}
