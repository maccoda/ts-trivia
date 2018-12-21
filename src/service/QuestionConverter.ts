import TriviaApiQuestion from "../model/TriviaApiQuestion";
import QuestionModel from "../model/QuestionModel";
import HtmlCodeConverter from "./HtmlCodeConverter";
import AnswerModel from "../model/AnswerModal";

const ConvertApiDataToModel = (apiModel: TriviaApiQuestion): QuestionModel => {
    const answers: Array<AnswerModel> = apiModel.incorrect_answers.map(x => {return {text: HtmlCodeConverter.convertFromHtml(x), correct: false}})
    answers.push({text: HtmlCodeConverter.convertFromHtml(apiModel.correct_answer), correct: true})
    return {
        questionText: HtmlCodeConverter.convertFromHtml(apiModel.question),
        answers: answers
    }
};
export default ConvertApiDataToModel;
