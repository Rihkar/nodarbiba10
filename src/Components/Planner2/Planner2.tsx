import React, { useState } from 'react';
import './Planner2.scss';

type TasksListsDetails = {
    title: string
    isDone: boolean
    isEdited: boolean
    priority:string
};

const Planner2 = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasksLists, setTasksLists] = useState<TasksListsDetails[]>([]);
  const [finalValue, setFinalValue] = useState<TasksListsDetails[]>([]);
  const [priorityValue, setPriorityValue] = useState('High');

  const edit = (index:number) => {
    const newArray = [...finalValue];
    newArray[index].isEdited = true;
    return newArray;
  };
  const getUnedited = (index:number) => {
    const newArray = [...finalValue];
    newArray[index].isEdited = false;
    newArray[index].title = inputValue;
    return newArray;
  };

  const getOriginalInputValue = (index:number) => {
    const newArray = [...finalValue];
    newArray[index].isEdited = false;
    newArray[index].title = finalValue[index].title;
    return newArray;
  };
  const buttArr = [
    {
      title: 'All',
      action: () => {
        setTasksLists(finalValue);
      },
    },
    {
      title: 'In progress',
      action: () => {
        const inProgressTasks = finalValue.filter((item) => !item.isDone);
        setTasksLists(inProgressTasks);
      },
    },
    {
      title: 'Completed',
      action: () => {
        const inCompletedTasks = finalValue.filter((item) => item.isDone);
        setTasksLists(inCompletedTasks);
      },
    },
  ];

  const priorityButtons = [
    {
      title: 'High Prio',
      action: () => {
        setTasksLists(finalValue.filter((element) => element.priority === 'High'));
      },
    },
    {
      title: 'Medium Prio',
      action: () => {
        setTasksLists(finalValue.filter((element) => element.priority === 'Medium'));
      },
    },
    {
      title: 'Low Prio',
      action: () => {
        setTasksLists(finalValue.filter((element) => element.priority === 'Low'));
      },
    },
  ];

  const completed = (index: number) => {
    const newtasksLists = [...finalValue];
    newtasksLists[index].isDone = !newtasksLists[index].isDone;
    return newtasksLists;
  };
  const cancelTask = (index:number) => {
    const arrayCopy = [...tasksLists];
    arrayCopy.splice(index, 1);
    setTasksLists(arrayCopy);
  };

  return (
    <div className="planner-container">
      <div>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => (
              setInputValue(event.target.value)
            )}
          />
          <select onChange={(event) => setPriorityValue(event.target.value)} name="priority" id="priority">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            onClick={() => {
              if (inputValue) {
                setTasksLists([...tasksLists, {
                  title: inputValue, isDone: false, isEdited: false, priority: priorityValue,
                }]);
                setFinalValue([...finalValue, {
                  title: inputValue, isDone: false, isEdited: false, priority: priorityValue,
                }]);
                setInputValue('');
              }
            }}
          >
            add
          </button>
        </div>
        <div className="ProgressBarBox">
          {finalValue.map((element) => (element.isDone
            ? <div style={{ order: '0', backgroundColor: 'pink' }} className="ProgressBarUnit" />
            : <div style={{ order: '1' }} className="ProgressBarUnit" />))}
        </div>

      </div>

      {tasksLists.map(({
        title, isDone, isEdited, priority,
      }, index) => (
        isEdited ? (
          <div>
            <input
              type="text"
              value={inputValue}
              placeholder={title}
              onChange={(e) => { setInputValue(e.target.value); }}
            />
            <button
              onClick={() => {
                setTasksLists(getUnedited(index));
                setInputValue('');
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setTasksLists(getOriginalInputValue(index));
              }}
            >
              Cancel
            </button>
          </div>
        ) : (

          <div className="individualTaskBox" key={title}>
            <div className={priority}>
              <input
                checked={isDone}
                type="checkbox"
                onChange={() => {
                  setTasksLists(completed(index));
                }}
              />
              {isDone ? <s>{title}</s> : title}

            </div>

            <div className="editAndCloseBox">

              <button onClick={() => {
                setFinalValue(edit(index));
                setTasksLists(edit(index));
              }}
              >
                edit
              </button>

              <button
                onClick={() => {
                  setTasksLists(tasksLists.filter((_, i) => i !== index));
                  setFinalValue(tasksLists.filter((_, i) => i !== index));
                }}
              >
                X
              </button>

            </div>

          </div>

        )))}

      <div className="bottom-button-box">
        <div className="prio-buttons">
          {priorityButtons.map((element) => (
            <button onClick={element.action}>
              {element.title}
            </button>
          ))}
        </div>

        <div className="bottom-buttons">
          {buttArr.map((el) => (
            <button
              onClick={el.action}
            >
              {el.title}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
export default Planner2;
