import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import {getAllUsers, getUser, addUser, updateUser, deleteUser, getLocations, getUserByNameAndLocation, getAllNotifications, getUserNotifications} from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter.use(cors());

userRouter.use(express.json());

// Exact Routes
userRouter.get('/', getAllUsers);
userRouter.post('/',addUser);
userRouter.get('/locations', getLocations);
userRouter.get('/notifications', getAllNotifications);


// More Specific Paremeterized Routes
userRouter.get('/notifications/:id', getUserNotifications);
userRouter.get('/:name/:location', getUserByNameAndLocation);


// Other Parametrized Routes
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;