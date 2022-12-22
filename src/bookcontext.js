import React, { useContext, useEffect, useState } from 'react'
import {
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    collection,
    where,
    getDoc,
    getDocs,
    limit
} from 'firebase/firestore'

import {
   booksColRef,
   db
} from './firebase'
import { useUserContext } from './usercontext'

const BookContext = React.createContext()


const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([])
    const [error, setError] = useState('')
    const [userbooks, setUserBooks] = useState([])
    const [search, setSearch] = useState("")
    const { user } = useUserContext();
    
    function fetchBooks() {
        const q = query(booksColRef, where("title", "==", `${search}`))
        console.log(q, search)
        getDocs(q)
           .then((snapshot) => {
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setBooks(books)
           })
    }
    
    function uploadBooks(obj) {
        addDoc(booksColRef, obj).then(() => {
            console.log("successfully uploaded")
        }).catch(err => {
            console.log(err)
        })
    }

    function deleteBooks(id) {
        const bookdocRef = doc(db, 'books', id)
        deleteDoc(bookdocRef)
            .then(() => {
                console.log("succesfully deleted")
            }).catch(err => {
                console.log("error deleting book")
            })
    }

    useEffect(() => {
        const listener = onSnapshot(booksColRef, (snapshot) => {
            let tempBooks = []
            snapshot.docs.forEach((doc) => {
                tempBooks.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            // console.log("hello")
            setBooks(tempBooks)
        })
        return () => listener()
    }, [])

    useEffect(() => {
        const q = query(collection(db, "books"), where("email", "==", user.email?user.email:''), limit(10));
       
        const unsub = onSnapshot(q, (snapshot) => {
            const tempBooks = []
            snapshot.docs.forEach((doc) => {
                tempBooks.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setUserBooks(tempBooks)

        })

        return () => unsub()
    }, [user])
   
   useEffect(() => {
     const temp = search.trim()
     if(!temp) {
        getDocs(booksColRef)
           .then((snapshot) => {
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setBooks(books)
           })
     }
   }, [search])

    return <BookContext.Provider value={{
         books,
         deleteBooks,
         uploadBooks,
         userbooks,
         search,
         setSearch,
         fetchBooks
    }}>
        {
            children
        }
    </BookContext.Provider>
}

export const useGlobalBookContext = () => {
    return useContext(BookContext)
}

export { BookProvider }