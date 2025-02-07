// import { ClassNames } from '@emotion/react';
import { useState } from 'react';

interface Notification {
    key: string | null;
    value: string | null;
}

export default function Dashboard() {
    var notifications = {
        "Your medication is due for a refill": "Your medication [med name] is due for a refill! Be sure to refill it at your pharmacy of choice before your next dose on [date].",
        "Don't forget to log when you take your medication!": "Logging when you take your medication will help you gain rewards, and help your doctor know that you've taken your medications.",
        "New study released about your medication": "Your medication [med name] has a new study on it! Read the results here [link]",
        "Password has been reset": "You password was reset successfully on [date]. If this was NOT you, please reset your password immediately, or contact [email/number] right away! If this WAS you that changed your password, you may ignore this message.",
        "Welcome to OneHealth!": "We want to thank you for putting your health first and signing up for OneHealth! We can't wait for you to be able to start earning rewards and seeing the benefits of taking care of yourself; you deserve it!",
    };
    const notificationPreview = Object.entries(notifications).slice(0, 3);
    const allNotifications = Object.entries(notifications);

    const [selectedNotification, setSelectedNotification] = useState<Notification>({key:null, value:null});
    const [showAll, setShowAll] = useState(false);

    const handleNotificationClick = (key:string, value:string) => {
        setSelectedNotification({ key, value });
    };
    const handleShowAllClick = () => {
        setShowAll(true);
    };
    const handleBackClick = () => {
        setSelectedNotification({key:null,value:null});
        setShowAll(false);
    };

    const handleBackToAllClick = () => {
        setSelectedNotification({key:null,value:null});
        setShowAll(true);
    }

    // To show the notification details on the right side of the page instead of in an overlay,
    // just move the conditionals outside of "notification-preview"
    return(
        <>
            <h1>Welcome to your dashboard!</h1>
            <div id = "notification-preview" className = "card">
                <h2>Notifications:</h2>
                {notificationPreview.map(([key, value]) => (
                    <div className = "notification-button" key={key} onClick={() => handleNotificationClick(key, value)}>
                        {key}
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
                                {allNotifications.map(([key, value]) => (
                                    <div className = "notification-button" key={key} onClick={() => handleNotificationClick(key, value)}>
                                        {key}
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