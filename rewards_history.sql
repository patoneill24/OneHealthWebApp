SELECT rewards.name, rewards.points, redeem_date
FROM redeemed_prizes JOIN rewards ON redeemed_prizes.reward_id = rewards.id 
WHERE redeemed_prizes.user_id = 2;

SELECT * FROM redeemed_prizes;

ALTER TABLE redeemed_prizes ADD id SERIAL PRIMARY KEY;


SELECT rewards.name, rewards.points,  TO_CHAR(timezone('America/Denver',redeem_date), 'YYYY-MM-DD HH24:MI:SS')
FROM redeemed_prizes 
JOIN rewards ON redeemed_prizes.reward_id = rewards.id 
WHERE redeemed_prizes.user_id = 2

SELECT * FROM pg_timezone_names
WHERE name = 'America/Denver';

SELECT  TO_CHAR(timezone('America/Denver',CURRENT_TIMESTAMP), 'YYYY-MM-DD HH24:MI');