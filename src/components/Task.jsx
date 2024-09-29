import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';

const Task = () => {
  const [task, setTask ] = useState({title:'', description:''});
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setTask((prevTask)=>({
      ...prevTask,
      [name]:value
    }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const id = Math.floor(Math.random()*100) + 1;
    dispatch(addTask({title:task.title, description:task.description, id:id}));
    setTask({title:'', description:''});
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>TaskMate</h2>
      <form onSubmit={handleSubmit} style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          name='title'
          placeholder="Enter title"
          value={task.title}
          onChange={handleChange}
        />
        <textarea
          style={styles.textarea}
          name='description'
          placeholder="Enter description"
          value={task.description}
          onChange={handleChange}
        />
        <button type="submit" style={styles.button}>
          Add Task
        </button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
    textAlign: 'center',
  },
  heading: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'none',
  },
  outputContainer: {
    marginTop: '20px',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#001F3F',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Task;
