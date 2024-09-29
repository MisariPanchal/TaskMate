import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveTask } from '../redux/actions';

const TaskList = () => {
  const dispatch = useDispatch();
  const openToDo = useSelector(state => state.reducer?.openToDo || []);
  const inProgressToDo = useSelector(state => state.reducer?.inProgressToDo || []);
  const completeToDo = useSelector(state => state.reducer?.completedToDo || []);

  const [draggable, setDraggable] = useState(null);

  //handle drag start
  const handleDragStart = (item, sourceListName) => {
    setDraggable({ item, sourceListName });
  }

  //handle drop
  const handleDrop = (targetListName) => {
    if (!draggable) return;

    const { item, sourceListName } = draggable;

    if (sourceListName === targetListName) return;

    dispatch(moveTask(item, sourceListName, targetListName));

    setDraggable(null);
  }

  //handle drag over(to allow drop)
  const handleDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div style={styles.container}>
      <div style={styles.sectionOpen} onDrop={() => handleDrop('openToDo')} onDragOver={handleDragOver}>
        <h3 style={styles.heading}>Open Tasks</h3>
        {openToDo.map((item) => (
          <div key={item.id} style={styles.card} draggable onDragStart={() => handleDragStart(item, 'openToDo')}>
            <h4 style={styles.cardTitle}>{item.title}</h4>
            <p style={styles.cardDescription}>{item.description}</p>
            {/* <div style={{display:'flex',justifyContent:'center',gap:'5px'}}>
              <button>Edit</button>
              <button>Delete</button>
            </div> */}
          </div>
        ))}
      </div>
      <div style={styles.sectionInProgress} onDrop={() => handleDrop('inProgressToDo')} onDragOver={handleDragOver}>
        <h3 style={styles.heading}>In-Progress Tasks</h3>
        {inProgressToDo.map((item) => (
          <div key={item.id} style={styles.card} draggable onDragStart={() => handleDragStart(item, 'inProgressToDo')}>
            <h4 style={styles.cardTitle}>{item.title}</h4>
            <p style={styles.cardDescription}>{item.description}</p>
            {/* <div style={{display:'flex',justifyContent:'center',gap:'5px'}}>
              <button>Edit</button>
              <button>Delete</button>
            </div> */}
          </div>
        ))}
      </div>
      <div style={styles.sectionComplete} onDrop={() => handleDrop('completedToDo')} onDragOver={handleDragOver}>
        <h3 style={styles.heading}>Completed Tasks</h3>
        {completeToDo.map((item) => (
          <div key={item.id} style={styles.card} draggable onDragStart={() => handleDragStart(item, 'completedToDo')}>
            <h4 style={styles.cardTitle}>{item.title}</h4>
            <p style={styles.cardDescription}>{item.description}</p>
            {/* <div style={{display:'flex',justifyContent:'center',gap:'5px'}}>
              <button>Edit</button>
              <button>Delete</button>
            </div> */}
          </div>
        ))}
      </div>
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
  },
  sectionInProgress: {
    flex: 1,
    margin: '0 10px',
    backgroundColor: '#FFCFB3',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionComplete: {
    flex: 1,
    margin: '0 10px',
    backgroundColor: '#A1D6B2',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
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
    cursor: 'grab'
  },
  activeCard: {
    opacity: 0.7,
    border: '1px solid #111'
  },
  cardTitle: {
    fontSize: '16px',
    margin: '0 0 5px 0',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#555',
  },
};

export default TaskList;
