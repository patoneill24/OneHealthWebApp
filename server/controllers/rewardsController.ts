import pool from '../model/db.js';

import { selectAllRewards, selectRewardById, insertReward } from '../services/rewardsQueries.js';

export const getRewards =  async(req:any, res:any) => {
    try{
        const allRewards = (await selectAllRewards())?.rows;
        res.status(200).send(allRewards);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const addReward = async(req:any, res:any) => {
    const { name, points } = req.body;
    try{
        insertReward(name, points);
        res.status(200).send({
            message: "susccessfully added reward",
        })
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getReward = async(req:any, res:any) => {
    const { id } = req.params;
    try{
        const reward = (await selectRewardById(id))?.rows; 
        res.status(200).send(reward);
    } catch (err: any) {
        console.error(err.message);
    }
}