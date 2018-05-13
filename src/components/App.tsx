import * as React from 'react';
import Question from './Question';
import TriviaApi from '../service/TriviaApi';
import QuestionModel from '../model/QuestionModel';

export interface AppProps {
  title: string;
}

interface AppState {
  questions: Array<QuestionModel>;
  currentIndex: number;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
  }
  componentWillMount() {
    TriviaApi.get().then(x => {
      this.setState({ questions: x, currentIndex: 0 });
    });
  }

  next() {
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  }

  render(): JSX.Element {
    if (this.state == null) {
      return (
        <div className="container">
          <div className="loader" />;
        </div>
      );
    }
    return (
      <div className="container">
        <h1>{this.props.title}</h1>
        <div className="question">
          <Question
            questionText={
              this.state.questions[this.state.currentIndex].question
            }
            correctOption={
              this.state.questions[this.state.currentIndex].correct_answer
            }
            incorrectOptions={
              this.state.questions[this.state.currentIndex].incorrect_answers
            }
            correctCallback={this.next}
          />
        </div>
      </div>
    );
  }
}
