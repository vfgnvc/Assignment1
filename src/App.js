import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState({ id: null, text: '' });

  const addTask = () => {
    if (!newTask) {
      toast.error('Task text is required');
      return;
    }

    const newTasks = [...tasks, { id: Date.now(), text: newTask }];
    setTasks(newTasks);
    setNewTask('');
    toast.success('Task added successfully');
  };

  const editTaskText = () => {
    if (!editTask.text) {
      toast.error('Task text is required');
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id ? { ...task, text: editTask.text } : task
    );

    setTasks(updatedTasks);
    setEditTask({ id: null, text: '' });
    toast.success('Task edited successfully');
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    toast.success('Task deleted successfully');
  };

  return (
    <div className="App">
      <h1 className="mt-4">Task Manager</h1>

      <div className="mt-4">
        <h2>Add Task</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Task text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={addTask}>
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2>Task List</h2>
        <ul className="list-group">
          {tasks.map((task) => (
            <li className="list-group-item" key={task.id}>
              {task.id === editTask.id ? (
                <div>
                  <input
                    type="text"
                    className="form-control"
                    value={editTask.text}
                    onChange={(e) =>
                      setEditTask({ ...editTask, text: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-success mt-2"
                    onClick={editTaskText}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  {task.text}
                  <button
                    className="btn btn-info ml-2"
                    onClick={() => setEditTask({ id: task.id, text: task.text })}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
