import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { useUserContext } from '../usercontext'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   const { setUser } = useUserContext()

    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
           .then((cred) => {
            console.log(cred)
            setUser(cred)
            navigate('/', {replace: true})
           }).catch(err => {
            console.log(err)
           })

    }
  return (
    <form className='form'>
        <p className='form-header'>Login</p>
        <label htmlFor='email' className='form-label'>Email</label>
        <input
        type="email"
        className='book-inf'
        name="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        required
        ></input>

        <label htmlFor='password' className='form-label'>Password</label>
        <input 
        type="password" 
        className='book-inf'
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        ></input>
        
        <button className='submit-btn' onClick={handleLogin}>Login</button>
    </form>
  )
}

export default Login