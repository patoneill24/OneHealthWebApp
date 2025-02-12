import { useState } from "react";
import { useRewardsHistoryContext } from "../contexts/rewardsHistoryContext";
import { useAppContext } from "../contexts/userContexts";
import axios from "axios";
import toTitleCase from "../utils/titleCase";



export default function RewardsHistory() {
    const { sharedValue } = useAppContext();
    const { rewardsWon, setRewardsWon } = useRewardsHistoryContext();
    const [viewRewardsHistory, setViewRewardsHistory] = useState<boolean>(false);


    function ViewPastRewards(){
        axios.get(`http://localhost:3000/users/rewards/${sharedValue.id}`)
        .then((response) => {
          console.log(response.data);
          setRewardsWon(response.data);
          setViewRewardsHistory(true);
        })
        .catch(() => {
          console.log('error');
        });
    }

    if(!viewRewardsHistory){
        return(
            <div className="rewards-history">
                <h1>Rewards History</h1>
                <button onClick={() => ViewPastRewards()}>View Rewards History</button>
            </div>
        )
    }
        return (
            <>
            <h1>Redeemed Rewards</h1>
            <div className = 'rewards_history_buttons'>
              <button onClick={() => ViewPastRewards()}>Refresh Rewards History</button>
              <button onClick={() => setViewRewardsHistory(false)}> Hide Rewards History</button>
            </div>
            <div className='rewards-history-container'>
            {rewardsWon.map((reward) => (
                <div className='rewards-history-item' key={reward.name}>
                    <h1>{toTitleCase(reward.name)}</h1>
                    <h3>Points Redeemed: {reward.price_at_purchase}</h3>
                    <h3>Redeemed on: {reward.redeem_date}</h3>
                </div>
            ))}
            </div>
            </>
        )
    }
