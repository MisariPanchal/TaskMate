
//redux persist, edit delete
//empty task addition X

import './App.css'
import Task from './components/Task'
import TaskList from './components/TaskList'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <div>
      <Provider store={store}>
        <Task />
        <TaskList />
      </Provider>
    </div>
  )
}

export default App
