import { useState,useContext} from 'react';
import { default as axios } from 'axios';
import { Link } from 'react-router';

interface User {
    id: number;
    name: string;
    location: string;
  }

export default function Home() {
      const [name, setName] = useState('');
      const [location, setLocation] = useState('');
      const [response, setResponse] = useState('');
      const [users, setUsers] = useState<User[]>([]);
      const [data, setData] = useState('');
    
    function submitForm(userName: string, userLocation: string) {
        axios.post('http://localhost:3000', {
            name: userName,
            location: userLocation
        })
      .then((response) => {
        console.log(response);
        setResponse('User added successfully!');
        setName('');
        setLocation('');
      })
      .catch((error) => {
        console.log(error);
      });
    }
    function viewAllUsers() {
      axios.get('http://localhost:3000')
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  
    function viewUser(id: number) {
      axios.get(`http://localhost:3000/${id}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
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
        <button
        onClick={() => submitForm(name, location)}
        >Submit New User</button>
        <p>{response}</p>
        <button onClick={() => viewAllUsers()}>View All Users</button>
        <div className='userButtons'>{users.map(user => 
          <div key={user.id}>
            <Link to = '/rewards'><button onClick={() => viewUser(user.id)}>Go to {user.name}'s Account</button></Link>
          </div>
        )}</div> 
      </div>
    )
}