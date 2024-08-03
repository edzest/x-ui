import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TEST, ASNWER_SHEET } from '../constants/constants';
import { FiX } from "react-icons/fi";
import MatchingQuestion from '../matching-question/MatchingQuestion';

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
        for (const [qId, aId] of Object.entries(answers)) {
            const q = TEST[0].questions.find(q => q.id === qId)
            if (q.correctOptionId === aId) {
                score++;
            }

            // setting selected answers
            let a = ASNWER_SHEET.find(a => a.question.id === qId);
            a.selectedAnswerId = aId;
            console.log("setting aId = ", aId, " to qId = ", qId);
        }
        console.log("you scored " + score )
        return score;
    };

    // temporarily reset answers
    const resetAnswers = () => {
        ASNWER_SHEET.forEach(a => {
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
        setCurrentIndex((currentIndex + 1) % questions.size);
    };

    const handlePrevious = () => {
        console.log(answers)
        setCurrentIndex((currentIndex - 1 + questions.size) % questions.size);
    };

    const handleClear = () => {
        setAnswers({
            ...answers,
            [currentIndex + 1]: null
        });
    }

    const handleOptionChange = (event) => {
        setAnswers({
            ...answers,
            [currentIndex + 1]: event.target.value
        });
    };

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
        setAnswers({
            ...answers,
            [currentIndex + 1]: matchingQuestionAnswer
        });
    }

    if (!questions.size) return <div>Loading...</div>;

    return (
        <div className='container px-4 mx-auto prose sm:block'>
            <div className='text-right'>
                <button className='btn btn-ghost btn-circle text-3xl font-light m-4'
                    onClick={() => document.getElementById('my_modal_1').showModal()}><FiX /></button>
            </div>
            <hr className='mt-0' />
            {
                questions.has(currentIndex + 1) ? (
                <>
                <h4>{`Q ${currentIndex + 1}: ${questions.get(currentIndex + 1).text}`}</h4>
                <div className='my-6'>
                    {questions.get(currentIndex + 1).options.map((option, index) => (
                        <div key={index}>
                            <label className='flex my-3'>
                                <input type="radio"
                                    className='radio radio-primary mr-3'
                                    value={option.id}
                                    checked={answers[currentIndex + 1] === option.id}
                                    onChange={handleOptionChange} />
                                {option.text}
                            </label>
                        </div>
                    ))}
                </div>
                </>
                )
                : (
                    <>
                    <h4>{`Q ${currentIndex + 1}: ${matchingQuestions.get(currentIndex + 1).text}`}</h4>
                    <MatchingQuestion question={matchingQuestions.get(currentIndex + 1)} updateAnswer={handleMatchingQuestionChange} />
                    </>
                )
            }
            
            <div className='grid-cols-3 grid gap-4 mb-10 md:flex md:justify-between'>
                <button onClick={handlePrevious} disabled={currentIndex === 0} className='btn md:flex-inital'>Previous</button>
                <button onClick={handleClear} className='btn btn-ghost'>Clear</button>
                {currentIndex < questions.size - 1 && <button onClick={handleNext} disabled={currentIndex === questions.size - 1} className='btn btn-primary md:flex-initial'>Next</button>}
                {currentIndex === questions.size - 1 && <button onClick={handleSubmit} className='btn btn-primary md:flex-initial'>Submit</button>}
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