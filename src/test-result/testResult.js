import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from '../common/Nav';
import Footer from '../common/Footer';

function TestResult() {
    const location = useLocation();
    const result = location.state ? location.state.result : {
        score: 7,
        total: 10,
        answerSheet: []
    };

    const percent = result.score / result.total * 100;

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='container mx-auto '>
                <Nav />
                <div className='text-center border p-4'>
                    {/* radial score */}
                    <div className="radial-progress bg-primary text-primary-content border-primary"
                        style={{ "--value": percent, "--size": "12rem", "--thickness": "1rem", "border-width": "10px" }}
                        role="progressbar">
                        <p className='text-3xl font-bold'>{percent}%</p>
                    </div>

                    <div className='max-w-xs mx-auto'>
                        <div className='flex p-2 m-2 justify-between'>
                            <h2 className='font-bold'>CORRECT</h2>
                            <p>{result.score}</p>
                        </div>
                        <div className='flex p-2 m-2 justify-between'>
                            <h2 className='font-bold'>TOTAL</h2>
                            <p>{result.total}</p>
                        </div>
                        
                    </div>

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
                    <br />
                    <Link to="/">
                        <button className='btn btn-primary'>View Solution</button>
                    </Link>
                </div>
                
            </div>
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>
    );
}

export default TestResult;