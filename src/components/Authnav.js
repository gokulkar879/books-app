import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../usercontext'

function Authnav() {
  const { user } = useUserContext()
  return (
    <div className='authNav'>
      {
        (!user) ? <Link to="/signin">Signin</Link> : <Link to="/dashboard">Dashboard</Link>
      }
    </div>
  )
}

export default Authnav