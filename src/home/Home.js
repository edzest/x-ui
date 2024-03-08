import React, { useEffect, useState } from 'react';
import './Home.css';
import TestCard from './TestCard';

function Home() {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetch('/tests', {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
            }
        })
            .then(response => response.json())
            .then(data => setTests(data.tests))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='home'>
            <h1>Exam Platform</h1>
            {tests.map((test, index) => (
                <div key={index}>
                    <TestCard id={test.id} name={test.name}
                        shortDescription={test.shortDescription} metadata={test.metadata} />
                    <br /><br />
                </div>
            ))}
        </div>
    );
}

export default Home;