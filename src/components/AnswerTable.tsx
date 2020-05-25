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

type AnswerValueStrings = keyof typeof AnswerValue

enum ButtonText {
  'Submit',
  'Next',
}
interface AnswerTableState {
  selected: AnswerValue | null
  responseText: string
  buttonText: ButtonText
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
      buttonText: ButtonText.Submit,
      responseText: '',
      selected: null,
    }
  }

  public handleSubmit(event: any) {
    event.preventDefault()
    if (this.state.buttonText === ButtonText.Next) {
      this.setState({ responseText: '', buttonText: ButtonText.Submit })
      this.props.correctCallback()
    } else if (this.props.correctAnswer === this.state.selected) {
      this.setState({
        buttonText: ButtonText.Next,
        responseText: 'That was correct!',
        selected: null,
      })
    } else {
      this.setState({ responseText: 'That was incorrect :(' })
    }
  }

  public handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const name: AnswerValueStrings = event.target.name as AnswerValueStrings
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
          <input type='submit' value={ButtonText[this.state.buttonText]} />
        </form>
        <ResponseLabel text={this.state.responseText} />
      </div>
    )
  }
}
