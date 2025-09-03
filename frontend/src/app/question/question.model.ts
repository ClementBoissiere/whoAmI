export interface QuestionResponse {
    simpleResponse: String;
}

export interface GameSession {
    questionsRemaining: number;
    lastQuestionTime: number | null;
    positiveAnswers: string[];
    negativeAnswers: string[];
    gameWon: boolean;
    gameOver: boolean;
}