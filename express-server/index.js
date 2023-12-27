const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'mytasks',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  connection.query('INSERT INTO tasks SET ?', newTask, (error, results) => {
    if (error) {
      console.error('Error inserting task:', error);
      res.status(500).json({ error: 'Error adding task' });
      return;
    }
    newTask.id = results.insertId;
    res.json(newTask);
  });
});

app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({ error: 'Error getting tasks' });
      return;
    }
    res.json(results);
  });
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const newState = req.body.state;

  connection.query(
    'UPDATE tasks SET state = ? WHERE id = ?',
    [newState, taskId],
    (error) => {
      if (error) {
        console.error('Error updating task state:', error);
        res.status(500).json({ error: 'Error updating task state' });
        return;
      }
      res.json({ message: 'Task state updated successfully' });
    }
  );
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  connection.query('DELETE FROM tasks WHERE id = ?', taskId, (error, results) => {
    if (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Error deleting task' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
