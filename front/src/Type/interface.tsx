export interface AnswerData {
    text: string,
    id: number,
    ok: boolean,
}

export interface QuestionData {
    question: string,
    id: number,
    answers: AnswerData[],
}

export interface QuizzData {
    title: string,
    questions: QuestionData[],
}

export interface AnswerResponse {
    id: number,
    res: boolean,
}

export interface QuestionResponse {
    id: number,
    answers: AnswerResponse[],
}

export interface AnswerReview {
    text: string,
    id: number,
    res: boolean,
    ok: boolean,
}

export interface QuestionReview {
    question: string,
    id: number,
    answers: AnswerReview[],
}

export interface QuizzDataReview {
    title: string,
    questions: QuestionReview[],
}