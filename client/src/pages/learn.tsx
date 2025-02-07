import { useAppContext } from "../contexts/userContexts";
import toTitleCase from "../assets/titleCase";

export default function Learn() {
  const { sharedValue } = useAppContext();
  const { setSharedValue } = useAppContext();

    function SignOut(){
        setSharedValue({id:0, name: "", location: "", points: 0});
    }
  if(sharedValue.name === ""){
    return(
        <div>
            <h1>Learn About Medications</h1>
            <h2>Please Login or Register</h2>
        </div>
)}
  return (
    <div>
      <h1>Learn About Medications</h1>
      <h2>Current User: {toTitleCase(sharedValue.name)}</h2>
      <h2>Location: {toTitleCase(sharedValue.location)}</h2>
      <h2>Points: {sharedValue.points}</h2>
      <button onClick={() => SignOut()}>Sign Out</button>
    </div>
  );
}