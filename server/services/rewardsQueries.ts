import pool from "../model/db.js";

export const selectAllRewards = () => {
    const rewards = pool.query('SELECT * FROM rewards');
    return rewards;
}

export const selectRewardById = (id: number) => {
    const reward = pool.query('SELECT * FROM rewards WHERE id=$1', [id]);
    return reward;
}

export const insertReward = (name: string, points: number) => {
    pool.query('INSERT INTO rewards VALUES (DEFAULT,$1, $2)', [name, points]);
}
