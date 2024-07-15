import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TEST } from '../constants/constants';

function Questionnaire() {
    const [questions, setQuestions] = useState([]);
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
        }
        console.log("you scored " + score )
        return score;
    };

    useEffect(() => {
        new Promise((resolve, reject) => {
            resolve(TEST[0]);
        })
            .then(data => setQuestions(data['questions']))
            .catch(error => console.error(error));
    }, [id]);

    const handleNext = () => {
        console.log(answers)
        setCurrentIndex((currentIndex + 1) % questions.length);
    };

    const handlePrevious = () => {
        console.log(answers)
        setCurrentIndex((currentIndex - 1 + questions.length) % questions.length);
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

    if (!questions.length) return <div>Loading...</div>;

    return (
        <div className='container px-4 mx-auto prose flex flex-col min-h-screen sm:block'>
            <div className='text-right'>
                <button className='btn btn-ghost btn-circle text-3xl font-light m-4'
                    onClick={() => document.getElementById('my_modal_1').showModal()}>X</button>
            </div>
            <hr className='mt-0' />
            <h4>{`Q ${currentIndex + 1}: ${questions[currentIndex].text}`}</h4>
            <div className='my-6'>
                {questions[currentIndex].options.map((option, index) => (
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
            <div className='grid-cols-3 grid gap-4 mt-auto mb-10 md:flex md:justify-between'>
                <button onClick={handlePrevious} disabled={currentIndex === 0} className='btn md:flex-inital'>Previous</button>
                <button onClick={handleClear} className='btn btn-ghost'>Clear</button>
                {currentIndex < questions.length - 1 && <button onClick={handleNext} disabled={currentIndex === questions.length - 1} className='btn btn-primary md:flex-initial'>Next</button>}
                {currentIndex === questions.length - 1 && <button onClick={handleSubmit} className='btn btn-primary md:flex-initial'>Submit</button>}
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