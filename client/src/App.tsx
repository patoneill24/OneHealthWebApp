import './App.css';
import { Routes,Route } from 'react-router';
import Rewards from './pages/rewards';
import Home from './pages/home';
import { BrowserRouter } from 'react-router';
import { createContext,useContext ,useState} from 'react';



function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rewards' element={<Rewards />} />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
