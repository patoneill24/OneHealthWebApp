import './App.css';
import { Routes,Route } from 'react-router';
import Redeem from './pages/redeem';
import Home from './pages/home';
import { BrowserRouter } from 'react-router';
import { AppProvider } from './contexts/userContexts';
import Navbar from './components/navbar';
import Login from './pages/login';
import Register from './pages/register';
import Learn from './pages/learn';
import Medication from './pages/medications';
import Admin from './pages/admin';
import AdminRewards from './pages/admin-rewards';
import Footer from './components/footer';


function App() {
  return (
    <>
    <AppProvider>
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rewards' element={<Redeem />} />
          <Route path='/learn' element= {<Learn />} />
          <Route path ='/medication' element={<Medication />} />
          <Route path ='/login' element={<Login />} />
          <Route path ='/register' element={<Register/>} />
          <Route path='/admin' element={<Admin /> } />
          <Route path='/adminrewards' element={<AdminRewards /> } />
        </Routes>
        <Footer />
        </BrowserRouter>
    </AppProvider>
    </>
  )
}

export default App
