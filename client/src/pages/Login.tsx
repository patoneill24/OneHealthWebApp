import { useState } from 'react';
import OneHealthLogo from '../components/OneHealthLogo';
import '../../css/Login.css';

export default function Login(){
    // state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        console.log(`User ${email} has logged in`);
    }

    return (
        <>
            <div className="logo-header">
                <OneHealthLogo />
                <h1>ONEHEALTH</h1>
            </div>
            <div className="login-card">
                <div className="login-form">
                    <form action="">
                        <input 
                            type="email"
                            placeholder='Email' 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder='Password'
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="user-help"> 
                            <input 
                                type="checkbox" 
                                name="remember" 
                                id="remember" 
                            />
                            <label htmlFor="remember">
                                Remember me
                            </label>
                            <a href="http://" target="_blank" rel="noopener noreferrer">
                                Forgot Password?
                            </a>
                        </div>
                        <button type="button" onSubmit={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}