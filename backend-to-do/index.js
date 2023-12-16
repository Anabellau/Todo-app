const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;
const secretKey = process.env.JWT_SECRET || 'your-secret-key'; 

app.use(cors());
app.use(bodyParser.json());

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ msg: 'Username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);

    jwt.sign({ user: { id: result.rows[0].id, username: result.rows[0].username } }, secretKey, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (user.rows.length === 0) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    jwt.sign({ user: { id: user.rows[0].id, username: user.rows[0].username } }, secretKey, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/todos', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos WHERE user_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/todos', authenticate, async (req, res) => {
  const { task } = req.body;
  try {
    const result = await pool.query('INSERT INTO todos (task, user_id) VALUES ($1, $2) RETURNING *', [task, req.user.id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/todos/:id', authenticate, async (req, res) => {
  const { task } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query('UPDATE todos SET task = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [task, id, req.user.id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/todos/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    res.json({ msg: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
