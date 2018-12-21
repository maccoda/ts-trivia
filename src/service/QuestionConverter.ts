import AnswerModel from '../model/AnswerModal'
import QuestionModel from '../model/QuestionModel'
import TriviaApiQuestion from '../model/TriviaApiQuestion'
import HtmlCodeConverter from './HtmlCodeConverter'

const ConvertApiDataToModel = (apiModel: TriviaApiQuestion): QuestionModel => {
    const answers: AnswerModel[] = apiModel.incorrect_answers
        .map((x) => ({text: HtmlCodeConverter.convertFromHtml(x), correct: false}))
    answers.push({text: HtmlCodeConverter.convertFromHtml(apiModel.correct_answer), correct: true})
    return {
        answers,
        questionText: HtmlCodeConverter.convertFromHtml(apiModel.question),
    }
}
export default ConvertApiDataToModel
