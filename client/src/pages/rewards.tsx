import { useAppContext } from '../contexts/userContexts';
import axios from 'axios';
import { useState , useEffect} from 'react';


interface RewardsProps {
    id: number;
    name: string;
    points: number;
}

interface RewardsHistory {
    name: string;
    points: number;
    redeem_date: string;
}

export default function Rewards(){
    const [rewardsWon, setRewardsWon] = useState<RewardsHistory[]>([]);
    const { sharedValue } = useAppContext();
    const { setSharedValue } = useAppContext();
    const [rewards, setRewards] = useState<RewardsProps[]>([]);
    const [viewRewardsHistory, setViewRewardsHistory] = useState<boolean>(false);

    function getRewards(){
        axios.get(`http://localhost:3000/rewards`)
        .then((response) => {
          setRewards(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function redeemReward(id: number){
        axios.post(`http://localhost:3000/${sharedValue.id}/rewards`, {
            user_id: sharedValue.id,
            reward_id: id
        })
        .then(() => {
          console.log('Reward Redeemed');
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
          redeemReward(id);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getPoints(){
        axios.get(`http://localhost:3000/${sharedValue.id}`)
        .then((response) => {
          setSharedValue(response.data[0]);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function AddPoints(){
        axios.put(`http://localhost:3000/${sharedValue.id}`, {
            name: sharedValue.name,
            location: sharedValue.location,
            points: sharedValue.points + 10
        })
        .then(() => {
          getPoints();
          console.log(sharedValue);
        })
        .catch((error) => {
          console.log(error);
        });
    }


    function SubtractPoints(cost:number){
        axios.put(`http://localhost:3000/${sharedValue.id}`, {
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

    function ViewPastRewards(){
        axios.get(`http://localhost:3000/${sharedValue.id}/rewards`)
        .then((response) => {
          console.log(response.data);
          setRewardsWon(response.data.user);
          setViewRewardsHistory(true);
        })
        .catch((error) => {
          console.log(error);
          console.log('No Rewards Redeemed');
        });
    }

    
    function RewardsAvilable(){
        return (
            <>
            <h1>Rewards Avilable</h1>
            <div className='rewards-container'>
            {rewards.map((reward) => (
                <div key={reward.id} className='rewards-item'>
                    <h1>{reward.name}</h1>
                    <h3>Points Needed to Redeem: {reward.points}</h3>
                    <button onClick={() => getReward(reward.id,reward.points)}>Redeem</button>
                </div>
            ))}
            </div>
            <div className='AddPoints'>
                <h1>Want to add more points?</h1>
                <button onClick={() => AddPoints()}>Add 10 points</button>
            </div>
            </>
        )
    }

    function RewardsHistory(){
        return (
            <>
            <h1>Redeemed Rewards</h1>
            <div className = 'rewards_history_buttons'>
              <button onClick={() => ViewPastRewards()}>Refresh Rewards History</button>
              <button onClick={() => setViewRewardsHistory(false)}> Hide Rewards History</button>
            </div>
            {rewardsWon.map((reward) => (
                <div key={reward.name}>
                    <h1>{reward.name}</h1>
                    <h3>Points Redeemed: {reward.points}</h3>
                    <h3>Redeemed on: {reward.redeem_date}</h3>
                </div>
            ))}
            </>
        )
    }

    function SignOut(){
        setSharedValue({id:0, name: "", location: "", points: 0});
    }

    useEffect(() => {
        getRewards();
    },[])

    if(sharedValue.name === ""){
        return(
            <div>
                <h1>Welcome to Rewards Page!</h1>
                <h2>Please Login or Register</h2>
            </div>
        )
    } 
    return (
        <div>
            <h1>Welcome to { sharedValue.name }'s Rewards Page! </h1>
            <h2>Points Avaliable: {sharedValue.points}</h2>
            <h3>Location: {sharedValue.location}</h3>
            <button onClick={() => SignOut()}>Sign Out</button>
            <RewardsAvilable />
            <h1>Redeemed Rewards</h1>
            <button onClick={() => ViewPastRewards()}>Click to View</button>
            {viewRewardsHistory && <RewardsHistory />}
        </div>
    )
}