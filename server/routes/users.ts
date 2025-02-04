import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import {getAllUsers, getUser, addUser, updateUser, deleteUser, getLocations} from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter.use(cors());

userRouter.use(express.json());

userRouter.get('/', getAllUsers);

userRouter.post('/',addUser);

userRouter.get('/locations', getLocations);

userRouter.get('/:id', getUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;