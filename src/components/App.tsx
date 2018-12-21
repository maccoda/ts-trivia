import * as React from 'react';
import Question from './Question';
import TriviaApi from '../service/TriviaApi';
import QuestionModel from '../model/QuestionModel';
import ConvertApiDataToModel from '../service/QuestionConverter';

export interface AppProps {
  title: string;
}

interface AppState {
  questions: Array<QuestionModel>;
  currentIndex: number;
  loading: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
  }

  fetchQuestions() {
    this.setState({ loading: true });
    TriviaApi.get().then(x => {
      const model = x.map(question => ConvertApiDataToModel(question));
      this.setState({ questions: model, currentIndex: 0, loading: false });
    });
  }
  componentWillMount() {
    this.fetchQuestions();
  }

  next() {
    if (this.state.currentIndex < this.state.questions.length - 1) {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    } else {
      this.fetchQuestions();
    }
  }

  render(): JSX.Element {
    if (this.state.loading) {
      return (
        <div className="container">
          <div className="center">
            <div className="loader" />
          </div>
        </div>
      );
    }
    const currQuestion = this.state.questions[this.state.currentIndex];
    return (
      <div className="container">
        <h1>{this.props.title}</h1>
        <div className="question">
          <Question
            questionText={currQuestion.questionText}
            answers={currQuestion.answers}
            correctCallback={this.next}
          />
        </div>
      </div>
    );
  }
}
