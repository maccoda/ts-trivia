import * as React from 'react'
import AnswerModel from '../model/AnswerModal'
import AnswerTable from './AnswerTable'

export interface QuestionProps {
  questionText: string
  answers: AnswerModel[]
  correctCallback(): void
}

export default class Question extends React.Component<QuestionProps, any> {
  public render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md'>
            <h3>{this.props.questionText}</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-md'>
            <AnswerTable
              answers={this.props.answers}
              correctCallback={this.props.correctCallback}
              correctAnswer={this.props.answers.findIndex((x) => x.correct)}
            />
          </div>
        </div>
      </div>
    )
  }
}
