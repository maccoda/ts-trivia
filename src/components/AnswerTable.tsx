import * as React from 'react';
import AnswerOption from './AnswerOption';
import ResponseLabel from './ResponseLabel';
import AnswerModel from '../model/AnswerModal';

export interface AnswerTableProps {
  answers: Array<AnswerModel>;
  correctAnswer: AnswerValue;
  correctCallback(): void;
}
export enum AnswerValue {
  A,
  B,
  C,
  D
}
interface AnswerTableState {
  selected?: AnswerValue;
  responseText: string;
}

export default class AnswerTable extends React.Component<
  AnswerTableProps,
  AnswerTableState
> {
  constructor(props: AnswerTableProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selected: null,
      responseText: ''
    };
  }

  handleSubmit(event: any) {
    event.preventDefault();
    if (this.props.correctAnswer == this.state.selected) {
      this.setState({ responseText: 'That was correct!', selected: null });
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
    const answerOptions = this.props.answers.map((x, idx) => {
      return (
        <AnswerOption
          text={x.text}
          name={AnswerValue[idx]}
          checked={this.state.selected}
          handleChange={this.handleChange}
        />
      );
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md">
              <div className="form-check form-check-inline">
                {answerOptions[0]}
                {answerOptions[1]}
              </div>
            </div>
          </div>
          {answerOptions.length > 2 && (
            <div className="row">
              <div className="col-md">
                <div className="form-check form-check-inline">
                  {answerOptions[2]}
                  {answerOptions[3]}
                </div>
              </div>
            </div>
          )}
          <input type="submit" value="Submit" />
        </form>
        <ResponseLabel text={this.state.responseText} />
      </div>
    );
  }
}
