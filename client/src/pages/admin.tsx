import { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/userContexts';


interface User {
    id: number;
    name: string;
    location: string;
    points: number;
  }

export default function Admin(){
    const { setSharedValue } = useAppContext();
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [menu, setMenu] = useState(false);
    const [updateResponse, setUpdateResponse] = useState('');
    const [updatedPoints, setUpdatedPoints] = useState(0);


    useEffect(() => {
        viewAllUsers();
      }, []);

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

    function deleteUser(id: number) {
        axios.delete(`http://localhost:3000/${id}`)
        .then((response) => {
          console.log(response);
          setUpdateResponse('User deleted successfully!');
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
    <> 
        <div className='userButtons'>{
                users.map(user => 
                  <div key={user.id}>
                    <Link to = '/'><button onClick={() => viewUser(user.id)}>Go to {user.name}'s Account</button></Link>
                    <button onClick={() => deleteUser(user.id)}>Delete {user.name}</button>
                    <button onClick={() => updateUser(user.id,user.name,user.location,user.points)}>Update {user.name}</button>
                  </div>
                )
        }</div>
        {menu && <UpdateMenu />}
        {updateResponse}
    </>   
    )
}