import {inputReward, selectRewards} from "../services/userRewardsQueries.js";

export const addReward = async(req:any, res:any) => {
    const { user_id, reward_id , price_at_pruchase} = req.body;
    try{
        inputReward(user_id, reward_id, price_at_pruchase);
        res.status(200).send({
            message: "susccessfully added reward",
        })
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getRewards = async(req:any, res:any) => {
    const { user_id } = req.params;
    try{
        const rewards = (await selectRewards(user_id))?.rows; 
        res.status(200).send(rewards);
    } catch (err: any) {
        console.error(err.message);
    }
}