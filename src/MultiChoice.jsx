import React, {useState} from 'react';

function MultiChoice() {
  // TODO: handle if length of left and right are different

  const [left, setLeft] = useState(DEFAULT_QUESTION.leftOptions);
  const [rightOption, setRightOption] = useState(DEFAULT_QUESTION.rightOptions);
  const [right, setRight] = useState(Array(left.size).fill(null));

  return (
    <div className="flex">
      <div className="w-80 shrink-0">
        <div className="transition-colors w-full items-center justify-between">
         {
            left.map((leftOption) => {
              return <Draggable key={leftOption.id} {...leftOption} />
            })
          }
        </div>   
      </div>
      <div className="ml-16 w-80 shrink-0 bg-neutral-300/50">
        {
          rightOption.map((rightOption, index) => {
            return <Droppable text={rightOption.text} index={index} setRight={setRight}  />
          })
        }
      </div>
    </div>
  );
}

const Draggable = ({id, text}) => {
  return (
    <div className="cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing mb-2"><p className="">{text}</p></div>
  );
};

const Droppable = ({text, index, setRight}) => {
  const [active, setActive] = useState(false);
  
  return <div className={`relative rounded w-full h-16  flex items-center justify-content border mb-2 p-3 ${active ? "border-orange-500 bg-yellow-300 text-orange-500" : "bg-gray-200 border-gray-900"}`}>
    <div className="absolute insert-0 flex items-center justify-center text-gray-900 font-bold opacity-20 ">{text}</div>
  </div>
}


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