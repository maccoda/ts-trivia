import * as React from 'react';
import Question from './Question';
import TriviaApi from '../service/TriviaApi';
import QuestionModel from '../model/QuestionModel';
import HtmlCodeConverter from '../service/HtmlCodeConverter';

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

  fetchQuestions() {
    TriviaApi.get().then(x => {
      this.setState({ questions: x, currentIndex: 0 });
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
    if (this.state == null) {
      return (
        <div className="container">
          <div className="loader" />
        </div>
      );
    }
    const currQuestion = this.state.questions[this.state.currentIndex];
    const text = HtmlCodeConverter.convertFromHtml(currQuestion.question);
    const correct = HtmlCodeConverter.convertFromHtml(
      currQuestion.correct_answer
    );
    const incorrect = currQuestion.incorrect_answers.map(x =>
      HtmlCodeConverter.convertFromHtml(x)
    );
    return (
      <div className="container">
        <h1>{this.props.title}</h1>
        <div className="question">
          <Question
            questionText={text}
            correctOption={correct}
            incorrectOptions={incorrect}
            correctCallback={this.next}
          />
        </div>
      </div>
    );
  }
}
