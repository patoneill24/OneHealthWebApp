import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import {getRewards, getActiveRewards,addReward, getReward,updateReward} from '../controllers/rewardsController.js';

const rewardsRouter = express.Router();

rewardsRouter.use(cors());

rewardsRouter.use(express.json());

rewardsRouter.get('/',getRewards);

rewardsRouter.get('/active', getActiveRewards);

rewardsRouter.post('/', addReward);

rewardsRouter.get('/:id', getReward);

rewardsRouter.put('/:id', updateReward);

export default rewardsRouter;