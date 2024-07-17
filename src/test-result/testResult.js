import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import { PopupButton } from "react-calendly";

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
                    <br />
                    <p className="prose mx-auto">
                        Thanks for taking our demo test. You can now view detailed solutions and schedule a one-on-one call with our expert
                        to review your result in detail.
                    </p>
                    <br />
                    <Link to="/solution">
                        <button className='btn btn-link m-2'>View Solution</button>
                    </Link>
                    {/* <button className='btn btn-primary m-2' onClick={() => {Calendly.initPopupWidget({url: 'https://calendly.com/piyushranjan95'}); return false;}}>Schedule a meeting</button> */}
                    <PopupButton
                    className='btn btn-primary'
                        url="https://calendly.com/piyushranjan95"
                        /*
                        * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
                        * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
                        */
                        rootElement={document.getElementById("root")}
                        text="Schedule a meeting"

                    />
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