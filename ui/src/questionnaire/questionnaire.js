import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ANSWER_SHEET } from '../constants/constants';
import { FiX } from "react-icons/fi";
import QuestionRenderer from './question-renderer';

function Questionnaire() {
    const [questions, setQuestions] = useState(new Map());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    // temporarily evaluating test on UI until we host BE somewhere
    const evaluateTest = (answers) => {
        var score = 0;
        for (const [questionId, answer] of Object.entries(answers)) {
            // setting selected answers
            let a = ANSWER_SHEET.find(a => a.question.id === questionId);
            a.selectedAnswerId = answer;
            if (Array.isArray(a.question.correctOptionId)) {
                // For multi-select questions
                if (JSON.stringify(a.question.correctOptionId.sort()) === JSON.stringify(answer.sort())) {
                    score++;
                }
            } else if (typeof a.question.correctOptionId === 'object') {
                // For matching questions
                if (JSON.stringify(a.question.correctOptionId) === JSON.stringify(answer)) {
                    score++;
                }
            } else {
                // For single-select questions
                if (a.question.correctOptionId === answer) {
                    score++;
                }
            }
        }
        console.log("you scored " + score)
        return score;
    };

    // temporarily reset answers
    const resetAnswers = () => {
        ANSWER_SHEET.forEach(a => {
            a.selectedAnswerId = "";
        });
    }

    useEffect(() => {
        fetch('/api/tests/1234')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
                const questionsMap = data['questions'].reduce((map, question) => {
                    map.set(parseInt(question.id), question);
                    return map;
                }, new Map());

                setQuestions(questionsMap);
            })
            .then(resetAnswers())
            .catch(error => console.error(error));
    }, [id]);

    const handleNext = () => {
        console.log(answers)
        setCurrentIndex((currentIndex + 1) % (questions.size));
    };

    const handlePrevious = () => {
        console.log(answers)
        setCurrentIndex((currentIndex - 1 + (questions.size)) % (questions.size));
    };

    const handleClear = () => {
        setAnswers(prevAnswers => {
            const updatedAnswers = { ...prevAnswers }
            delete updatedAnswers[currentIndex + 1]
            console.log("updatedAnswer", updatedAnswers)
            return updatedAnswers
        })
    }

    const handleSubmit = () => {
        console.log(answers);
        new Promise((resolve, reject) => {
            const score = evaluateTest(answers);
            resolve({
                name: "Demo Test",
                score: score,
                total: questions.size,
                answerSheet: []
            });
        })
            .then(data => {
                console.log(data);
                navigate('/result', { state: { result: data } });
            })
            .catch(error => console.error(error));
    };

    const handleAnswerChange = useCallback((selectedAnswer) => {
        setAnswers({
            ...answers,
            [currentIndex + 1]: selectedAnswer
        })
    }, [currentIndex, answers])

    if (!questions.size) return <div>Loading...</div>;

    return (
        <div className='container px-4 mx-auto not-prose max-w-screen-lg sm:block'>
            <div className='text-right'>
                <button className='btn btn-ghost btn-circle text-3xl font-light m-4'
                    onClick={() => document.getElementById('my_modal_1').showModal()}><FiX /></button>
            </div>
            <hr className='mt-0' />
            <br />
            <QuestionRenderer
                questionNumber={currentIndex + 1}
                question={questions.get(currentIndex + 1)}
                selectedAnswer={answers[currentIndex + 1]}
                onAnswerChange={handleAnswerChange}
            />


            <div className='grid-cols-3 grid gap-4 mb-10 md:flex md:justify-between'>
                <button onClick={handlePrevious} disabled={currentIndex === 0} className='btn md:flex-inital'>Previous</button>
                <button onClick={handleClear} className='btn btn-ghost'>Clear</button>
                {currentIndex < (questions.size) - 1 && <button onClick={handleNext} disabled={currentIndex === (questions.size) - 1} className='btn btn-primary md:flex-initial'>Next</button>}
                {currentIndex === (questions.size) - 1 && <button onClick={handleSubmit} className='btn btn-primary md:flex-initial'>Submit</button>}
            </div>

            {/* exit modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to exit the exam?</h3>
                    <p className="py-4">You will lose all your progress and redirected to
                        home page. If you don't want to do this click Cancel button or press ESC.
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Cancel</button>
                            <button className='btn btn-primary ml-10' onClick={() => navigate('/')}>I want to exit</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Questionnaire;