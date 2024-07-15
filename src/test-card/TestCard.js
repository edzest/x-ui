import React from 'react';
import { Link } from 'react-router-dom';

function TestCard({ id, name, shortDescription, metadata }) {
    return (
        <div className='test-card'>
            <p style={{ color: '#888', fontWeight: 'bolder' }}>
                {id}
            </p>
            <Link to={`/test/${id}`}>
                <h2>{name}</h2>
            </Link>
            <p>{shortDescription}</p>
            <div>
                <span>{metadata.totalQuestions} questions</span>
                <span>{metadata.totalMarks} marks</span>
                <span>{metadata.totalTime} seconds</span>
            </div>
        </div>
    );
}

export default TestCard;