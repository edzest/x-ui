import React from 'react';
import { useLocation } from 'react-router-dom';
import './testResult.css';

function TestResult() {
    const location = useLocation();
    const result = location.state.result;

    return (
        <div className='test-result-container'>
            <h3>You scored: {result.score} / {result.total}</h3>
            {result.answerSheet.map((item, index) => (
                <div key={index}>
                    <h4>Q {index + 1}: {item.question.text}</h4>
                    <ul>
                        {item.question.options.map((option, i) => (
                            <li key={i}>
                                {option.text}
                                {option.id === item.question.correctOptionId && <b> [Correct]</b>}
                                {option.id === item.selectedAnswerId && <b> [Selected]</b>}
                            </li>
                        ))}
                    </ul>
                    <p>Explanation: {item.question.explanation}</p>
                </div>
            ))}
        </div>
    );
}

export default TestResult;