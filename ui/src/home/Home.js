import React from 'react';
import TestCard from '../test-card/TestCard';
import Nav from '../common/Nav';

function Home() {
    const tests = [];
    return (
        <div>
            <Nav/>
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