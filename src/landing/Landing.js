import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../common/Nav';
import Footer from '../common/Footer';

function Home() {

    const navigate = useNavigate();
    const onHeroBtnClick = () => {
        navigate('/test/1251');
    }

    return (
        <div className='not-prose flex flex-col min-h-screen'>
            <div className='container mx-auto'>
                <Nav />

                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img
                            alt="hero-img"
                            src="/form-bg.png"
                            className="hidden lg:block max-w-md rounded-lg shadow-xl" />
                        <div className='mt-20 h-screen md:h-full md:mt-0'>
                            <h1 className="text-5xl font-normal">Ace your PMP<span className='align-super'>®</span> exams with
                                <span className='font-bold'> Confidence</span>.</h1>
                            <p className="py-6">
                                Take a free demo test to experience our test platform and schedule a call with our expert instructor to
                                review your results and get personalized guidance.
                            </p>
                            <button className="btn btn-primary" onClick={() => onHeroBtnClick()}>Start Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>

    );
}

export default Home;