import Login from '../components/Login'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Signup from '../components/Signup'
import './Signin.css'


function Signin() {
  const [type, setType] = useState(0)
  
  const handleClick = e => {
    setType(1-type)
  }

  return (
    <div className='signin'>
      <div className='signin-nav'>
      <Link to="/">Home</Link>
      </div>
      <div className='signin-center'>
       
    
        {
          (type === 0 ? <Signup /> : <Login />)
        }
         <button className='btn' onClick={handleClick}>{type === 0 ? 'Login' : 'Signup'}</button>
      </div>
    </div>
  )
}

export default Signin