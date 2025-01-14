import { useState} from 'react';
import { default as axios } from 'axios';
import { Link } from 'react-router';
import { useAppContext } from '../contexts/userContexts';

interface User {
    id: number;
    name: string;
    location: string;
  }



export default function Home() {
      const { setSharedValue } = useAppContext();
      const [id, setId] = useState(0);
      const [name, setName] = useState('');
      const [location, setLocation] = useState('');
      const [response, setResponse] = useState('');
      const [users, setUsers] = useState<User[]>([]);
      const [menu, setMenu] = useState(false);
      const [updatedName, setUpdatedName] = useState('');
      const [updatedLocation, setUpdatedLocation] = useState('');
      const [updateResponse, setUpdateResponse] = useState('');
    
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
        setSharedValue(response.data[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    function deleteUser(id: number) {
      axios.delete(`http://localhost:3000/${id}`)
      .then((response) => {
        console.log(response);
        setResponse('User deleted successfully!');
        viewAllUsers();
      })
      .catch((error) => {
        console.log(error);
      });
    }

    function updateUser(id: number, name: string, location: string) {
      setMenu(true);
      setId(id);
      setUpdatedName(name);
      setUpdatedLocation(location);
    }

    function UpdateMenu() {
      function updateUserByID(id: number, name: string, location: string) {
        axios.put(`http://localhost:3000/${id}`, {
          name: name,
          location: location
        })
        .then((response) => {
          console.log(response);
          setUpdateResponse('User updated successfully!');
          viewAllUsers();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    
    
      return(
        <div>
          <label>Enter Name: </label>
          <input 
          type='text' 
          placeholder='Name' 
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          ></input>
          <label>Enter Location: </label>
          <input type='text' 
          placeholder='Location' 
          value={updatedLocation}
          onChange={(e) => setUpdatedLocation(e.target.value)}
          >
          </input>
          <button
          onClick={() => updateUserByID(id,updatedName, updatedLocation)}
          >Update User</button>
          {updateResponse}
        </div>
      )
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
          <div className='userButtons'>{
          users.map(user => 
            <div key={user.id}>
              <Link to = '/rewards'><button onClick={() => viewUser(user.id)}>Go to {user.name}'s Account</button></Link>
              <button onClick={() => deleteUser(user.id)}>Delete {user.name}</button>
              <button onClick={() => updateUser(user.id,user.name,user.location)}>Update {user.name}</button>
            </div>
          )
          }
          </div> 
          {menu ? <UpdateMenu /> : null}
        </div>
    )
}