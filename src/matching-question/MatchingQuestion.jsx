import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';

const MatchingQuestion = ({question, updateAnswer}) =>{
  const [left, setLeft] = useState(question.leftOptions);
  const [rightOption] = useState(question.rightOptions); // just for showing the option on the right side in background, is never modified by user
  const [right, setRight] = useState(Array(left.length).fill(null)); // actually stores the data on the right side and keeps modifying
  const [currentActive, setCurrentActive] = useState(-1); // keeps track on which right droppable is the option dragged over currently

  useEffect(() => {
    updateNewAnswer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [right, left]);

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("optionDetail", JSON.stringify(option));
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (right[index]) return; // if already an element, don't allow to drop
    setCurrentActive(index);
  };

  const handleDragLeave = (e) => {
    setCurrentActive(-1);
  }

  const handleDragEnd = (e, index) => {
    const optionDetail = JSON.parse(e.dataTransfer.getData("optionDetail"));
    if (optionDetail.source === index || right[index]) {
      // if there's already a value at the droppable or if option has same source and destination, do nothing and return
      setCurrentActive(-1);
      return;
    }
    if (index === rightOption.length) {
      // dragging from right to left
      setLeft((pv) => [...pv, optionDetail]);
      const rightIndex = right.findIndex((c) => c?.id === optionDetail.id);
      const newRight = [...right];
      newRight[rightIndex] = null;
      setRight(newRight);
    } else {
      if (optionDetail.source < rightOption.length && optionDetail.source < rightOption.length) {
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
    setCurrentActive(-1);
  }

  const updateNewAnswer = () => {
    const answers = [];
    right.forEach((option, index) => {
      if (option === null) return;
      answers.push({
        leftId: option.id,
        rightId: rightOption[index].id
      });
    });
    updateAnswer(answers);
  }
  

  return (
    <div className="flex">
      <div className="w-80 shrink-0">
        <div className={`transition-colors w-full items-center justify-between h-full ${currentActive === rightOption.length ? "border-orange-500 bg-yellow-300 text-orange-500" : "" }`}
          onDragOver={(e) => handleDragOver(e, rightOption.length)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDragEnd(e, rightOption.length)}
        >
         {
            left.map((leftOption) => {
              return <DraggableOption key={leftOption.id} {...leftOption} source={rightOption.length} handleDragStart={handleDragStart}/>
            })
          }
        </div>   
      </div>
      <div className="ml-16 w-80 shrink-0 bg-neutral-300/50">
        {
          rightOption.map((rightOption, index) => {
            return <div key={rightOption.id} className={`relative rounded w-full h-16  flex items-center justify-content border mb-2 p-3 ${currentActive === index ? "border-orange-500 bg-yellow-300 text-orange-500" : "bg-gray-200 border-gray-900"}`}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDragEnd(e, index)}
              >
                {
                  right[index] ? (
                    <DraggableOption key={right[index]?.id} id={right[index]?.id} source={index} text={right[index]?.text} handleDragStart={handleDragStart}/>
                  ) : (
                    <div className="absolute insert-0 flex items-center justify-center text-gray-900 font-bold opacity-20">{rightOption.text}</div>
                  )
                }
              </div>
          })
        }
      </div>
    </div>
  );
}

const DraggableOption = ({id, text, source, handleDragStart}) => {
  return (
    <motion.div draggable="true"
      layout
      layoutId={id}
      onDragStart={(e) => handleDragStart(e, {id, source, text})}
      className="cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing mb-2 w-full">
      <p className="">{text}</p>
    </motion.div>
  );
};


export default MatchingQuestion;