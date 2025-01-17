import React, { useRef, useState} from 'react';
import { default as axios } from 'axios';
import { Link } from 'react-router';
import { useAppContext } from '../contexts/userContexts';

interface User {
    id: number;
    name: string;
    location: string;
    points: number;
  }



export default function Home() {
      const { setSharedValue } = useAppContext();
      const [id, setId] = useState(0);
      const [name, setName] = useState('');
      const [location, setLocation] = useState('');
      const [points, setPoints] = useState(0);
      const [response, setResponse] = useState('');
      const [users, setUsers] = useState<User[]>([]);
      const [menu, setMenu] = useState(false);
      const [updateResponse, setUpdateResponse] = useState('');
      const [updatedPoints, setUpdatedPoints] = useState(0);
    
    function submitForm(userName: string, userLocation: string, points: number) {
        axios.post('http://localhost:3000', {
            name: userName,
            location: userLocation,
            points: points
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
        setSharedValue(response.data[0]);
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

    function updateUser(id: number, name: string, location: string, points: number) {
      setMenu(true);
      setId(id);
      setName(name);
      setLocation(location);
      setUpdatedPoints(points);
    }

    function UpdateMenu() {
      const inputRefName = useRef() as React.MutableRefObject<HTMLInputElement>;
      const inputRefLocation = useRef() as React.MutableRefObject<HTMLInputElement>;

      function updateUserByID(id: number) {
        axios.put(`http://localhost:3000/${id}`, {
          name: inputRefName.current.value,
          location: inputRefLocation.current.value,
          points : updatedPoints
        })
        .then((response) => {
          console.log(response);
          setUpdateResponse('User updated successfully!');
          viewAllUsers();
          setMenu(false);
        })
        .catch((error) => {
          console.log(error);
        });
      }

      // const InputField = React.memo(({ value, onChanged }:Item) => {
      //   return <input value={value} onChange={onChanged} />;
      // });
      

      return(
        <div>
          <label>Enter Name: </label>
          <input
          className='updateUser'
          type='text'
          placeholder={name}
          ref = {inputRefName}
          />
          <label>Enter Location: </label>
          <input
          className='updateUser'
          type='text'
          placeholder={location}
          ref = {inputRefLocation}
          />
          <label>Enter Points: </label>
          <input
          className='updateUser'
          type='number'
          placeholder='Points'
          step = '5'
          value={updatedPoints}
          onChange={(e) => setUpdatedPoints(Number(e.target.value))}
          ></input>
          <button
          onClick={() => updateUserByID(id)}
          >Update User</button>
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
          <button onClick={() => viewAllUsers()}>View All Users</button>
          <div className='userButtons'>{
          users.map(user => 
            <div key={user.id}>
              <Link to = '/rewards'><button onClick={() => viewUser(user.id)}>Go to {user.name}'s Account</button></Link>
              <button onClick={() => deleteUser(user.id)}>Delete {user.name}</button>
              <button onClick={() => updateUser(user.id,user.name,user.location,user.points)}>Update {user.name}</button>
            </div>
          )
          }
          </div> 
          {menu ? <UpdateMenu /> : null}
          {updateResponse}
        </div>
    )
}