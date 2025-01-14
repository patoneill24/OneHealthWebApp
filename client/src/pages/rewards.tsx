import {Link } from 'react-router-dom';
import { useAppContext } from '../contexts/userContexts';

export default function Rewards(){
    const { sharedValue } = useAppContext();
    return (
        <div>
            <h1>Welcome to { sharedValue }'s account! </h1>
            <Link to='/'>Home</Link>
        </div>
    )
}