import { useRewardContext } from "../contexts/rewardContexts"
import { useAppContext } from "../contexts/userContexts";



import axios from "axios";

import toTitleCase from "../utils/titleCase";




export default function RewardsAvilable(){
    const { sharedValue, setSharedValue } = useAppContext();
    const { rewards } = useRewardContext();
    const avaliableRewards = rewards.filter((reward) => reward.status === 'active');

    function SubtractPoints(cost:number){
        if(sharedValue.id === 0){
            alert('Please login to redeem rewards');
            return;
        }
        axios.put(`http://localhost:3000/users/${sharedValue.id}`, {
            name: sharedValue.name,
            location: sharedValue.location,
            points: sharedValue.points - cost
        })
        .then(() => {
          getPoints();
          console.log(sharedValue);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    function getPoints(){
        if(sharedValue.id === 0){
            alert('Please login to redeem rewards');
            return;
        }
        axios.get(`http://localhost:3000/users/${sharedValue.id}`)
        .then((response) => {
          setSharedValue(response.data[0]);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    function getReward(id: number,points: number){
        if(points > sharedValue.points){
            alert('Not enough points to redeem this reward');
            return;
        }
        axios.get(`http://localhost:3000/rewards/${id}`)
        .then((response) => {
          console.log(response.data[0]);
          SubtractPoints(points);
          redeemReward(id,points);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
       function redeemReward(id: number, cost: number){
        console.log(`Id = ${sharedValue.id}`);
        axios.post(`http://localhost:3000/users/rewards/${sharedValue.id}`, {
            user_id: sharedValue.id,
            reward_id: id,
            price_at_pruchase: cost
        })
        .then(() => {
          console.log('Reward Redeemed');
        })
        .catch((error) => {
          console.log(error);
        });
    }

        return (
            <>
            <h1>Rewards Avilable</h1>
            <div className='rewards-container'>
            {avaliableRewards.map((reward) => (
                <div key={reward.id} className='rewards-item'>
                    <h1>{toTitleCase(reward.name)}</h1>
                  <div className='reward-points'>
                    <h3>Points Needed to Redeem: {reward.points}</h3>
                    <button onClick={() => getReward(reward.id,reward.points)}>Redeem</button>
                  </div>
                </div>
            ))}
            </div>
            </>
        )
    }