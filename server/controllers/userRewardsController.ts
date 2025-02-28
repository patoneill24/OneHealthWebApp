import {inputReward, selectRewards, selectPopularPrizes, selectPopularPrizesByUser, selectPopularPrizesByLocation} from "../services/userRewardsQueries.js";

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

export const getUserRewards = async(req:any, res:any) => {
    const { user_id } = req.params;
    try{
        const rewards = (await selectRewards(user_id))?.rows; 
        res.status(200).send(rewards);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getPopularPrizes = async(req:any, res:any) => {
    try{
        const rewards = (await selectPopularPrizes())?.rows; 
        res.status(200).send(rewards);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getPopularPrizesByUser = async(req:any, res:any) => {
    const { user_id } = req.params;
    try{
        const rewards = (await selectPopularPrizesByUser(user_id))?.rows; 
        res.status(200).send(rewards);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getPopularPrizesByLocation = async(req:any, res:any) => {
    const { location } = req.params;
    try{
        const rewards = (await selectPopularPrizesByLocation(location))?.rows; 
        res.status(200).send(rewards);
    } catch (err: any) {
        console.error(err.message);
    }
}