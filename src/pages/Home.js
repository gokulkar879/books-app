import React from 'react'
import { useGlobalBookContext } from '../bookcontext'
import Authnav from '../components/Authnav'
import Book from '../components/Book'
import Searchform from '../components/Searchform'

function Home() {
    const { books } = useGlobalBookContext()
  return (
    <div className='home'>
       <Authnav />
       <Searchform></Searchform>
       <section className='books'>
        <div className='books-center'>
            {
                    books.map(book => {
                        const {title, author, url, id} = book
                        return <Book key={id} id={id} author={author} url={url} title={title}/>
                    })
                }
        </div>
       </section>
    </div>
  )
}

export default Home