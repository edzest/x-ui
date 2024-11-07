import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from '../common/Nav';
import Footer from '../common/Footer';

function TestResult() {
    const location = useLocation();
    const result = location.state ? location.state.result : {
        score: 4,
        total: 5,
        answerSheet: []
    };

    const percent = (result.score / result.total * 100).toFixed(2);

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='container mx-auto '>
                <Nav />
                <div className='text-center border p-4'>
                    {/* radial score */}
                    <div className="radial-progress bg-primary text-primary-content border-primary"
                        style={{ "--value": percent, "--size": "12rem", "--thickness": "1rem", "borderWidth": "10px" }}
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
                    <br />
                    <p className="prose mx-auto">
                        Thanks for taking our demo test. You can now view the detailed solutions.
                    </p>
                    <br />
                    <Link to="/solution">
                        <button className='btn btn-primary m-2'>View Solution</button>
                    </Link>

                    <Link to="/">
                        <button className='btn btn-link m-2'>Back to Home</button>
                    </Link>

                    <br />

                </div>
            </div>
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>
    );
}

export default TestResult;