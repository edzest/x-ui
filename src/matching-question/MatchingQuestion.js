import {React, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './MatchingQuestion.css';
import { TEST } from '../constants/constants';

const MatchingQuestion = () => {
  const leftOptions = TEST[0].matchingQuestions[0].leftOptions;
  const rightOptions = TEST[0].matchingQuestions[0].rightOptions;
  const initialRightItems = [null, null, null, null];

  const [leftItems, setLeftItems] = useState(leftOptions);
  const [rightItems, setRightItems] = useState(initialRightItems);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, do nothing
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      if (source.droppableId === 'left-pane') {
        const leftCopy = Array.from(leftItems);
        const [movedItem] = leftCopy.splice(source.index, 1);
        leftCopy.splice(destination.index, 0, movedItem);
        setLeftItems(leftCopy);
      }
    } else {
      if (source.droppableId === 'left-pane' && destination.droppableId.startsWith('right-pane')) {
        const destIndex = parseInt(destination.droppableId.split('-')[2]);
        if (rightItems[destIndex] === null) {
          const newLeftItems = Array.from(leftItems);
          const [movedItem] = newLeftItems.splice(source.index, 1);
          const newRightItems = Array.from(rightItems);
          newRightItems[destIndex] = movedItem;
          setLeftItems(newLeftItems);
          setRightItems(newRightItems);
        } else {
          const newLeftItems = Array.from(leftItems);
          const newRightItems = Array.from(rightItems);
          const [movedItem] = newLeftItems.splice(source.index, 1);
          const [alreadyPlacedItem] = newRightItems.splice(destIndex, 1, movedItem);
          newLeftItems.push(alreadyPlacedItem);
          setLeftItems(newLeftItems);
          setRightItems(newRightItems);
        }
      } else if (source.droppableId.startsWith('right-pane') && destination.droppableId === 'left-pane') {
        const sourceIndex = parseInt(source.droppableId.split('-')[2]);
        const newLeftItems = Array.from(leftItems);
        const newRightItems = Array.from(rightItems);
        const [movedItem] = newRightItems.splice(sourceIndex, 1, null);
        newLeftItems.splice(destination.index, 0, movedItem);
        setLeftItems(newLeftItems);
        setRightItems(newRightItems);
      } else if (source.droppableId.startsWith('right-pane') && destination.droppableId.startsWith('right-pane')) {
        const newRightItems = Array.from(rightItems);
        const sourceIndex = parseInt(source.droppableId.split('-')[2]);
        const destIndex = parseInt(destination.droppableId.split('-')[2])
        const [movedItem] = newRightItems.splice(sourceIndex, 1, null);
        if (newRightItems[destIndex] == null) {
          newRightItems[destIndex] = movedItem;
        } else {
          const temp = newRightItems[destIndex];
          newRightItems[destIndex] = movedItem;
          newRightItems[sourceIndex] = temp;
        }
        setRightItems(newRightItems);
      }
    }
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="left-pane">
          {(provided) => (
            <div className="left-pane" ref={provided.innerRef} {...provided.droppableProps}>
              {leftItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="draggable-item"
                    >
                      {item.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="right-pane">
          {rightItems.map((item, index) => (
            <Droppable key={index} droppableId={`right-pane-${index}`}>
              {(provided, snapshot) => (
                <div className={`droppable-box ${snapshot.isDraggingOver ? 'highlight' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                  {item ? (
                    <Draggable key={item.id} draggableId={item.id} index={0}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="draggable-item"
                        >
                          {item.text}
                        </div>
                      )}
                    </Draggable>
                  ) : (
                    <div className="placeholder">{rightOptions[index].text}</div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default MatchingQuestion;