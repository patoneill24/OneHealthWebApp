import { useAppContext } from '../contexts/userContexts';
import Dashboard from '../components/dashboard';
import LoggedOut from '../components/loggedOut';
import DrugDashboard from '../components/drugDashboard';
import Greetings from '../components/greetings';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {

    const [name, setName] = useState<string>("");
  const {sharedValue} = useAppContext();

  useEffect(() => {
    axios.get('http://localhost:3000/user',{withCredentials: true})
    .then((response) => {
        console.log(response.data.id);
        setName(response.data.firstName);
        })
    .catch((error) => {
        console.log(error);
    }
    );

  });


  if(sharedValue.name === ""){
    return(
        <div>
            <h1>Welcome to OneHealth, { name } </h1>
            <LoggedOut />
        </div>
    )} 
    return(
        <div >
            <Greetings />
            <div className='dashboard'>   
                <Dashboard />
                <DrugDashboard />
            </div>   
        </div>
    )
}