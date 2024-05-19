const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db/db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create Todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    console.log('Description:', description); // Debug log
    const newTodo = await pool.query(
      'INSERT INTO todos (description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get All Todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todos');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete Todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID to delete:', id); // Debug log
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo was deleted!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update Todo (Bonus)
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log('ID to update:', id); // Debug log
    console.log('New description:', description); // Debug log
    await pool.query('UPDATE todos SET description = $1 WHERE id = $2', [description, id]);
    res.json({ message: 'Todo was updated!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
