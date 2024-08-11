import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MatchingQuestion = ({ questionNumber, question, selectedAnswer = {}, onAnswerChange}) => {

  // set item to dataTransfer object, item contains id, text and dragAreaIdx
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDropLeft = (e) => {
    const droppedItem = JSON.parse(e.dataTransfer.getData("application/json"));
    console.log(`dropped in left side, ${JSON.stringify(droppedItem)}`)
    if (!leftItems.some(i => i.props.id === droppedItem.id)) {
      // dragged from right and dropped in left
      setLeftItems(prevLeftItems => {
        return [
          ...prevLeftItems,
          <DraggableOption key={crypto.randomUUID()}
            id={droppedItem.id}
            text={droppedItem.text}
            dropAreaIdx={question.leftOptions.length}
            handleDragStart={handleDragStart} />
        ]
      })
      setRightItems(prevRightItems => {
        return prevRightItems.map(item => {
          // Find the corresponding item on the right and replace it with RightAnswerArea
          if (item.props.id === droppedItem.id) {
            console.log("item props id ", item.props.id)
            console.log("droppedItem", JSON.stringify(droppedItem))
            const correspondingRightOption = question.rightOptions[droppedItem.dropAreaIdx]
            console.log(JSON.stringify(correspondingRightOption))
            return (
              <RightAnswerArea
                key={crypto.randomUUID()}
                id={correspondingRightOption.id}
                text={correspondingRightOption.text}
                dropAreaIdx={item.props.dropAreaIdx}
                handleDragOver={handleDragOver}
                handleOnDropRight={handleOnDropRight}
              />
            );
          }
          return item;
        });
      });
      delete selectedAnswer[droppedItem.id];
      console.log("selectedAnswer ", selectedAnswer)
      onAnswerChange(selectedAnswer)
    }
  }

  const handleOnDropRight = (e, dropAreaIdx) => {
    const droppedItem = JSON.parse(e.dataTransfer.getData("application/json"));
    console.log(`dropped in right side dropIdx=${dropAreaIdx} item=${JSON.stringify(droppedItem)}`)
    if (droppedItem.dropAreaIdx === question.leftOptions.length) {
      // dropped from left to right
      setLeftItems(prevLeftItems => {
        const leftPos = prevLeftItems.findIndex(item => item.props.id === droppedItem.id)
        console.log("left pos ", leftPos)
        return prevLeftItems.toSpliced(leftPos, 1)
      })
      setRightItems(prevRightItems => prevRightItems.toSpliced(dropAreaIdx, 1, <DraggableOption key={crypto.randomUUID()}
        id={droppedItem.id}
        text={droppedItem.text}
        dropAreaIdx={dropAreaIdx}
        handleDragStart={handleDragStart} />
      ))
    } else {
      // moved up & down
      const from = droppedItem.dropAreaIdx
      const to = dropAreaIdx
      const correspondingRightOption = question.rightOptions[from]
      setRightItems(prevRightItems => {
        prevRightItems
          .toSpliced(from, 1, <DraggableOption key={crypto.randomUUID()}
            id={droppedItem.id}
            text={droppedItem.text}
            dropAreaIdx={dropAreaIdx}
            handleDragStart={handleDragStart} />)
          .toSpliced(to, 1, <RightAnswerArea
            key={crypto.randomUUID()}
            id={correspondingRightOption.id}
            text={correspondingRightOption.text}
            dropAreaIdx={dropAreaIdx}
            handleDragOver={handleDragOver}
            handleOnDropRight={handleOnDropRight}
          />)
      })
    }
    selectedAnswer[droppedItem.id] = question.rightOptions[dropAreaIdx]?.id;
    console.log("selectedAnswer ", selectedAnswer)
    onAnswerChange(selectedAnswer)
  }

  const [leftItems, setLeftItems] = useState(question.leftOptions.filter(option => !(option.id in selectedAnswer)).map(option => {
    return <DraggableOption
      key={crypto.randomUUID()}
      id={option.id}
      text={option.text}
      dropAreaIdx={question.leftOptions.length}
      handleDragStart={handleDragStart}
    />
  }));

  const [rightItems, setRightItems] = useState(question.rightOptions.map((option, index) => {
    let leftId = Object.entries(selectedAnswer).find(([key, val]) => val === option.id)?.[0]
    if (leftId !== undefined) {
      const leftOption = question.leftOptions.find(o => o.id === leftId)
      return <DraggableOption id={leftOption.id}
        key={crypto.randomUUID()}
        text={leftOption.text}
        dropAreaIdx={index}
        handleDragStart={handleDragStart} />
    } else {
      return <RightAnswerArea
        key={crypto.randomUUID()}
        id={option.id}
        text={option.text}
        dropAreaIdx={index}
        handleDragOver={handleDragOver}
        handleOnDropRight={handleOnDropRight} />
    }
  }));

  return (
    <div>
      <h4>{`Q ${questionNumber}: ${question.text}`}</h4>

      <div className="flex my-6">
        <div className="flex-1 mr-1 p-2"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={e => handleOnDropLeft(e)}>
          <div className='grid grid-cols-1 gap-3'>
            {
              leftItems.map(i => i)
            }
          </div>
        </div>
        <div className="flex-1 ml-1 p-2">
          <div className='grid grid-cols-1 gap-3'>
            {
              rightItems.map(i => i)
            }
          </div>
        </div>
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
      <div className='bg-base-100 shadow cursor-grab p-3 border w-full'>
        {text}
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
      {text}
    </div>
  )
}

export default MatchingQuestion;
