import React from 'react';
import './App.css';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { Provider } from 'react-redux';
import { store, Persistor } from './redux/store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import logo from '../public/apple-touch-icon.png'; // Adjust the path as necessary

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: '20px',
  },
  heading: {
    color: '#333',
    fontSize: '30px',
    marginLeft: '10px',
    margin: 0, // Remove default margin
  },
  logo: {
    width: '50px', // Adjust size as needed
    height: 'auto', // Maintain aspect ratio
  },
  container: {
    textAlign: 'center', // Center-align content in the container
  }
};

function App() {
  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.header}>
        <img src={logo} alt="TaskMate Logo" style={styles.logo} />
        <h3 style={styles.heading}>TaskMate</h3>
      </div>

      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <AddTask />
          <TaskList />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
