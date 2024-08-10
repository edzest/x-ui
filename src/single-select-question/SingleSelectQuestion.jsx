import React from 'react';
/*
const question = {
        "text": "The agile team is in the project planning phase. The stakeholders have provided high-level requirements for a new software product. What should the product owner do next?",
        "options": [
          {
            "id": "1",
            "text": "Immediately halt the current work and start the new requirements."
          },
          {
            "id": "2",
            "text": "Inform the product owner and discuss the impact on the sprint goal."
          },
          {
            "id": "3",
            "text": "Continue with the current work and address the new requirements in the next sprint."
          },
          {
            "id": "4",
            "text": "Assign the new requirements to a separate team to handle concurrently."
          }
        ] 
    }
selectedAnswerId = '1'
*/
function SingleSelectQuestion({questionNumber, question, selectedAnswerId, onAnswerChange}) {
    
    const handleOptionChange = (event) => {
        selectedAnswerId = event.target.value
        onAnswerChange(selectedAnswerId)
    }
    
    return (
        <div>
            <h4>{`Q ${questionNumber}: ${question.text}`}</h4>
                <div className='my-6'>
                    {question.options.map((option, index) => (
                        <div key={index}>
                            <label className='flex my-3'>
                                <input type="radio"
                                    className='radio radio-primary mr-3'
                                    value={option.id}
                                    checked={option.id === selectedAnswerId}
                                    onChange={handleOptionChange} />
                                {option.text}
                            </label>
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default SingleSelectQuestion;