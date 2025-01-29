import { useState } from 'react';
import axios from 'axios';

export default function Register(){
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [points, setPoints] = useState(0);
    const [response, setResponse] = useState('');

    function submitForm(userName: string, userLocation: string, points: number) {
        if(userName === '' || userLocation === ''){
            setResponse('Error: Please fill out all fields');
            return;
        }
        axios.post('http://localhost:3000/users', {
            name: userName,
            location: userLocation,
            points: points
        })
      .then((response) => {
        console.log(response);
        setResponse('User added successfully!');
        setName('');
        setLocation('');
        setPoints(0);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    return(
        <div className="card">
          <label>Enter Name: </label>
          <input 
          type='text' 
          placeholder='Name' 
          value={name}
          onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Enter Location: </label>
          <input type='text' 
          placeholder='Location' 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          >
          </input>
          <label>Enter Points: </label>
          <input type='number'
          placeholder='Points'
          className='points'
          step = '5'
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          ></input>
          <button
          onClick={() => submitForm(name, location, points)}
          >Submit New User</button>
          <p>{response}</p>
        </div>
    )
}