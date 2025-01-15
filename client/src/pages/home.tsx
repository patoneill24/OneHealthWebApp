import React, { useRef, useState} from 'react';
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

    function updateUser(id: number) {
      setMenu(true);
      setId(id);
    }

    function UpdateMenu() {
      const inputRefName = useRef() as React.MutableRefObject<HTMLInputElement>;
      const inputRefLocation = useRef() as React.MutableRefObject<HTMLInputElement>;


      function updateUserByID(id: number) {
        axios.put(`http://localhost:3000/${id}`, {
          name: inputRefName.current.value,
          location: inputRefLocation.current.value
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

      // const InputField = React.memo(({ value, onChanged }:Item) => {
      //   return <input value={value} onChange={onChanged} />;
      // });
      

      return(
        <div>
          <label>Enter Name: </label>
          <input
          className='updateUser'
          type='text'
          placeholder='Name'
          ref = {inputRefName}
          />
          <label>Enter Location: </label>
          <input
          className='updateUser'
          type='text'
          placeholder='Location'
          ref = {inputRefLocation}
          />
          <button
          onClick={() => updateUserByID(id)}
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
              <button onClick={() => updateUser(user.id)}>Update {user.name}</button>
            </div>
          )
          }
          </div> 
          {menu ? <UpdateMenu /> : null}
        </div>
    )
}