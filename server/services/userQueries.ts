import pool from "../model/db.js";

export const selectAllUsers = () => {
  const allUsers = pool.query("SELECT * FROM users ORDER BY id ASC");
  return allUsers;
};

export const CheckDuplicate = (name:string, location:string) => {
  const user = pool.query("SELECT * FROM users WHERE LOWER(name) = $1 AND LOWER(location) = $2", [name, location]);
  return user;
}

export const selectUser = (id: number) => {
  const user = pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return user;
};

export const createUser = (name: string, location: string, points: number) => {
  pool.query(
    "INSERT INTO users (name, location, points) VALUES($1, $2, $3)",
    [name, location, points]
  );
};

export const changeUser = (
  id: number,
  name: string,
  location: string,
  points: number
) => {
    pool.query(
      "UPDATE users SET name = $1, location = $2, points = $3 WHERE id = $4",
      [name, location, points, id]
    );
};

export const removeUser = (id: number) => {
  pool.query("DELETE FROM redeemed_prizes WHERE user_id = $1", [id]);
  pool.query("DELETE FROM users WHERE id = $1", [id]);
};

export const selectLocations = () => {
  const locations = pool.query("SELECT DISTINCT location FROM users");
  return locations;
}

export const selectAllNotifications = () => {
  const notifications = pool.query("SELECT * FROM notifications");
  return notifications;
}

export const selectUserNotifications = (id: number) => {
  const notifications = pool.query("SELECT n.notification_id,\
  n.notification_title,\
  n.notification_text,\
  un.recieved_at,\
  un.user_notification_id \
  FROM notifications n \
  JOIN user_notifications un ON n.notification_id = un.notification_id\
  JOIN users u ON un.user_id = u.id \
  WHERE u.id = $1\
  ORDER BY un.recieved_at DESC", [id]);
  return notifications;
}

export const createNotification = (user_id: string, notification_id: string) => {
  pool.query("INSERT INTO user_notifications (user_id, notification_id) VALUES($1, $2)", [user_id, notification_id]);
}

export const selectUserDrugs = (id: number) => {
  const drugs = pool.query("SELECT d.drug_id,d.name \
FROM \
	users u \
JOIN \
	user_drugs ud ON u.id = ud.user_id \
JOIN\
	drugs d ON ud.drug_id = d.drug_id \
WHERE \
	u.id = $1", [id]);
  return drugs;
}

