import pool from '../model/db.js';
export const inputReward = (user_id: number, reward_id: number) => {
    pool.query('INSERT INTO redeemed_prizes VALUES($1, $2, CURRENT_TIMESTAMP)', [user_id, reward_id]);
  };
  
export const selectRewards = (user_id: number) => {
    const rewards = pool.query("SELECT rewards.name, rewards.points, TO_CHAR(timezone('America/Denver', redeem_date), 'Mon DD, YYYY FMHH12:MIAM') AS redeem_date FROM redeemed_prizes JOIN rewards ON redeemed_prizes.reward_id = rewards.id WHERE redeemed_prizes.user_id = $1", [user_id]);;
    return rewards;
  };