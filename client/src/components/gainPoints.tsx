import axios from "axios";
import { useAppContext } from "../contexts/userContexts";

export default function GainPoints() {
    const {sharedValue, setSharedValue} = useAppContext();
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
    return (
        <div>
            <div className='AddPoints'>
                <h1>Want to add more points?</h1>
                <button onClick={() => AddPoints()}>Add 10 points</button>
            </div>
        </div>
    )
}