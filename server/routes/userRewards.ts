import express from 'express';

import cors from 'cors';

import {getRewards, addReward, getPopularPrizes, getPopularPrizesByUser, getPopularPrizesByLocation} from '../controllers/userRewardsController.js';

const userRewardsRouter = express.Router();

userRewardsRouter.use(cors());

userRewardsRouter.use(express.json());

userRewardsRouter.get('/popular', getPopularPrizes);

userRewardsRouter.get('/popular/:location', getPopularPrizesByLocation);

userRewardsRouter.get('/popular/userid/:user_id', getPopularPrizesByUser);

userRewardsRouter.get('/:user_id', getRewards);


userRewardsRouter.post('/:user_id', addReward);

export default userRewardsRouter;