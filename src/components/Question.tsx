import * as React from 'react';
import AnswerTable from './AnswerTable';

export interface QuestionProps {
  questionText: string;
  correctOption: string;
  incorrectOptions: Array<string>;
  correctCallback(): void;
}

export default class Question extends React.Component<QuestionProps, any> {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md">
            <h3>{this.props.questionText}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <AnswerTable
              correctAnswer={this.props.correctOption}
              incorrectAnswers={this.props.incorrectOptions}
              correctCallback={this.props.correctCallback}
            />
          </div>
        </div>
      </div>
    );
  }
}
