import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, moveTask, movetoComplete, movetoProgress, reorderTask } from '../redux/actions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const TaskList = () => {
  const dispatch = useDispatch();
  const openToDo = useSelector(state => state.reducer?.openToDo || []);
  const inProgressToDo = useSelector(state => state.reducer?.inProgressToDo || []);
  const completeToDo = useSelector(state => state.reducer?.completedToDo || []);

  const [draggable, setDraggable] = useState(null);

  const [selectDeletetask, setSelectDeleteTask] = useState(null);
  const [selectEdittask, setSelectEditTask] = useState(null);

  const handleDeleteOpen = (taskId, listname) => {
    setSelectDeleteTask([taskId, listname]);
  }
  const handleDeleteClose = () => setSelectDeleteTask(null);

  const handleEditOpen = (task, listname) => {
    setSelectEditTask([task, listname]);
  };
  
  const handleEditClose = () => setSelectEditTask(null);


  //handle drag start
  const handleDragStart = (item, sourceListName) => {
    setDraggable({ item, sourceListName });
  };

  //handle drop
  const handleDrop = (targetListName) => {
    if (!draggable) return;

    const { item, sourceListName } = draggable;

    if (sourceListName === targetListName) return;

    dispatch(moveTask(item, sourceListName, targetListName));

    setDraggable(null);
  };

  //handle drag over(to allow drop)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleReorder = (task, listName, direction)=>{
    dispatch(reorderTask(task, listName, direction));
  }

  return (
    <div style={styles.container}>
      <div style={styles.sectionOpen} onDrop={() => handleDrop('openToDo')} onDragOver={handleDragOver}>
        <h3 style={styles.heading}>Open Tasks</h3>
        {openToDo.map((item, index) => (
          <div key={item.id} style={styles.card} draggable onDragStart={() => handleDragStart(item, 'openToDo')}>
            <div style={styles.buttonContainer}>
              <button style={index === 0 ?styles.disableButton:styles.upDownButton} onClick={()=>handleReorder(item, 'openToDo', 'up')}><KeyboardArrowUpIcon /></button>
              <button style={index === openToDo.length-1 ?styles.disableButton:styles.upDownButton} onClick={()=>handleReorder(item, 'openToDo', 'down')}><KeyboardArrowDownIcon /></button>
            </div>
            <div>
              <h4 style={styles.cardTitle}>{item.title}</h4>
              <p style={styles.cardDescription}>{item.description}</p>
              <button style={styles.startButton} onClick={()=>dispatch(movetoProgress(item))}>Start</button> {/* Added Start button */}
            </div>
            <div style={styles.buttonContainer}>
              <button style={styles.editButton} onClick={()=>handleEditOpen(item,'openToDo')}><EditIcon /></button>
              <button style={styles.deleteButton} onClick={()=>handleDeleteOpen(item.id, 'openToDo')}><DeleteIcon /></button>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.sectionInProgress} onDrop={() => handleDrop('inProgressToDo')} onDragOver={handleDragOver}>
        <h3 style={styles.heading}>In-Progress Tasks</h3>
        {inProgressToDo.map((item, index) => (
          <div key={item.id} style={styles.card} draggable onDragStart={() => handleDragStart(item, 'inProgressToDo')}>
            <div style={styles.buttonContainer}>
              <button style={index === 0 ?styles.disableButton:styles.upDownButton} onClick={()=>handleReorder(item, 'inProgressToDo', 'up')}><KeyboardArrowUpIcon /></button>
              <button style={index === openToDo.length-1 ?styles.disableButton:styles.upDownButton} onClick={()=>handleReorder(item, 'inProgressToDo', 'down')}><KeyboardArrowDownIcon /></button>
            </div>
            <div>
              <h4 style={styles.cardTitle}>{item.title}</h4>
              <p style={styles.cardDescription}>{item.description}</p>
              <button style={styles.completeButton} onClick={()=>dispatch(movetoComplete(item))}>Complete</button> {/* Added Start button */}
            </div>
            <div style={styles.buttonContainer}>
              <button style={styles.editButton} onClick={()=>handleEditOpen(item,'inProgressToDo')}><EditIcon /></button>
              <button style={styles.deleteButton} onClick={()=>handleDeleteOpen(item.id, 'inProgressToDo')}><DeleteIcon /></button>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.sectionComplete} onDrop={() => handleDrop('completedToDo')} onDragOver={handleDragOver}>
        <h3 style={styles.heading}>Completed Tasks</h3>
        {completeToDo.map((item, index) => (
          <div key={item.id} style={styles.card} draggable onDragStart={() => handleDragStart(item, 'completedToDo')}>
            <div style={styles.buttonContainer}>
              <button style={index === 0 ?styles.disableButton:styles.upDownButton} onClick={()=>handleReorder(item, 'completedToDo', 'up')}><KeyboardArrowUpIcon /></button>
              <button style={index === openToDo.length-1 ?styles.disableButton:styles.upDownButton} onClick={()=>handleReorder(item, 'completedToDo', 'down')}><KeyboardArrowDownIcon /></button>
            </div>
            <div>
              <h4 style={styles.cardTitle}>{item.title}</h4>
              <p style={styles.cardDescription}>{item.description}</p>
            </div>
            <div style={styles.buttonContainer}>
              <button style={styles.editButton} onClick={()=>handleEditOpen(item,'completedToDo')}><EditIcon /></button>
              <button style={styles.deleteButton} onClick={()=>handleDeleteOpen(item.id, 'completedToDo')}><DeleteIcon /></button>
              {/* <DeleteModal open={!!selectDeletetask} handleClose={handleDeleteClose} deleteToDo={selectDeletetask}/> */}
             
            </div>
          </div>
        ))}
      </div>
      <DeleteModal open={!!selectDeletetask} handleClose={handleDeleteClose} deleteToDo={selectDeletetask} />
      <EditModal open={!!selectEdittask} handleClose={handleEditClose} editToDo={selectEdittask}/>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    marginTop: '20px',
  },
  sectionOpen: {
    flex: 1,
    margin: '0 10px',
    backgroundColor: '#FADFA1',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: '280px',
    overflowY: 'auto',
  },
  sectionInProgress: {
    flex: 1,
    margin: '0 10px',
    backgroundColor: '#FFCFB3',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: '280px',
    overflowY: 'auto',
  },
  sectionComplete: {
    flex: 1,
    margin: '0 10px',
    backgroundColor: '#A1D6B2',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: '280px',
    overflowY: 'auto',
  },
  heading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
    borderBottom: '2px solid black',
    paddingBottom: '10px',
  },
  card: {
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    cursor: 'grab',
  },
  cardTitle: {
    fontSize: '16px',
    margin: '0 0 5px 0',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: "column",
    gap: '5px',
  },
  startButton: {
    padding: '5px 10px',
    backgroundColor: '#001F3F',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  completeButton: {
    padding: '5px 10px',
    backgroundColor: '#001F3F',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    backgroundColor: '#B8001F',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  upDownButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    backgroundColor: '#e9ecef',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  disableButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    backgroundColor: '#e9ecef',
    color: '#bcbcbc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TaskList;
