export const addTask = (task)=>{
  return {
    type:"ADD_TASK",
    payload:task
  }
}
export const moveTask = (task, fromList, toList)=>{
  return {
    type:"MOVE_TASK",
    payload:{task, fromList, toList}
  }
}
export const movetoProgress = (task)=>{
  return {
    type:"MOVE_PROGRESS",
    payload:task
  }
}
export const movetoComplete = (task)=>{
  return {
    type:"MOVE_COMPLETE",
    payload:task
  }
}
export const deleteTask = (taskId, list)=>{
  return {
    type:"DELETE_TASK",
    payload:{taskId, list}
  }
}
export const editTask = (taskName, listName) => {
  return {
    type: "EDIT_TASK",
    payload: {
      task:taskName,
      list:listName,
    },
  };
};
export const reorderTask = (todo, list, direction)=>{
  return{
    type:"REORDER_TASK",
    payload:{todo, list, direction}
  }
}
