import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalBookContext } from '../bookcontext'
import Forms from '../components/Forms'
import './Dashboard.css'
import Book from '../components/Book'


function Dashboard() {
  const { userbooks } = useGlobalBookContext()

  return (
    <div className='dashboard'>
        <div className='dashboard-nav'>
            <Link to="/">Home</Link>
        </div>
        <div className='form-center'>
        <Forms />
        </div>
        <div className='dashboard-title'>
        <p className='dashboard-subhead'>Last 10 uploads by you!!</p>
        <div className='underline'></div>
        </div>
        
        <section className='books'>
        <div className='books-center'>
            {
              userbooks.map(book => {
                const {title, author, url, id} = book
                return <Book key={id} id={id} author={author} url={url} title={title}/>
            })
                }
        </div>
       </section>

    </div>
  )
}

export default Dashboard