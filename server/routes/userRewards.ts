import express from 'express';

import cors from 'cors';

import {getRewards, addReward} from '../controllers/userRewardsController.js';

const userRewardsRouter = express.Router();

userRewardsRouter.use(cors());

userRewardsRouter.use(express.json());

userRewardsRouter.get('/:user_id', getRewards);

userRewardsRouter.post('/:user_id', addReward);

export default userRewardsRouter;