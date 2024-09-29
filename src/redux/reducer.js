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
    default:
      return state;
  }
};
