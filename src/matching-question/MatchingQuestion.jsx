import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MatchingQuestion = ({ questionNumber, question, selectedAnswer = {}, onAnswerChange }) => {

  // set item to dataTransfer object, item contains id, text and dragAreaIdx
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDropRight = (e, dropAreaIdx) => {
    const droppedItem = JSON.parse(e.dataTransfer.getData("application/json"));
    const from = droppedItem.dropAreaIdx
    const to = dropAreaIdx

    if (from < question.leftOptions.length) {
      // dropped from left to right
      setLeftItems(prevLeftItems => {
        return prevLeftItems.toSpliced(
          from, 1, <EmptyDropArea key={`left-${from}`}
            dropAreaIdx={from}
            handleDragOver={handleDragOver}
            handleOnDropEmpty={handleOnDropEmpty} />)
      })
      setRightItems(prevRightItems => prevRightItems.toSpliced(to % question.leftOptions.length, 1, <DraggableOption
        key={`right-${to}`}
        id={droppedItem.id}
        text={droppedItem.text}
        dropAreaIdx={to}
        handleDragStart={handleDragStart} />
      ))
    } else {
      // moved up & down
      const correspondingRightOption = question.rightOptions[from % question.rightOptions.length]
      setRightItems(prevRightItems => {
        return prevRightItems
          .toSpliced(from % question.leftOptions.length, 1, <RightAnswerArea
            key={`right-${from}`}
            id={correspondingRightOption.id}
            text={correspondingRightOption.text}
            dropAreaIdx={from}
            handleDragOver={handleDragOver}
            handleOnDropRight={handleOnDropRight}
          />)
          .toSpliced(to % question.leftOptions.length, 1, <DraggableOption
            key={`right-${to}`}
            id={droppedItem.id}
            text={droppedItem.text}
            dropAreaIdx={to}
            handleDragStart={handleDragStart} />)
      })
    }
    selectedAnswer[droppedItem.id] = question.rightOptions[to % question.leftOptions.length]?.id;
    onAnswerChange(selectedAnswer)
  }

  const handleOnDropEmpty = (e, dropAreaIdx) => {
    const droppedItem = JSON.parse(e.dataTransfer.getData("application/json"));
    const from = droppedItem.dropAreaIdx;
    const to = dropAreaIdx;

    if (from < question.leftOptions.length) {
      // up-down in left side - no change in answer
      setLeftItems(prevLeftItems => {
        return prevLeftItems.toSpliced(
          from, 1, <EmptyDropArea
          key={`left-${from}`}
          dropAreaIdx={from}
          handleDragOver={handleDragOver}
          handleOnDropEmpty={handleOnDropEmpty} />
        ).toSpliced(to, 1, <DraggableOption
          key={`left-${to}`}
          id={droppedItem.id}
          text={droppedItem.text}
          dropAreaIdx={to}
          handleDragStart={handleDragStart} />)
      })
    } else {
      // dragged from right to left
      setLeftItems(prevLeftItems => {
        return prevLeftItems.toSpliced(to, 1,
          <DraggableOption
            key={`left-${to}`}
            id={droppedItem.id}
            text={droppedItem.text}
            dropAreaIdx={to}
            handleDragStart={handleDragStart} />)
      })
      setRightItems(prevRightItems => {
        const correspondingRightOption = question.rightOptions[from % question.leftOptions.length]
        return prevRightItems.toSpliced(from % question.leftOptions.length, 1,
          <RightAnswerArea
            key={`right-${from}`}
            id={correspondingRightOption.id}
            text={correspondingRightOption.text}
            dropAreaIdx={from}
            handleDragOver={handleDragOver}
            handleOnDropRight={handleOnDropRight}
          />)
      })
    }
    delete selectedAnswer[droppedItem.id]
    onAnswerChange(selectedAnswer)
  }

  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  useEffect(() => {
    // Update leftItems based on selectedAnswer
    const updatedLeftItems = question.leftOptions.map((option, index) => {
      if (selectedAnswer && option.id in selectedAnswer) {
        return <EmptyDropArea key={`left-${index}`} dropAreaIdx={index} handleDragOver={handleDragOver} handleOnDropEmpty={handleOnDropEmpty} />
      } else {
        return <DraggableOption
          key={`left-${index}`}
          id={option.id}
          text={option.text}
          dropAreaIdx={index}
          handleDragStart={handleDragStart}
        />
      }
    });
    setLeftItems(updatedLeftItems);

    // Update rightItems based on selectedAnswer
    const updatedRightItems = question.rightOptions.map((option, index) => {
      let leftId = Object.entries(selectedAnswer).find(([key, val]) => val === option.id)?.[0];
      if (leftId !== undefined) {
        const leftOption = question.leftOptions.find(o => o.id === leftId);
        return <DraggableOption id={leftOption.id}
          key={`right-${question.leftOptions.length + index}`}
          text={leftOption.text}
          dropAreaIdx={question.leftOptions.length + index}
          handleDragStart={handleDragStart} />
      } else {
        return <RightAnswerArea
          key={`right-${question.leftOptions.length + index}`}
          id={option.id}
          text={option.text}
          dropAreaIdx={question.leftOptions.length + index}
          handleDragOver={handleDragOver}
          handleOnDropRight={handleOnDropRight} />
      }
    });
    setRightItems(updatedRightItems);

  }, [question.leftOptions, question.rightOptions, selectedAnswer]);

  // const [leftItems, setLeftItems] = useState(question.leftOptions.map((option, index) => {
  //   if (selectedAnswer && option.id in selectedAnswer) {
  //     return <EmptyDropArea key={`left-${index}`} dropAreaIdx={index} handleDragOver={handleDragOver} handleOnDropEmpty={handleOnDropEmpty} />
  //   } else {
  //     return <DraggableOption
  //       key={`left-${index}`}
  //       id={option.id}
  //       text={option.text}
  //       dropAreaIdx={index}
  //       handleDragStart={handleDragStart}
  //     />
  //   }
  // }));

  // const [rightItems, setRightItems] = useState(question.rightOptions.map((option, index) => {
  //   if (!selectedAnswer) {
  //     selectedAnswer = {}
  //   }
  //   let leftId = Object.entries(selectedAnswer).find(([key, val]) => val === option.id)?.[0]
  //   if (leftId !== undefined) {
  //     const leftOption = question.leftOptions.find(o => o.id === leftId)
  //     return <DraggableOption id={leftOption.id}
  //       key={`right-${question.leftOptions.length + index}`}
  //       text={leftOption.text}
  //       dropAreaIdx={question.leftOptions.length + index}
  //       handleDragStart={handleDragStart} />
  //   } else {
  //     return <RightAnswerArea
  //       key={`right-${question.leftOptions.length + index}`}
  //       id={option.id}
  //       text={option.text}
  //       dropAreaIdx={question.leftOptions.length + index}
  //       handleDragOver={handleDragOver}
  //       handleOnDropRight={handleOnDropRight} />
  //   }
  // }));

  function* alternateIterator(leftItems, rightItems) {
    const maxLength = Math.max(leftItems.length, rightItems.length);
  
    for (let i = 0; i < maxLength; i++) {
      if (i < leftItems.length) {
        yield leftItems[i];
      }
      if (i < rightItems.length) {
        yield rightItems[i];
      }
    }
  }

  return (
    <div>
      {
    console.log("rendering matching question, selectedAnswer = ", selectedAnswer)}
      <h4>{`Q ${questionNumber}: ${question.text}`}</h4>

      <div className="grid grid-cols-2 gap-4 my-6 auto-rows-fr grid-cols-[1fr_3fr]">
        {[...alternateIterator(leftItems, rightItems)]}
      </div>
    </div>
  );
}

const DraggableOption = ({ id, text, dropAreaIdx, handleDragStart }) => {
  const option = { id: id, text: text, dropAreaIdx: dropAreaIdx }
  return (
    <motion.div
      layout
      layoutId={id}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, option)}>
      <div className='bg-base-100 shadow cursor-grab p-3 border w-full h-full'>
        {id}: {text}
      </div>
    </motion.div>
  );
};

const RightAnswerArea = ({ id, text, dropAreaIdx, handleDragOver, handleOnDropRight }) => {
  return (
    <div
      className='border p-3 bg-base-200 shadow-inner'
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleOnDropRight(e, dropAreaIdx)}>
      {id}: {text}
    </div>
  )
}

const EmptyDropArea = ({ dropAreaIdx, handleDragOver, handleOnDropEmpty }) => {
  return (
    <div className='border border-dashed p-3 shadow-inner'
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleOnDropEmpty(e, dropAreaIdx)}>
      {/* hack to set minimum height, hihihi 😈 */}
      <span className='text-base-100'>.</span>
    </div>
  )
}

export default MatchingQuestion;
