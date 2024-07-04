import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from "./components/Login";
import { PrivateRouter } from './components/PrivateRote';
import { Signup } from "./components/Signup";
import { Dashboard } from './components/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <></>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<PrivateRouter><Dashboard/></PrivateRouter>}/>
      </Routes>
    </>
  )
}

export default App
