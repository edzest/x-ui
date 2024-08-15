import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TEST, ANSWER_SHEET } from '../constants/constants';
import { FiX } from "react-icons/fi";
import MatchingQuestion from '../matching-question/MatchingQuestion';
import SingleSelectQuestion from '../single-select-question/SingleSelectQuestion';
import MultiSelectQuestion from '../multi-select-question/MultiSelectQuestion';

function Questionnaire() {
    const [questions, setQuestions] = useState(new Map());
    const [matchingQuestions, setMatchingQuestions] = useState(new Map());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    // temporarily evaluating test on UI until we host BE somewhere
    const evaluateTest = (answers) => {
        var score = 0;
        for (const [questionId, answer] of Object.entries(answers)) {
            if (questions.has(parseInt(questionId))) {
                if (questions.get(parseInt(questionId)).correctOptionId === answer) {
                    score++;
                }

                // setting selected answers
                let a = ANSWER_SHEET.find(a => a.question.id === questionId);
                a.selectedAnswerId = answer;
                console.log("setting aId = ", answer, " to qId = ", questionId);
            } else {
                const q = matchingQuestions.get(parseInt(questionId));
                const correctAnswer = q.answers;
                if (correctAnswer.length !== answer.length) {
                    // if matchingQuestions left size is not matching answer size, then continue;
                    return;
                } else {
                    let wrong = false;
                    for (let i = 0; i < answer.length; i++) {
                        const answerMapping = correctAnswer.find(a => a.leftId === answer[i].leftId);
                        if (answerMapping.rightId !== answer[i].rightId) {
                            wrong = true;
                            break;
                        }
                    }
                    if (!wrong) {
                        score++;
                    }

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
        new Promise((resolve, reject) => {
            resolve(TEST[0]);
        })
            .then(data => {
                const questionsMap = data['questions'].reduce((map, question) => {
                    map.set(parseInt(question.id), question);
                    return map;
                }, new Map());

                const matchingQuestionsMap = data['matchingQuestions'].reduce((map, matchingQuestion) => {
                    map.set(parseInt(matchingQuestion.id), matchingQuestion);
                    return map;
                }, new Map());

                setQuestions(questionsMap);
                setMatchingQuestions(matchingQuestionsMap);
            })
            .then(resetAnswers())
            .catch(error => console.error(error));
    }, [id]);

    const handleNext = () => {
        console.log(answers)
        setCurrentIndex((currentIndex + 1) % (questions.size + matchingQuestions.size));
    };

    const handlePrevious = () => {
        console.log(answers)
        setCurrentIndex((currentIndex - 1 + (questions.size + matchingQuestions.size)) % (questions.size + matchingQuestions.size));
    };

    const handleClear = () => {
        setAnswers(prevAnswers => {
            const updatedAnswers = {...prevAnswers}
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
                total: 10,
                answerSheet: []
            });
        })
            .then(data => {
                console.log(data);
                navigate('/result', { state: { result: data } });
            })
            .catch(error => console.error(error));
    };

    const handleMatchingQuestionChange = (matchingQuestionAnswer) => {
        console.log("in handleMatchingQuestionChange, matchingQuestionAnswer = ", matchingQuestionAnswer)
        setAnswers({
            ...answers,
            [currentIndex + 1]: matchingQuestionAnswer
        });
    }

    if (!questions.size && !matchingQuestions.size) return <div>Loading...</div>;

    const handleAnswerChange = (selectedAnswerId) => {
        setAnswers({
            ...answers,
            [currentIndex + 1]: selectedAnswerId
        })
    }

    const renderQuestion = (questionNumber, question, selectedAnswer) => {
        switch (question.questionType) {
            case 'single-select':
                return (
                    <SingleSelectQuestion questionNumber={questionNumber}
                        question={question}
                        selectedAnswerId={selectedAnswer}
                        onAnswerChange={handleAnswerChange} />
                )
            case 'multi-select':
                return (
                    <MultiSelectQuestion
                        questionNumber={questionNumber}
                        question={question}
                        selectedAnswerIds={selectedAnswer}
                        onAnswerChange={handleAnswerChange} />
                )
            case 'matching-question':
                return (
                    <MatchingQuestion
                        questionNumber={questionNumber}
                        question={question}
                        selectedAnswer={selectedAnswer}
                        onAnswerChange={handleMatchingQuestionChange} />
                )
            default:
                return <div></div>;
        }
    }

    return (
        <div className='container px-4 mx-auto not-prose max-w-screen-lg sm:block'>
            <div className='text-right'>
                <button className='btn btn-ghost btn-circle text-3xl font-light m-4'
                    onClick={() => document.getElementById('my_modal_1').showModal()}><FiX /></button>
            </div>
            <hr className='mt-0' />
            <br />
            {
                renderQuestion(currentIndex + 1,
                    questions.get(currentIndex + 1),
                    answers[currentIndex + 1]
                )
            }


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