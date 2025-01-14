import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import pool from './db.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', async(req, res) => {
    try{
        const allUsers = await pool.query('SELECT * FROM users');
        res.status(200).send(allUsers.rows);
    } catch (err: any) {
        console.error(err.message);
    }
});

app.get('/:id', async(req, res) => {
    const { id } = req.params;
    try{
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.status(200).send(user.rows);
    } catch (err: any) {
        console.error(err.message);
    }
});

app.post('/', async(req, res) => {
    const { name, location } = req.body;
    try{
        await pool.query('INSERT INTO users (name, location) VALUES($1, $2)', [name, location]);
        res.status(200).send({
            message: "susccessfully added user",
        })
    } catch (err: any) {
        console.error(err.message);
    }
});

app.put('/:id', async(req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    try{
        await pool.query('UPDATE users SET name = $1, location = $2 WHERE id = $3', [name, location, id]);
        res.status(200).send({
            message: "successfully updated user",
        });
    } catch (err: any) {
        console.error(err.message);
    }
});

app.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try{
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).send({
            message: "successfully deleted user",
        });
    } catch (err: any) {
        console.error(err.message);
    }
});

app.get('/setup', async (req, res) => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), location VARCHAR(255))');
        res.status(200).send({
            message: "Table created successfully",
        });
    } catch (err: any) {
        console.error(err.message);
    }
});

app.listen(process.env.DEV_PORT, () => {
    console.log('Server is running on http://localhost:' + process.env.DEV_PORT);
});

app.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${process.env.DEV_PORT} is already in use.`);
      // Optionally, you can try to listen on a different port or exit the application
      process.exit(1);  // Exit the process with a non-zero status code
    } else {
      console.error('Server error:', err.message);
      process.exit(1);  // Exit on other errors as well
    }
  });