// import { ClassNames } from '@emotion/react';
import axios from 'axios';
import { useState,useEffect } from 'react';

interface SelectedNotification {
    key: string | null;
    value: string | null;
}

interface NotificationProps {
    notification_id: string;
    notification_title: string;
    notification_text: string;
    created_at: string;
}

export default function Dashboard() {
    // var notifications = {
    //     "Your medication is due for a refill": "Your medication [med name] is due for a refill! Be sure to refill it at your pharmacy of choice before your next dose on [date].",
    //     "Don't forget to log when you take your medication!": "Logging when you take your medication will help you gain rewards, and help your doctor know that you've taken your medications.",
    //     "New study released about your medication": "Your medication [med name] has a new study on it! Read the results here [link]",
    //     "Password has been reset": "You password was reset successfully on [date]. If this was NOT you, please reset your password immediately, or contact [email/number] right away! If this WAS you that changed your password, you may ignore this message.",
    //     "Welcome to OneHealth!": "We want to thank you for putting your health first and signing up for OneHealth! We can't wait for you to be able to start earning rewards and seeing the benefits of taking care of yourself; you deserve it!",
    // };

    function getNotifications(){
        axios.get('http://localhost:3000/users/notifications')
        .then((response) => {
            setNotifications(response.data);
            console.log(response.data);
            setNotificationPreview(response.data.slice(0, 3));
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const [notifications, setNotifications] = useState<NotificationProps[]>([]);
    const [notificationPreview, setNotificationPreview] = useState<NotificationProps[]>([]);
    // const allNotifications = Object.entries(notifications);

    const [selectedNotification, setSelectedNotification] = useState<SelectedNotification>({key:null, value:null});
    const [showAll, setShowAll] = useState(false);

    const handleNotificationClick = (key:string, value:string) => {
        setSelectedNotification({ key, value });
    };
    const handleShowAllClick = () => {
        setShowAll(true);
        getNotifications();
    };
    const handleBackClick = () => {
        setSelectedNotification({key:null,value:null});
        setShowAll(false);
    };

    const handleBackToAllClick = () => {
        setSelectedNotification({key:null,value:null});
        setShowAll(true);
    }

    useEffect(() => {
        getNotifications();
    }, []);

    // To show the notification details on the right side of the page instead of in an overlay,
    // just move the conditionals outside of "notification-preview"
    return(
        <>
            <h1>Welcome to your dashboard!</h1>
            <div id = "notification-preview" className = "card">
                <h2>Notifications:</h2>
                {notificationPreview.map((notification) => (
                    <div className = "notification-button" key={notification.notification_id} onClick={() => handleNotificationClick(notification.notification_title, notification.notification_text)}>
                        {notification.notification_title}
                    </div>
                ))}
                <button onClick={handleShowAllClick}>See All</button>
                {!selectedNotification.key && !showAll ? (
                    <></>
                ) : selectedNotification.key ? (
                        <div className="overlay">
                            <div className="card">
                                <h2>{selectedNotification.key}</h2>
                                <p>{selectedNotification.value}</p>
                                <button onClick={handleBackClick}>Back</button>
                                <button onClick={handleBackToAllClick}>Show All Notifications</button>
                            </div>
                        </div>
                    ) : (
                        <div className="overlay">
                            <div className="card">
                                {notifications.map((notification) => (
                                    <div className = "notification-button" key={notification.notification_id} onClick={() => handleNotificationClick(notification.notification_title, notification.notification_text)}>
                                        {notification.notification_title}
                                    </div>
                                ))}
                                <button onClick={handleBackClick}>Back</button>
                            </div>
                        </div>
                    )}
            </div>
        </>
    );
}