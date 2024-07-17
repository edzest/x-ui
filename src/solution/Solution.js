import React, { useState } from 'react';
import Nav from '../common/Nav';
import { useLocation, useNavigate } from 'react-router-dom';
import { ASNWER_SHEET } from '../constants/constants';

function Solution() {
    const location = useLocation();
    const navigate = useNavigate();
    const answerSheet = location.state ? location.state.answerSheet : ASNWER_SHEET;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % answerSheet.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + answerSheet.length) % answerSheet.length);
    };

    return (
        <div>
            <div className='container mx-auto'>
                <Nav />
            </div>
            <div className='container px-4 mx-auto prose'>

                <div>
                    <div className='text-right'>
                        <button onClick={() => navigate(-1)} className='btn btn-ghost btn-circle text-3xl font-light m-4'>X</button>
                    </div>
                    <hr className='mt-0' />
                    <h4>{`Q ${currentIndex + 1}: ${answerSheet[currentIndex].question.text}`}</h4>
                    <div className='my-6'>
                        {answerSheet[currentIndex].question.options.map((option, index) => (
                            <div key={index}>
                                <label className='flex my-3'>
                                    <input type="radio"
                                        className='radio radio-primary mr-3'
                                        value={option.id}
                                        checked={option.id === answerSheet[currentIndex].question.correctOptionId}
                                        disabled />
                                    {option.text}
                                </label>
                            </div>
                        ))}
                    </div>
                    <h4 className='font-bold'>EXPLANATION</h4>
                    <p>{answerSheet[currentIndex].question.explanation}</p>
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