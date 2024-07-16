import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className='navbar w-full'>
            <div>
                <h1 className='text-2xl'>
                    <Link to={"/"}>
                    edzest <span className='font-light'>exams</span>
                    </Link>
                    <div className="tooltip tooltip-right" data-tip="this application is under active development">
                        <div className="badge badge-secondary badge-outline badge-xs align-super m-2">alpha</div>
                    </div>
                </h1>
            </div>
        </nav>
    );
}

export default Nav;