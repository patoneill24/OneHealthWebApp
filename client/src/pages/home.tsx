import { useAppContext } from '../contexts/userContexts';
import toTitleCase from '../assets/titleCase';
import Dashboard from './dashboard';

export default function Home() {
  const {sharedValue} = useAppContext();
  const {setSharedValue} = useAppContext();

  function SignOut(){
    setSharedValue({id:0, name: "", location: "", points: 0});
  }
  if(sharedValue.name === ""){
    return(
        <div>
            <h1>Welcome to OneHealth</h1>
            <h2>Please Login or Register</h2>
        </div>
    )} 
    return(
        <div >
            <h1>Welcome to OneHealth</h1>
            <h2>Current User: {toTitleCase(sharedValue.name)}</h2>
            <h2>Location: {toTitleCase(sharedValue.location)}</h2>
            <h2>Points: {sharedValue.points}</h2>
            <button onClick={() => SignOut()}>Sign Out</button>
            <Dashboard />
        </div>
    )
}