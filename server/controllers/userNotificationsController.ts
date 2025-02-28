import { selectAllNotifications, selectUserNotifications, createNotification } from "../services/userNotificationQueries.js";

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