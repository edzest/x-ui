
/*
answer = [1,2]
*/
function MultiSelectQuestion({questionNumber, question, selectedAnswerIds, onAnswerChange}) {
    const handleOnChange = (event) => {
        const selectedAnswerId = event.target.value;
        if (selectedAnswerIds.has(selectedAnswerId)) {
            selectedAnswerIds.delete(selectedAnswerId)
        } else {
            selectedAnswerIds.add(selectedAnswerId)
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
                                    checked={selectedAnswerIds.has(option.id)}
                                    onChange={handleOnChange}
                                    value={option.id} />
                                {option.text}
                            </label>
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default MultiSelectQuestion;