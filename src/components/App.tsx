import * as React from 'react'
import QuestionModel from '../model/QuestionModel'
import ConvertApiDataToModel from '../service/QuestionConverter'
import TriviaApi from '../service/TriviaApi'
import Question from './Question'

export interface AppProps {
  title: string
}

interface AppState {
  questions: QuestionModel[]
  currentIndex: number
  loading: boolean
  questionsAnswered: number
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.next = this.next.bind(this)
    this.state = {
      currentIndex: 0,
      loading: false,
      questions: [],
      questionsAnswered: 0,
    }
  }

  public fetchQuestions() {
    this.setState({ loading: true })
    TriviaApi.get().then((x) => {
      const model = x.map((question) => ConvertApiDataToModel(question))
      this.setState({ questions: model, currentIndex: 0, loading: false })
    })
  }
  public componentWillMount() {
    this.fetchQuestions()
  }

  public next() {
    if (this.state.currentIndex < this.state.questions.length - 1) {
      this.setState({ currentIndex: this.state.currentIndex + 1 })
    } else {
      this.fetchQuestions()
    }
    this.setState({ questionsAnswered: this.state.questionsAnswered + 1 })
  }

  public render(): JSX.Element {
    if (this.state.loading) {
      return (
        <div className='container'>
          <div className='center'>
            <div className='loader' />
          </div>
        </div>
      )
    }
    const currQuestion = this.state.questions[this.state.currentIndex]
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md'>
            <h1>{this.props.title}</h1>
          </div>
        </div>
        <div className='row'>
          Questions answered: {this.state.questionsAnswered}
        </div>
        <div className='row'>
          <div className='col-md question'>
            <Question
              questionText={currQuestion.questionText}
              answers={currQuestion.answers}
              correctCallback={this.next}
            />
          </div>
        </div>
      </div>
    )
  }
}
