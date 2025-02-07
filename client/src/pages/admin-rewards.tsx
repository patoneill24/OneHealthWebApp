import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'; 
import Switch from '@mui/material/Switch';
import toTitleCase from "../assets/titleCase";

Chart.register(CategoryScale);

interface RewardsProps {
    id: number;
    name: string;
    points: number;
    status: string;
}

interface prizePopularity {
    reward_id: number;
    name: string;
    redeem_count: number;
}

interface locationProp{
    location: string;
}
export default function AdminRewards() {
    const [rewards, setRewards] = useState<RewardsProps[]>([]);
    const inputRefName = useRef() as React.MutableRefObject<HTMLInputElement>;
    const inputRefPoints = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [popularPrizes, setPopularPrizes] = useState<prizePopularity[]>([]);
    const [showPopularPrizes, setShowPopularPrizes] = useState<boolean>(false);
    const [locations, setLocations] = useState<locationProp[]>([]);
    const [locationOption, setLocationOption] = useState<string>('');
    const [showLocationFilter, setShowLocationFilter] = useState<boolean>(false);
    const [prizeLength, setPrizeLength] = useState<number>(0);
    function getRewards() {
        axios.get(`http://localhost:3000/rewards`)
        .then((response) => {
          setRewards(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function checkDuplicate(name: string,points: number) {
        if(name === '' || points === 0){
            alert('Please fill out all fields');
            return;
        }
        axios.get(`http://localhost:3000/rewards/name/${name}`)
        .then((response) => {
          console.log(response.data.length);
          if(response.data.length > 0){
            alert('Prize Already Exists!');
          } else {
            addReward(name, points);
          }
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }

    function addReward(reward_name: string, reward_points: number) {
        axios.post(`http://localhost:3000/rewards`, {
            name: reward_name,
            points: reward_points
        })
        .then((response) => {
          console.log(response.data);
          getRewards();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getPopularPrizes() {
        axios.get(`http://localhost:3000/users/rewards/popular`)
        .then((response) => {
          setPopularPrizes(response.data);
          setPrizeLength(response.data.length);
          console.log(response.data);
          setShowPopularPrizes(true);
          setLocationOption('All Locations');
          getLocations();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getPopularPrizesByLocation(location: string) {
        axios.get(`http://localhost:3000/users/rewards/popular/${location}`)
        .then((response) => {
          setPopularPrizes(response.data);
          setPrizeLength(response.data.length);
          console.log(response.data);
          setLocationOption(location);
        })
        .catch((error) => {
          console.log(error);
        });
    }


    function resetFilters(){
        setShowLocationFilter(false);
        setLocationOption('All Locations');
        getPopularPrizes();
    }

    function changeStatus(status: string) {
        if(status === 'active'){
            return 'inactive';
        } else {
            return 'active';
        }
    }

    function updateReward(id: number,name:string,points:number,status:string) {
        axios.put(`http://localhost:3000/rewards/${id}`, {
            name: name,
            points: points,
            status: status
        })
        .then((response) => {
            console.log(response.data);
            getRewards();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getLocations() {
        axios.get(`http://localhost:3000/users/locations`)
        .then((response) => {
          setLocations(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }


    function CreateReward(){
        return(
            <>
            <div className="create-reward">
            <h3>Create Reward</h3>
                <div className="create-reward-form">
                    <input id = "nameText" type="text" placeholder="Reward Name" ref={inputRefName}></input>
                    <input type="Number" placeholder="Points" step={5} ref={inputRefPoints}></input>
                    <button onClick={() => checkDuplicate((inputRefName.current.value).toLowerCase(),Number(inputRefPoints.current.value))}>Create</button>
                </div>
            </div>
            </>
        )
    }

    function addPoints(points:number){
        return (points + 5);
    }

    function subtractPoints(points: number): number {
        if (points === 5) {
            alert('Rewards cannot be less than 5 points');
            return points;
        }
        return points - 5;
    }


    useEffect(() => {
        getRewards();
    }, []);

    function PopularPrizes (){
        return(
        <div className="rewards-list-container-admin">
            <button onClick={() => setShowPopularPrizes(false)}>Close</button>
            <h4>Filter By Location?</h4>
            <button onClick={() => setShowLocationFilter(true)}>Yes</button>
            {showLocationFilter ? filterByLocation() : <></>}
            {Graph(prizeLength)}
            <div className="popular-prizes-admin">
            {popularPrizes.map((prize,index) => {
                return (
                    <div className = "rewards-item-admin" key={prize.reward_id}>
                        <h2> {index + 1}. {toTitleCase(prize.name)}</h2>
                        <h3>Redeem Count: {prize.redeem_count}</h3>
                    </div>
                )
            })}
            </div>
            </div>
        )
    }

    function filterByLocation(){
        return(
            <>
            <select name="selectedLocation" id="selectedLocation" value={locationOption} onChange={(e) => getPopularPrizesByLocation(e.target.value)}>
            <option value="">All Locations</option>
            {locations.map((location) => {
                return(
                    <option value={location.location}>{toTitleCase(location.location)}</option>
                )
            })}
            </select>
            <button onClick={() => resetFilters()}>Close</button>
            </>
        )
    }

    function Graph(prizesLength: number){
        if(prizesLength === 0){
            return(
                <h1>No Data Yet!</h1>
            )
        }
        return(
            <div className="bar-graph">
            <Bar data={{
                labels: popularPrizes.map((prize) => toTitleCase(prize.name)),
                datasets: [{
                    label: "Redeem Count",
                    data: popularPrizes.map((prize) => prize.redeem_count),
                    backgroundColor: "blue",
                }]
            }}
            />
            </div>
        )
    }
    
    
    return (
        <>
        <h1>Admin Rewards</h1>
        <div className="rewards-container-admin">
            {rewards.map((reward: RewardsProps) => {
                return (
                    <div key= {reward.id} className="rewards-item-admin">
                        <h3>{toTitleCase(reward.name)}</h3>
                        <div className="status-container">
                        <p>Status:</p>
                        <Switch checked={reward.status === 'active' ? true : false} onChange={() => updateReward(reward.id,reward.name,reward.points,changeStatus(reward.status))}/>
                        </div>
                        <div className="points-container">
                        <button onClick={() => updateReward(reward.id,reward.name,subtractPoints(reward.points),reward.status)}>-</button>
                        <p>{reward.points}</p>
                        <button onClick={()=> updateReward(reward.id,reward.name,addPoints(reward.points),reward.status)}>+</button>
                        </div>
                    </div>
                )
            })}
        </div>
         <CreateReward />
        <h1>Most Popular Prizes</h1>
        <button onClick={() => getPopularPrizes()}>Get Overall Popular Prizes</button>
        {showPopularPrizes ? <PopularPrizes /> : <></>}
        </>
    );
}