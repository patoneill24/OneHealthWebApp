import pool from '../model/db.js';

import { selectAllRewards, selectAllActiveRewards,selectRewardById, insertReward, changeReward, CheckDuplicateReward } from '../services/rewardsQueries.js';

export const getRewards =  async(req:any, res:any) => {
    try{
        const allRewards = (await selectAllRewards())?.rows;
        res.status(200).send(allRewards);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getRewardByName = async(req:any, res:any) => {
    const { name } = req.params;
    try{
        const reward = (await CheckDuplicateReward(name))!.rows;
        res.status(200).send(reward);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getActiveRewards = async(req:any, res:any) => {
    try{
        const allActiveRewards = (await selectAllActiveRewards())?.rows;
        res.status(200).send(allActiveRewards);
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


export const updateReward = async(req:any, res:any) => {
    const { id } = req.params;
    const { name, points , status} = req.body;
    try{
        changeReward(id, name, points, status);
        res.status(200).send({
            message: "susccessfully updated reward",
        })
    } catch (err: any) {
        console.error(err.message);
    }
}