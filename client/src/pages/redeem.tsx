import { useAppContext } from '../contexts/userContexts';
import axios from 'axios';
import { useState , useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'; 

Chart.register(CategoryScale);


interface RewardsProps {
    id: number;
    name: string;
    points: number;
}

interface RewardsHistory {
    name: string;
    price_at_purchase: number;
    redeem_date: string;
}

interface prizePopularity {
    reward_id: number;
    name: string;
    redeemed_count: number;
}

export default function Rewards(){
    const [rewardsWon, setRewardsWon] = useState<RewardsHistory[]>([]);
    const { sharedValue } = useAppContext();
    const { setSharedValue } = useAppContext();
    const [rewards, setRewards] = useState<RewardsProps[]>([]);
    const [viewRewardsHistory, setViewRewardsHistory] = useState<boolean>(false);
    const [rewardsSummary, setRewardsSummary] = useState<prizePopularity[]>([]);
    const [showRewardsSumary, setShowRewardsSummary] = useState<boolean>(false);
    const [prizeLength, setPrizeLength] = useState<number>(0);
    const [showGraph, setShowGraph] = useState<boolean>(false);

    function getRewards(){
        axios.get(`http://localhost:3000/rewards/active`)
        .then((response) => {
          setRewards(response.data);
          console.log(response.data);
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

    function getPoints(){
        axios.get(`http://localhost:3000/users/${sharedValue.id}`)
        .then((response) => {
          setSharedValue(response.data[0]);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function AddPoints(){
        axios.put(`http://localhost:3000/users/${sharedValue.id}`, {
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

    function viewRewardsSumary(){
        axios.get(`http://localhost:3000/users/rewards/popular/userid/${sharedValue.id}`)
        .then((response) => {
          console.log(response.data);
          setRewardsSummary(response.data);
          setPrizeLength(response.data.length);
          setShowRewardsSummary(true);
          setShowGraph(true);
        })
        .catch(() => {
          console.log('error');
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
            <div className='rewards-history-container'>
            {rewardsWon.map((reward) => (
                <div className='rewards-history-item' key={reward.name}>
                    <h1>{reward.name}</h1>
                    <h3>Points Redeemed: {reward.price_at_purchase}</h3>
                    <h3>Redeemed on: {reward.redeem_date}</h3>
                </div>
            ))}
            </div>
            </>
        )
    }

    function RewardsSummary(){
      return(
        <>
            {showGraph ? Graph(prizeLength) : null}
            <div className='rewards-container'>
            {rewardsSummary.map((reward) => (
                <div className= 'rewards-item' key={reward.reward_id}>
                    <h1>{reward.name}</h1>
                    <h3>Redeemed: {reward.redeemed_count}</h3>
                </div>
            ))}
            </div>
        </>
      )
    }

    function Graph(length: number){
        const data = {
            labels: rewardsSummary.map((reward) => reward.name),
            datasets: [
              {
                label: 'Redeemed Count',
                data: rewardsSummary.map((reward) => reward.redeemed_count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          };
          
          const options = {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };

          if(length === 0){
            return(
                <h1>No Data Yet!</h1>
            )
          }
          
          return <Bar data={data} options={options} />;
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
            <div className='rewards_history_buttons'>
              <button onClick={() => ViewPastRewards()}>Click to Get Full History</button>
              <button onClick={() => viewRewardsSumary()}> Get Summary</button>
              <button onClick={() => setShowRewardsSummary(false)}> Hide Summary</button>
            </div>
            {showRewardsSumary && <RewardsSummary />}
            {viewRewardsHistory && <RewardsHistory />}
        </div>
    )
}