import React from 'react';
import { Typography, Modal, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/actions';
import { toast, Bounce } from 'react-toastify';

const DeleteModal = ({ open, handleClose, deleteToDo }) => {
  const dispatch = useDispatch();
  const handleDelete=()=>{
    dispatch(deleteTask(deleteToDo[0],deleteToDo[1]));
    handleClose();
    toast.error("Task Deleted Successfully...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={modalContainer}>
      <h2>Delete Task</h2>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:"30px"}}>
          Are you sure you want to delete this task?
        </Typography>
        <div style={buttonContainer}>
          <button style={deleteButton} onClick={handleDelete}>
            Delete
          </button>
          <button style={cancelButton} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
const modalContainer = {
  padding: '30px 40px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}
const buttonContainer= {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
  gap: '15px',
}
const deleteButton= {
  padding: '10px 10px',
  backgroundColor: '#B8001F',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize:'15px'
}

const cancelButton= {
  padding: '5px 10px',
  backgroundColor: '#001F3F',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize:'15px'
}

export default DeleteModal;
