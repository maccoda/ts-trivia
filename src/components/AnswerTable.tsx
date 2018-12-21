import * as React from 'react'
import AnswerModel from '../model/AnswerModal'
import AnswerOption from './AnswerOption'
import ResponseLabel from './ResponseLabel'

export interface AnswerTableProps {
  answers: AnswerModel[]
  correctAnswer: AnswerValue
  correctCallback(): void
}
export enum AnswerValue {
  A,
  B,
  C,
  D,
}
interface AnswerTableState {
  selected?: AnswerValue
  responseText: string
}

export default class AnswerTable extends React.Component<
  AnswerTableProps,
  AnswerTableState
> {
  constructor(props: AnswerTableProps) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      responseText: '',
      selected: null,
    }
  }

  public handleSubmit(event: any) {
    event.preventDefault()
    if (this.props.correctAnswer === this.state.selected) {
      this.setState({ responseText: 'That was correct!', selected: null })
      this.props.correctCallback()
    } else {
      this.setState({ responseText: 'That was incorrect :(' })
    }
  }

  public handleChange(event: any): void {
    const name: string = event.target.name
    const value: AnswerValue = AnswerValue[name]

    this.setState({ selected: value })
  }

  public render() {
    const answerOptions = this.props.answers.map((x, idx) => {
      return (
        <AnswerOption
          key={idx}
          text={x.text}
          name={AnswerValue[idx]}
          checked={this.state.selected}
          handleChange={this.handleChange}
        />
      )
    })

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col-md'>
              <div className='form-check form-check-inline'>
                {answerOptions[0]}
                {answerOptions[1]}
              </div>
            </div>
          </div>
          {answerOptions.length > 2 && (
            <div className='row'>
              <div className='col-md'>
                <div className='form-check form-check-inline'>
                  {answerOptions[2]}
                  {answerOptions[3]}
                </div>
              </div>
            </div>
          )}
          <input type='submit' value='Submit' />
        </form>
        <ResponseLabel text={this.state.responseText} />
      </div>
    )
  }
}
