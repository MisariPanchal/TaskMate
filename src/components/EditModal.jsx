import React, { useEffect } from 'react';
import { Modal, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { editTask } from '../redux/actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditModal = ({ open, handleClose, editToDo }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      list: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: (values) => {
      dispatch(editTask({ id: editToDo[0].id, title: values.title, description: values.description }, values.list));
      handleClose();
      toast.success("Task Edited Successfully...", {
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
    },
    enableReinitialize: true, // To reset form values when `editToDo` changes
  });

  useEffect(() => {
    if (editToDo) {
      formik.setValues({
        title: editToDo[0].title || '',
        description: editToDo[0].description || '',
        list: editToDo[1] || '',
      });
    }
  }, [editToDo]);

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={styles.modalContainer}>
        <h2>Edit Task</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ marginTop: '10px' }}
          />
          <TextField
            label="Task Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            sx={{ marginTop: '20px' }}
          />
          <div style={styles.buttonContainer}>
            <button style={styles.saveButton} type="submit">Save</button>
            <button style={styles.cancelButton} type="button" onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    padding: '30px 40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  cancelButton: {
    padding: '10px 10px',
    backgroundColor: '#001F3F',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  saveButton: {
    padding: '10px 10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    gap: '15px',
  },
};

export default EditModal;
