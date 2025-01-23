import './App.css';
import { Routes,Route } from 'react-router';
import Rewards from './pages/rewards';
import Home from './pages/home';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router';
import { AppProvider } from './contexts/userContexts';



function App() {
  return (
    <>
    <AppProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rewards' element={<Rewards />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        </BrowserRouter>
    </AppProvider>
    </>
  )
}

export default App
