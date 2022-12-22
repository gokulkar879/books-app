import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import { useUserContext } from './usercontext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useUserContext()
  return (
    <div className="App">
       <Router>
         <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>}></Route>
         </Routes>
       </Router>
    </div>
  );
}

export default App;
