import React, {useState} from 'react';
import { motion } from 'framer-motion';

function MultiChoice() {
  // TODO: handle if length of left and right are different

  const [left, setLeft] = useState(DEFAULT_QUESTION.leftOptions);
  const [rightOption] = useState(DEFAULT_QUESTION.rightOptions); // just for showing the option on the right side in background, is never modified by user
  const [right, setRight] = useState(Array(left.size).fill(null)); // actually stores the data on the right side and keeps modifying
  const [currentActive, setCurrentActive] = useState(-1); // keeps track on which right droppable is the option dragged over currently

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("optionDetail", JSON.stringify(option));
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (right[index]) return;
    setCurrentActive(index);
  };

  const handleDragLeave = (e) => {
    setCurrentActive(-1);
  }

  const handleDragEnd = (e, index) => {
    if (right[index]) return;
    const optionDetail = JSON.parse(e.dataTransfer.getData("optionDetail"));
    if (index === rightOption.length) {
      setLeft((pv) => [...pv, optionDetail]);
      const rightIndex = right.findIndex((c) => c?.id === optionDetail.id);
      const newRight = [...right];
      newRight[rightIndex] = null;
      setRight(newRight);
    } else {
      const newRight = [...right];
      newRight[index] = optionDetail;
      setRight(newRight);
      setLeft((pv) => pv.filter((c) => c.id !== optionDetail.id));
    }
    setCurrentActive(-1);
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
              return <LeftOption key={leftOption.id} {...leftOption} handleDragStart={handleDragStart}/>
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
                    <LeftOption key={right[index]?.id} id={right[index]?.id} text={right[index]?.text} handleDragStart={handleDragStart}/>
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

const LeftOption = ({id, text, handleDragStart}) => {
  return (
    <motion.div draggable="true"
      layout
      layoutId={id}
      onDragStart={(e) => handleDragStart(e, {id, text})}
      className="cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing mb-2 w-full">
      <p className="">{text}</p>
    </motion.div>
  );
};

const DEFAULT_QUESTION = {
  "explanation": "Explanation 1",
  "id": "11",
  "leftOptions": [
    {
      "id": "1",
      "text": "Karachi"
    },
    {
      "id": "2",
      "text": "Delhi"
    },
    {
      "id": "3",
      "text": "Kathmandu"
    },
    {
      "id": "4",
      "text": "Columbo"
    }
  ],
  "rightOptions": [
    {
      "id": "5",
      "text": "India"
    },
    {
      "id": "6",
      "text": "Sri-Lanka"
    },
    {
      "id": "7",
      "text": "Paxtan"
    },
    {
      "id": "8",
      "text": "Nepal"
    }
  ],
}

export default MultiChoice;
