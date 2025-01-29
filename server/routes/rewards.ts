import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import {getRewards, addReward, getReward} from '../controllers/rewardsController.js';

const rewardsRouter = express.Router();

rewardsRouter.use(cors());

rewardsRouter.use(express.json());

rewardsRouter.get('/',getRewards);

rewardsRouter.post('/', addReward);

rewardsRouter.get('/:id', getReward);

export default rewardsRouter;