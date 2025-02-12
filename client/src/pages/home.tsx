import { useAppContext } from '../contexts/userContexts';
import Dashboard from '../components/dashboard';
import UserInfo from '../components/userInfo';
import LoggedOut from '../components/loggedOut';

export default function Home() {
  const {sharedValue} = useAppContext();


  if(sharedValue.name === ""){
    return(
        <div>
            <h1>Welcome to OneHealth</h1>
            <LoggedOut />
        </div>
    )} 
    return(
        <div >
            <h1>Welcome to OneHealth</h1>
            <UserInfo />
            <Dashboard />
        </div>
    )
}