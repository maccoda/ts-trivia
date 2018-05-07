import * as React from 'react';
import AnswerOption from './AnswerOption';
import ResponseLabel from './ResponseLabel';

export interface AnswerTableProps {
  correctAnswer: string;
  incorrectAnswers: Array<string>;
  correctCallback(): void;
}
export enum AnswerValue {
  A,
  B,
  C,
  D
}
interface AnswerTableState {
  selected: AnswerValue;
  correctAnswer: AnswerValue;
  responseText: string;
}

export default class AnswerTable extends React.Component<
  AnswerTableProps,
  any
> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { selected: AnswerValue.A, correctAnswer: AnswerValue.D };
  }
  handleSubmit(event: any) {
    event.preventDefault();
    if (this.state.correctAnswer == this.state.selected) {
      console.log('The answer was correct!');
      this.setState({ responseText: 'That was correct!' });
      this.props.correctCallback();
    } else {
      this.setState({ responseText: 'That was incorrect :(' });
    }
  }

  handleChange(event: any): void {
    let name: string = event.target.name;
    let value: AnswerValue = AnswerValue[name];

    this.setState({ selected: value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md">
              <div className="form-check form-check-inline">
                <AnswerOption
                  text={this.props.incorrectAnswers[0]}
                  name="A"
                  checked={this.state.selected}
                  handleChange={this.handleChange}
                />
                <AnswerOption
                  text={this.props.incorrectAnswers[1]}
                  name="B"
                  checked={this.state.selected}
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <div className="form-check form-check-inline">
                <AnswerOption
                  text={this.props.incorrectAnswers[2]}
                  name="C"
                  checked={this.state.selected}
                  handleChange={this.handleChange}
                />
                <AnswerOption
                  text={this.props.correctAnswer}
                  name="D"
                  checked={this.state.selected}
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
        <ResponseLabel text={this.state.responseText} />
      </div>
    );
  }
}
