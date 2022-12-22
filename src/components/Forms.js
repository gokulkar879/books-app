import React, { useState } from 'react'
import {
    getDownloadURL,
    ref,
  uploadBytes
} from 'firebase/storage'
import { auth, booksColRef, storage, storageRef } from '../firebase'
import { addDoc } from 'firebase/firestore'
import { useGlobalBookContext } from '../bookcontext'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../usercontext'


function Forms() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState(null) 
    const { uploadBooks } = useGlobalBookContext()
    const {user} = useUserContext()

    const navigate = useNavigate()

    const handleUpload = e => {
        e.preventDefault()
        let bookData = {
            title: title,
            author: author,
            url: '',
            email: user.email
        }
         if(image) {
            const imageRef = ref(storage, `images/${image.name}`)
            uploadBytes(imageRef, image)
               .then(() => {
                    getDownloadURL(imageRef)
                       .then((url) => {
                        bookData["url"] = url;
                        uploadBooks(bookData)
                        console.log(url)
                        navigate("/")
                       })
               }).catch(err => {
                console.log(err)
                return;
               })
               console.log(bookData)
               
         }
         
    }
  return (
    <form className='form'>
        <p className='form-header'>Upload Book Info</p>
        <label htmlFor='title' className='form-label'>Title</label>
        <input
        type="text"
        className='book-inf'
        name="title" 
        value={title} 
        onChange={e => setTitle(e.target.value)}
        required
        ></input>

        <label htmlFor='author' className='form-label'>Author</label>
        <input 
        type="text" 
        className='book-inf'
        name="author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        required
        ></input>
        
        <label htmlFor="image" className='form-label'>Upload Image</label>
        <input 
        type="file"
        name="image"
        className='img-upload'
        onChange={e => setImage(e.target.files[0])}
        ></input>

        <button className='submit-btn' onClick={handleUpload}>Upload</button>
    </form>
  )
}

export default Forms