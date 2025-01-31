import axios from "axios";
import { useState, useRef, useEffect } from "react";

interface RewardsProps {
    id: number;
    name: string;
    points: number;
    status: string;
}
export default function AdminRewards() {
    const [rewards, setRewards] = useState<RewardsProps[]>([]);
    const [createMenu, setCreateMenu] = useState<boolean>(false);
    const inputRefName = useRef() as React.MutableRefObject<HTMLInputElement>;
    const inputRefPoints = useRef() as React.MutableRefObject<HTMLInputElement>;
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

    // function changeActivation(id: number, status: string) {
    //     console.log(status);
    //     if(status === 'active'){
    //         setStatus('inactive');
    //     } else {
    //         setStatus('active');
    //     }
    //     axios.put(`http://localhost:3000/rewards/${id}`, {
    //         name: reward?.name,
    //         points: reward?.points,
    //         status: rewardstatus
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       getRewards();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }

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
            status: changeStatus(status)
        })
        .then((response) => {
            console.log(response.data);
            getRewards();
        })
        .catch((error) => {
          console.log(error);
        });
    }


    function CreateReward(){
        return(
            <div className="create-reward">
                <h3>Create Reward</h3>
                <form action="">
                    <input type="text" placeholder="Reward Name" ref={inputRefName}></input>
                    <input type="Number" placeholder="Points" ref={inputRefPoints}></input>
                    <button onClick={() => addReward(inputRefName.current.value,Number(inputRefPoints.current.value))}>Create</button>
                </form>
            </div>
        )
    }

    useEffect(() => {
        getRewards();
    }, []);
    
    
    return (
        <>
        <h1>Admin Rewards</h1>
        <div className="rewards-container-admin">
            {rewards.map((reward) => {
                return (
                    <div key= {reward.id} className="rewards-item-admin">
                        <h3>{reward.name}</h3>
                        <p>Cost: {reward.points} points</p>
                        <p>Status: {reward.status}</p>
                        <button onClick={()=> updateReward(reward.id,reward.name,reward.points,reward.status)}>Change Activation</button>
                    </div>
                )
            })}
        </div>
        <button className="rewards-button" onClick={() => setCreateMenu(true)}>Add Reward</button>
        {createMenu ? <CreateReward /> : <></>}
        </>
    );
}