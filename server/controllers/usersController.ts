
import {selectAllUsers, selectUser, createUser, changeUser, removeUser, createReward, selectRewards} from '../services/userQueries.js';
export const getAllUsers = async(req:any, res: any) => {
    try{
        const allUsers = (await selectAllUsers())!.rows;
        res.status(200).send(allUsers);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getUser = async(req: any, res: any) => {
    const { id } = req.params;
    try{
        const user = (await selectUser(id))!.rows;
        res.status(200).send(user);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const addUser = async(req:any, res:any) => {
    const { name, location, points } = req.body;
    try{
        createUser(name, location, points);
        res.status(200).send({
            message: "susccessfully added user",
        })
    } catch (err: any) {
        console.error(err.message);
    }
}

export const updateUser = async(req:any, res:any) => {
    const { id } = req.params;
    const { name, location, points} = req.body;
    try{
        changeUser(id, name, location, points);
        res.status(200).send({
            message: "successfully updated user",
        });
    } catch (err: any) {
        console.error(err.message);
    }
}

export const deleteUser = async(req:any, res:any) => {
    const { id } = req.params;
    try{
        removeUser(id);
        res.status(200).send({
            message: "successfully deleted user",
        });
    } catch (err: any) {
        console.error(err.message);
    }
}

export const addReward = async(req:any, res:any) => {
    const { user_id, reward_id } = req.body;
    try{
        createReward(user_id, reward_id);
        res.status(200).send({
            message: "susccessfully added reward",
        })
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getRewards = async(req:any, res:any) => {
    const { user_id} = req.params;
    try{
        const user = (await selectRewards(user_id))!.rows;
        res.status(200).send({
            user: user,
        });
    } catch (err: any) {
        console.error(err.message);
    }
}

// export default {
//     getAllUsers,
//     getUser,
//     addUser,
//     updateUser,
//     deleteUser,
//     addReward,
//     getRewards
// };