import AnswerModel from './AnswerModal'

export default interface QuestionModel {
    questionText: string
    answers: AnswerModel[]
}
