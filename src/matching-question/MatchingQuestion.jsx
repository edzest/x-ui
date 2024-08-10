import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MatchingQuestion = ({ questionNumber, question, selectedAnswer, onAnswerChange }) => {
  const initializeLeft = (leftOptions, selectedAnswer) => {
    if (selectedAnswer?.length > 0) {
      // return only elements in left leftQuestion which does not exist in selectedAnswer[i].letIndex
      return leftOptions.filter((option) => !selectedAnswer.find((a) => a.leftId === option.id));
    } else {
      return leftOptions;
    }
  }

  const initializeRight = (leftOptions, rightOptions, selectedAnswer) => {
    const rightValue = Array(leftOptions.length).fill(null);
    if (selectedAnswer?.length > 0) {
      selectedAnswer.forEach(selectedAnswer => {
        const rightIndex = rightOptions.findIndex((a) => a.id === selectedAnswer.rightId);
        const leftOption = leftOptions.find((a) => a.id === selectedAnswer.leftId);
        rightValue[rightIndex] = leftOption;
      });
    }
    return rightValue;
  }

  const [left, setLeft] = useState(initializeLeft(question.leftOptions, selectedAnswer));
  const [rightOptions] = useState(question.rightOptions); // just for showing the option on the right side in background, is never modified by user
  const [right, setRight] = useState(initializeRight(question.leftOptions, question.rightOptions, selectedAnswer)); // actually stores the data on the right side and keeps modifying
  const [currentActive, setCurrentActive] = useState(-1); // keeps track on which right droppable is the option dragged over currently



  useEffect(() => {
    updateNewAnswer();
  }, [right, left]);

  const handleDragStart = (e, option) => {
    console.log(JSON.stringify(option))
    e.dataTransfer.setData("optionDetail", JSON.stringify(option));
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (right[index] != null) { // if already an element, don't allow to drop
      return;
    }
    console.log("currentActive: ", index)
    setCurrentActive(index);
  };

  const handleDragLeave = (e) => {
    console.log("currentActive: ", -1)
    setCurrentActive(-1);
  }

  const handleDragEnd = (e, index) => {
    const optionDetail = JSON.parse(e.dataTransfer.getData("optionDetail"));
    if (optionDetail.source === index || right[index]) {
      // if there's already a value at the droppable or if option has same source and destination, do nothing and return
      console.log("currentActive: ", -1)
      setCurrentActive(-1);
      return;
    }
    if (index === rightOptions.length) {
      // dragging from right to left
      setLeft((pv) => [...pv, optionDetail]);
      const rightIndex = right.findIndex((c) => c?.id === optionDetail.id);
      const newRight = [...right];
      newRight[rightIndex] = null;
      setRight(newRight);
    } else {
      if (optionDetail.source < rightOptions.length && optionDetail.source < rightOptions.length) {
        // when moving from right to right side, just update right values
        const newRight = [...right];
        newRight[optionDetail.source] = null;
        newRight[index] = optionDetail;
        setRight(newRight);
      } else {
        // when moved from left to right
        const newRight = [...right];
        newRight[index] = optionDetail;
        setRight(newRight);
        setLeft((pv) => pv.filter((c) => c.id !== optionDetail.id));
      }
    }
    console.log("currentActive: ", -1)
    setCurrentActive(-1);
  }

  const updateNewAnswer = () => {
    const answers = [];
    right.forEach((option, index) => {
      if (option === null) return;
      answers.push({
        leftId: option.id,
        rightId: rightOptions[index].id
      });
    });
    onAnswerChange(answers);
  }

  return (
    <div>
      <h4>{`Q ${questionNumber}: ${question.text}`}</h4>

      <div className="flex my-6">
        <div className={`flex-1 mr-1 p-2 ${currentActive === rightOptions.length ? "border border-primary border-dashed bg-primary-content text-primary" : ""}`}
          onDragOver={(e) => handleDragOver(e, rightOptions.length)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDragEnd(e, rightOptions.length)}>
          <div className='grid grid-cols-1 gap-3'>
            {
              left.map((leftOption) => {
                return <DraggableOption
                  key={leftOption.id}
                  {...leftOption}
                  source={rightOptions.length}
                  handleDragStart={handleDragStart} />
              })
            }
          </div>
        </div>
        <div className="flex-1 ml-1 p-2">
          <div className='grid grid-cols-1 gap-3'>
            {
              rightOptions.map((rightOption, index) => {
                return <div key={rightOption.id} className={`rounded border shadow-inner w-full border ${currentActive === index ? "border-primary border-dashed bg-primary-content text-secondaryn" : ""}`}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDragEnd(e, index)}
                >
                  {
                    right[index] ? (
                      <DraggableOption key={right[index]?.id} id={right[index]?.id} source={index} text={right[index]?.text} handleDragStart={handleDragStart} />
                    ) : (
                      // <div className="absolute insert-0 flex justify-center">{rightOption.text}</div>
                      <div className='p-3 bg-base-200'>{rightOption.text}</div>
                    )
                  }
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const DraggableOption = ({ id, text, source, handleDragStart }) => {
  return (
    <motion.div
      layout
      layoutId={id}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, { id, source, text })}>
      <div className='bg-base-100 shadow cursor-grab p-3 border w-full'>
        {text}
      </div>
    </motion.div>
  );
};


export default MatchingQuestion;
