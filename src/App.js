import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper elevation={3} style={{ width: '300px', padding: '16px' }}>
      <Typography variant="h5" gutterBottom align="center" style={{ fontFamily: 'Arial, sans-serif' }}>
          LISTA DE TAREAS
        </Typography>

        <TextField
          label="Nueva Tarea"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          fullWidth
          sx={{ marginBottom: '16px' }}
        />
        <Button variant="contained" startIcon={<Add />} onClick={handleAddTask}>
          Agregar Tarea
        </Button>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} sx={{ border: '1px solid #ddd', borderRadius: '4px', margin: '8px 0', padding: '8px' }}>
              <ListItemText primary={task} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default App;
