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