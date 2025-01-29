import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import userRouter from './routes/users.js';

import rewardsRouter from './routes/rewards.js';

const app = express();

app.use(cors());

app.use(express.json());

// app.get('/', async(req, res) => {
//     try{
//         const allUsers = await pool.query('SELECT * FROM users ORDER BY id ASC');
//         res.status(200).send(allUsers.rows);
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

app.use('/users', userRouter);

app.use('/rewards', rewardsRouter);

// app.post('/', async(req, res) => {
//     const { name, location, points } = req.body;
//     try{
//         await pool.query('INSERT INTO users (name, location,points) VALUES($1, $2, $3)', [name, location, points]);
//         res.status(200).send({
//             message: "susccessfully added user",
//         })
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });


// app.get('/setup', async (req, res) => {
//     try{
//         await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), location VARCHAR(255))');
//         res.status(200).send({
//             message: "Table created successfully",
//         });
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });


  


// app.get('/admin', async(req, res) => {
//     try{
//         const allUsers = await pool.query("SELECT rolname, rolpassword \
// FROM pg_authid \
// WHERE rolname = 'onehealth'");
//         res.status(200).send(allUsers.rows);
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

// app.get('/setuprewards', async (req, res) => {
//     try{
//         await pool.query('CREATE TABLE IF NOT EXISTS rewards (id SERIAL PRIMARY KEY, name VARCHAR(255), points integer)');
//         res.status(200).send({
//             message: "Table created successfully",
//         });
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

// app.get('/rewards', async(req, res) => {
//     try{
//         const allRewards = await pool.query('SELECT * FROM rewards ORDER BY id ASC');
//         res.status(200).send(allRewards.rows);
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

// app.post('/rewards', async(req, res) => {
//     const { name, points } = req.body;
//     try{
//         await pool.query('INSERT INTO rewards (name, points) VALUES($1, $2)', [name, points]);
//         res.status(200).send({
//             message: "susccessfully added reward",
//         })
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

// app.get('/rewards/:id', async(req, res) => {
//     const { id } = req.params;
//     try{
//         const reward = await pool.query('SELECT * FROM rewards WHERE id = $1', [id]);
//         res.status(200).send(reward.rows);
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });



// app.get('/:id', async(req, res) => {
//     const { id } = req.params;
//     try{
//         const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//         res.status(200).send(user.rows);
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });


// app.put('/:id', async(req, res) => {
//     const { id } = req.params;
//     const { name, location, points} = req.body;
//     try{
//         await pool.query('UPDATE users SET name = $1, location = $2, points = $3 WHERE id = $4', [name, location,points,id]);
//         res.status(200).send({
//             message: "successfully updated user",
//         });
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

// app.delete('/:id', async(req, res) => {
//     const { id } = req.params;
//     try{
//         await pool.query('DELETE FROM users WHERE id = $1', [id]);
//         res.status(200).send({
//             message: "successfully deleted user",
//         });
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

// redeemed_prizes

// app.get('/:user_id/rewards', async(req, res) => {
//     const { user_id} = req.params;
//     try{
//         const user = await pool.query("SELECT rewards.name, rewards.points, TO_CHAR(timezone('America/Denver', redeem_date), 'Mon DD, YYYY FMHH12:MIAM') AS redeem_date FROM redeemed_prizes JOIN rewards ON redeemed_prizes.reward_id = rewards.id WHERE redeemed_prizes.user_id = $1", [user_id]);
//         res.status(200).send({
//             user: user.rows,
//         });
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

// app.post('/:user_id/rewards', async(req, res) => {
//     const { user_id, reward_id } = req.body;
//     try{
//         await pool.query('INSERT INTO redeemed_prizes VALUES($1, $2, CURRENT_TIMESTAMP)', [user_id, reward_id]);
//         res.status(200).send({
//             message: "susccessfully added reward",
//         })
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });


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