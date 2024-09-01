import React, { useState } from 'react';
import Nav from '../common/Nav';
import { useLocation, useNavigate } from 'react-router-dom';
import { ANSWER_SHEET } from '../constants/constants';
import QuestionRenderer from '../questionnaire/question-renderer';
function Solution() {
    const location = useLocation();
    const navigate = useNavigate();
    const answerSheet = location.state ? location.state.answerSheet : ANSWER_SHEET;
    const [currentIndex, setCurrentIndex] = useState(0);

    const checkAnswer = () => {
        const selectedAnswer = answerSheet[currentIndex].selectedAnswerId;
        const correctAnswer = answerSheet[currentIndex].question.correctOptionId;
        if (selectedAnswer === "" || selectedAnswer === null || selectedAnswer === undefined) {
            return <h4 className='text-gray-500'>DID NOT ATTEMPT</h4>;
        }
        if (Array.isArray(selectedAnswer)) {
            // For multi-select questions
            if (JSON.stringify(selectedAnswer.sort()) === JSON.stringify(correctAnswer.sort())) {
                return <h4 className='text-success'>CORRECT</h4>
            } else {
                return <h4 className='text-error'>INCORRECT</h4>
            }
        } else if (typeof selectedAnswer === 'object') {
            // For matching questions
            if (JSON.stringify(selectedAnswer) === JSON.stringify(correctAnswer)) {
                return <h4 className='text-success'>CORRECT</h4>
            } else {
                return <h4 className='text-error'>INCORRECT</h4>
            }
        } else {
            // For single-select questions
            if (selectedAnswer === correctAnswer) {
                return <h4 className='text-success'>CORRECT</h4>
            } else {
                return <h4 className='text-error'>INCORRECT</h4>
            }
        }
    }

    let status = checkAnswer();

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % answerSheet.length);
        status = checkAnswer();
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            status = checkAnswer();
        }
    };

    return (
        <div>
            <div className='container mx-auto'>
                <Nav />
            </div>
            <div className='container px-4 mx-auto not-prose max-w-screen-lg'>

                <div>
                    <div className='text-right'>
                        <button onClick={() => navigate(-1)} className='btn btn-ghost btn-circle text-3xl font-light m-4'>X</button>
                    </div>
                    <hr className='mt-0' />
                    <div className='font-bold'>
                        {status}
                    </div>
                    <QuestionRenderer
                        questionNumber={currentIndex + 1}
                        question={answerSheet[currentIndex].question}
                        selectedAnswer={answerSheet[currentIndex].selectedAnswerId}
                        onAnswerChange={() => { }}
                        correctAnswer={answerSheet[currentIndex].question.correctOptionId}
                    />
                    {answerSheet[currentIndex].question.explanation && (
                        <>
                            <h4 className='font-bold'>EXPLANATION</h4>
                            <p>{answerSheet[currentIndex].question.explanation}</p>
                        </>
                    )}
                    <br />
                    <div className='grid-cols-2 grid gap-4 mb-10 md:flex md:justify-between'>
                        <button onClick={handlePrevious} disabled={currentIndex === 0} className='btn md:flex-inital'>Previous</button>
                        <button onClick={handleNext} disabled={currentIndex === answerSheet.length - 1} className='btn btn-primary md:flex-initial'>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Solution;