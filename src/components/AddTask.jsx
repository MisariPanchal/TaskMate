import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';  
import MicIcon from '@mui/icons-material/Mic';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AddTask = () => {
  const [isListening, setIsListening] = useState(false);

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const handleMicClick = ()=>{
    if(isListening){
      SpeechRecognition.stopListening();
    }
    else{
      SpeechRecognition.startListening({ continuous: true, language:'en-IN' });
    }
    setIsListening(!isListening);
  }

  useEffect(() => {
    if (transcript) {
      fmk.setFieldValue('description', transcript);
    }
  }, [transcript]);

  const dispatch = useDispatch();

  const fmk = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required')
    }),
    onSubmit: (values, { resetForm }) => {
      const id = Math.floor(Math.random() * 100) + 1;
      dispatch(addTask({ title: values.title, description: values.description, id }));
      resetForm();  
    }
  });

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Add Task</h3>
      <form onSubmit={fmk.handleSubmit} style={styles.inputContainer}>

        {/* Title Field */}
        <TextField
          fullWidth
          label="Enter title"
          name="title"
          value={fmk.values.title}
          onChange={fmk.handleChange}
          onBlur={fmk.handleBlur}
          error={fmk.touched.title && Boolean(fmk.errors.title)}
          helperText={fmk.touched.title && fmk.errors.title}
          variant="outlined"
        />

        {/* Description Field */}
        <TextField
          fullWidth
          label="Enter description"
          name="description"
          value={fmk.values.description}
          onChange={fmk.handleChange}
          onBlur={fmk.handleBlur}
          error={fmk.touched.description && Boolean(fmk.errors.description)}
          helperText={fmk.touched.description && fmk.errors.description}
          multiline
          rows={4}
          variant="outlined"
          sx={{ marginTop: '10px' }}  
          InputProps={{
            endAdornment: (
              <div style={{alignSelf:"end"}}>
                <div onClick={handleMicClick} style={{color:isListening ? 'red' : 'blue'}}>
                  <MicIcon />
                </div>
              </div>
            )
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        sx={{ marginTop: '20px' }}
        >
          Add Task
        </Button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#f5f5f5',
    padding: '10px 20px 20px',
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
};

export default AddTask;
