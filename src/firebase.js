import { initializeApp } from 'firebase/app'

import {
    collection,
  getFirestore
} from 'firebase/firestore'

import {
  getAuth
} from 'firebase/auth'

import {
  getStorage,
  ref
} from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


//init firebase
initializeApp(firebaseConfig)

//init services
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()


//collection red to a particular collection
export const booksColRef = collection(db, 'books')
export const userColRef = collection(db, 'users')

//reference to the storage
export const storageRef = ref(storage, 'images')




