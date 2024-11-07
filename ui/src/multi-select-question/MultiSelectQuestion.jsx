
/*
answer = [1,2]
*/
function MultiSelectQuestion({ questionNumber, question, selectedAnswerIds = [], onAnswerChange, correctAnswer }) {
    const handleOnChange = (event) => {
        const selectedAnswerId = event.target.value;
        console.log("selected ", selectedAnswerId)
        const pos = selectedAnswerIds.findIndex(a => a === selectedAnswerId);
        if (pos >= 0) {
            selectedAnswerIds.splice(pos, 1)
        } else {
            selectedAnswerIds.push(selectedAnswerId)
        }
        onAnswerChange(selectedAnswerIds)
    }
    return (
        <div>
            <h4>{`Q ${questionNumber}: ${question.text}`}</h4>
            <div className='my-6'>
                {question.options.map((option, index) => (
                    <div key={index}>

                        <label className='flex my-3'>
                            <input type="checkbox"
                                className='checkbox checkbox-primary mr-3'
                                checked={selectedAnswerIds.some(id => id === option.id)}
                                onChange={handleOnChange}
                                disabled={correctAnswer}
                                value={option.id} />
                            {correctAnswer && correctAnswer.includes(option.id) && (
                                <div className="tooltip tooltip-right mr-2" data-tip="This is the correct answer">
                                    <span className='text-green-500'>✅</span>
                                </div>
                            )}
                            {option.text}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultiSelectQuestion;