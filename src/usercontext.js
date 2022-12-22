import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { auth } from './firebase'

const UserContext = React.createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState('')

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setUser(user)
            console.log(user, "p")
        })
        return () => unsub()
    }, [])

    return <UserContext.Provider value={{
          user,
          setUser
    }}>
        {
            children
        }
    </UserContext.Provider>
}

export const useUserContext = () => {
    return useContext(UserContext)
}

export { UserProvider }