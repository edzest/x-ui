import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './questionnaire.css';
import { TEST } from './constants/constants';

function Questionnaire() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams()

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

    const handleOptionChange = (event) => {
        setAnswers({
            ...answers,
            [currentIndex + 1]: event.target.value
        });
    };

    const handleSubmit = () => {
        console.log(answers);
        new Promise((resolve, reject) => {
            resolve({
                name: "Something",
                score: 9,
                total: 10,
                answerSheet: []
            });
        })
        .then(data => {
            console.log(data);
            navigate('/result', { state: {result: data} });
        })
        .catch(error => console.error(error));
    };

    if (!questions.length) return <div>Loading...</div>;

    return (
        <div className='questionnaire-container'>
            <h2>{`Q ${currentIndex + 1}: ${questions[currentIndex].text}`}</h2>
            {questions[currentIndex].options.map((option, index) => (
                <div key={index}>
                    <label>
                        <input type="radio"
                            value={option.id}
                            checked={answers[currentIndex + 1] === option.id}
                            onChange={handleOptionChange} />
                        {option.text}
                    </label>
                </div>
            ))}
            <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
            <button onClick={handleNext} disabled={currentIndex === questions.length - 1}   >Next</button>
            {currentIndex === questions.length - 1 && <button onClick={handleSubmit}>Submit</button>}
        </div>
    );
}

export default Questionnaire;