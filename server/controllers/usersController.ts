
import {selectAllUsers, selectUser, createUser, changeUser, removeUser, selectLocations, CheckDuplicate, selectAllNotifications} from '../services/userQueries.js';
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

export const getUserByNameAndLocation = async(req: any, res: any) => {
    const { name, location } = req.params;
    try{
        const user = (await CheckDuplicate(name, location))!.rows;
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

export const getLocations = async(req:any, res:any) => {
    try{
        const locations = (await selectLocations())?.rows;
        res.status(200).send(locations);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getNotifications = async(req:any, res:any) => {
    try{
        const notifications = (await selectAllNotifications())?.rows;
        res.status(200).send(notifications);
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