import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();
    const onHeroBtnClick = () => {
        navigate('/test/1251');
    }

    return (
        <div className='not-prose flex flex-col min-h-screen'>
            <div className='container mx-auto'>
            <nav className='navbar w-full'>
                <div>
                    <h1 className='text-2xl'>
                        edzest <span className='font-light'>exams</span>
                        <div className="tooltip tooltip-right" data-tip="this application is under active development">
                            <div className="badge badge-secondary badge-outline badge-xs align-super m-2">alpha</div>
                        </div>
                    </h1>
                </div>
            </nav>

            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        alt="hero-img"
                        src="/form-bg.png"
                        className="max-w-sm rounded-lg shadow-xl" />
                    <div>
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

            <div className='bg-base-200 mt-auto'>
            <footer className="footer bg-base-200 text-base-content p-10 container mx-auto">
                <aside>
                    <img alt="logo" src="/edzest_logo.webp" width="100" />
                    <p>
                        <b>Edzest Education Services (OPC) Pvt.Ltd</b>
                        <br />
                        SY no. 42, Near J R Layout Haralur, <br />
                        Bengaluru- 560102, Karnataka, India
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover" href="https://www.edzest.org" target='_blank' rel="noreferrer">Edzest Website</a>
                    <a className="link link-hover" href="https://courses.edzest.org/" target='_blank' rel="noreferrer">PMP training courses</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Contact</h6>
                    <p>+91 9673332684</p>
                    <a className="link link-hover" href='mailto:contact@edzest.org'>contact@edzest.org</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <a className="link link-hover" href='https://www.linkedin.com/company/edzest/' target='_blank' rel="noreferrer">LinkedIn</a>
                    <a className="link link-hover" href='https://www.instagram.com/edzest_org/' target='_blank' rel="noreferrer">Instagram</a>
                    <a className="link link-hover" href='https://www.youtube.com/c/EdzestEducationServices' target='_blank' rel="noreferrer">Youtube</a>
                </nav>
            </footer>
            </div>
        </div>
        
    );
}

export default Home;