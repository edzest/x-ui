import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='bg-base-200'>
            <footer className="footer bg-base-200 text-base-content p-10 container mx-auto">
                <aside>
                    <Link to="https://www.edzest.org/" target="_blank">
                        <img alt="logo" src="/edzest_logo.webp" width="100" />
                    </Link>
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
    );
}

export default Footer;