import * as React from 'react';
import { AnswerValue } from './AnswerTable';
export interface AnswerOptionProps {
  text: string;
  name: string;
  checked: AnswerValue;
  handleChange(event: any): void;
}

interface AnswerOptionState {
  isChecked: boolean;
}

export default class AnswerOption extends React.Component<
  AnswerOptionProps,
  any
> {
  constructor(props) {
    super(props);
    const checked = props.name == AnswerValue[props.checked];
    this.state = { isChecked: checked };
  }
  render() {
    return (
      <div className="answer-option">
        <label>
          <input
            type="radio"
            name={this.props.name}
            onChange={this.props.handleChange}
            checked={this.props.name == AnswerValue[this.props.checked]}
          />
          {this.props.text}
        </label>
      </div>
    );
  }
}
