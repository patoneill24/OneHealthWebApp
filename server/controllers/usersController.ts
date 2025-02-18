
import {selectAllUsers, selectUser, createUser, changeUser, removeUser, selectLocations, CheckDuplicate, selectAllNotifications,selectUserNotifications, createNotification, selectUserDrugs, userTookDrug,selectUserTookDrugs} from '../services/userQueries.js';
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

export const getAllNotifications = async(req:any, res:any) => {
    try{
        const notifications = (await selectAllNotifications())?.rows;
        res.status(200).send(notifications);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getUserNotifications = async(req:any, res:any) => {
    const { id } = req.params;
    try{
        const notifications = (await selectUserNotifications(id))?.rows;
        res.status(200).send(notifications);
    } catch (err: any) {
        console.error(err.message);
    }
}


export const addNotification = async(req:any, res:any) => {
    const { user_id, notification_id } = req.body;
    try{
        createNotification(user_id, notification_id);
        res.status(200).send({
            message: "successfully added notification",
        });
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getUserDrugs = async(req:any, res:any) => {
    const { id } = req.params;
    try{
        const drugs = (await selectUserDrugs(id))?.rows;
        res.status(200).send(drugs);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const addDrugRecord = async(req:any, res:any) => {
    const {user_id} = req.params;
    const {drug_id} = req.body;
    try{
        userTookDrug(user_id,drug_id);
        res.status(200).send({
            message: "successfully added notification",
        });        
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getDrugRecords = async(req:any,res:any) => {
    const {user_id} = req.params;
    try{
        const drug_records = (await selectUserTookDrugs(user_id))?.rows;
        res.status(200).send(drug_records);
    }catch(err:any) {
        console.error(err.message);
    }
}

