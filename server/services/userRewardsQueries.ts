import pool from '../model/db.js';
export const inputReward = (user_id: number, reward_id: number, price_at_pruchase:number) => {
    pool.query('INSERT INTO redeemed_prizes (user_id,reward_id,redeem_date,price_at_purchase) VALUES($1, $2, CURRENT_TIMESTAMP, $3)', [user_id, reward_id,price_at_pruchase]);
  };
  
export const selectRewards = (user_id: number) => {
    const rewards = pool.query("SELECT rewards.name, redeemed_prizes.price_at_purchase, TO_CHAR(timezone('America/Denver', redeem_date), 'Mon DD, YYYY FMHH12:MIAM') AS redeem_date FROM redeemed_prizes JOIN rewards ON redeemed_prizes.reward_id = rewards.id WHERE redeemed_prizes.user_id = $1", [user_id]);;
    return rewards;
  };