import React from 'react';
import SingleSelectQuestion from '../single-select-question/SingleSelectQuestion';
import MultiSelectQuestion from '../multi-select-question/MultiSelectQuestion';
import MatchingQuestion from '../matching-question/MatchingQuestion';

function QuestionRenderer({ questionNumber, question, selectedAnswer, onAnswerChange, correctAnswer}) {
    switch (question.questionType) {
        case 'single-select':
            return (
                <SingleSelectQuestion 
                    questionNumber={questionNumber}
                    question={question}
                    selectedAnswerId={selectedAnswer}
                    onAnswerChange={onAnswerChange} 
                    correctAnswer={correctAnswer}
                />
            );
        case 'multi-select':
            return (
                <MultiSelectQuestion
                    questionNumber={questionNumber}
                    question={question}
                    selectedAnswerIds={selectedAnswer}
                    onAnswerChange={onAnswerChange} 
                    correctAnswer={correctAnswer}
                />
            );
        case 'matching-question':
            return (
                <MatchingQuestion
                    questionNumber={questionNumber}
                    question={question}
                    selectedAnswer={selectedAnswer}
                    onAnswerChange={onAnswerChange} 
                    correctAnswer={correctAnswer}
                />
            );
        default:
            return <div>Unsupported question type</div>;
    }
}

export default QuestionRenderer;