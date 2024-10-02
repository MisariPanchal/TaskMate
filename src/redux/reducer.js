const initialState = {
  openToDo: [
    { id:1,title: "Task 1", description: "This is an open task." },
    { id:2,title: "Task 2", description: "Another open task." },
  ],
  inProgressToDo: [
    { id:3,title: "Task 3", description: "This task is in progress." },
    { id:4,title: "Task 4", description: "Another task in progress." },
  ],
  completedToDo: [
    { id:5,title: "Task 5", description: "This task is completed." },
    { id:6,title: "Task 6", description: "Another completed task." },
  ],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        openToDo: [...state.openToDo, action.payload],
      };
    case "MOVE_TASK":
      const {task, fromList, toList} = action.payload;
      //remove task 
      const updatedFromList = state[fromList].filter((todo)=>todo.id !== task.id)
      //add task
      const updatedToList = [...state[toList], task];
      return{
        ...state,
        [fromList]:updatedFromList,
        [toList]:updatedToList
      }
      case "MOVE_PROGRESS":
        const removeList = state.openToDo.filter((item)=>item.id !== action.payload.id);
        const addList = [...state.inProgressToDo, action.payload]
        return{
          ...state,
          openToDo:removeList,
          inProgressToDo:addList
        }
        case "MOVE_COMPLETE":
        const removedList = state.inProgressToDo.filter((item)=>item.id !== action.payload.id);
        const addedList = [...state.completedToDo, action.payload]
        return{
          ...state,
          inProgressToDo:removedList,
          completedToDo:addedList
        }
      case "DELETE_TASK":
        const updatedList = state[action.payload.list].filter((item)=>item.id !== action.payload.taskId);
        return {
        ...state,
        [action.payload.list]:updatedList
      }
      case "EDIT_TASK":
      return {
        ...state,
        [action.payload.list]: state[action.payload.list].map(task =>
          task.id === action.payload.task.id ? action.payload.task : task
        ),
      };
      case "REORDER_TASK":
        const {todo, list, direction} = action.payload;
        const todoList = [...state[list]];
        const todoIndex = todoList.findIndex((item)=>item.id === todo.id);

        if(direction === 'up' &&  todoIndex > 0){
          [todoList[todoIndex], todoList[todoIndex-1]] = [todoList[todoIndex-1], todoList[todoIndex]];
        }
        else if(direction === 'down' && todoIndex < todoList.length-1){
          [todoList[todoIndex], todoList[todoIndex+1]] = [todoList[todoIndex+1], todoList[todoIndex]];
        }

        return {
          ...state,
          [list] : todoList 
        }
        
    default:
      return state;
  }
};
