import express from 'express';

import { Request, Response } from 'express';

import pool from './model/db.js';

import {requireAuth, clerkClient, clerkMiddleware} from '@clerk/express';

import cors from 'cors';

import 'dotenv/config';

import { errorHandler } from './middleware/errors.js';

import userRouter from './routes/users.js';

import rewardsRouter from './routes/rewards.js';

import userRewardsRouter from './routes/userRewards.js';

import userNotificationsRouter from './routes/userNotifications.js';

import userMedicationsRouter from './routes/userMed.js';

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

app.use(express.json());

app.use(errorHandler);

app.use(clerkMiddleware())

app.get('/', (req, res) => {
  res.send('You do not have access to this route.');
});

app.get('/protected', requireAuth({ signInUrl: '/' }), (req, res) => {
  res.send('This is a protected route.')
});

app.get('/addUser', requireAuth(), async (req: any, res: any) => {
  const userId = req.auth.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = await clerkClient.users.getUser(userId);

  pool.query(
    'INSERT INTO users_test (user_id, first_name, last_name, email) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO NOTHING',
    [user.id, user.firstName, user.lastName, user.emailAddresses[0].emailAddress]);
});

app.get('/user',requireAuth() ,async (req: any, res: any) => {
  const userId = req.auth.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = await clerkClient.users.getUser(userId);
  res.json(user);
});



app.use('/users/rewards', userRewardsRouter);

app.use('/users/notifications', userNotificationsRouter);

app.use('/users/drugs', userMedicationsRouter);

app.use('/rewards', rewardsRouter);

app.use('/users', userRouter);


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