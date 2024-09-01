import React from 'react';
import SingleSelectQuestion from '../single-select-question/SingleSelectQuestion';
import MultiSelectQuestion from '../multi-select-question/MultiSelectQuestion';
import MatchingQuestion from '../matching-question/MatchingQuestion';

function QuestionRenderer({ questionNumber, question, selectedAnswer, onAnswerChange }) {
    switch (question.questionType) {
        case 'single-select':
            return (
                <SingleSelectQuestion 
                    questionNumber={questionNumber}
                    question={question}
                    selectedAnswerId={selectedAnswer}
                    onAnswerChange={onAnswerChange} 
                />
            );
        case 'multi-select':
            return (
                <MultiSelectQuestion
                    questionNumber={questionNumber}
                    question={question}
                    selectedAnswerIds={selectedAnswer}
                    onAnswerChange={onAnswerChange} 
                />
            );
        case 'matching-question':
            return (
                <MatchingQuestion
                    questionNumber={questionNumber}
                    question={question}
                    selectedAnswer={selectedAnswer}
                    onAnswerChange={onAnswerChange} 
                />
            );
        default:
            return <div>Unsupported question type</div>;
    }
}

export default QuestionRenderer;