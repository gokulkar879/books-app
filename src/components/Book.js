import React from 'react'

function Book({id, title, author, url}) {
  return (
    <article className='book'>
        
        <img src={url}></img>
        <div className='book-info'>
          <div>
            <h4>{title}</h4>
            <p>{author}</p>
          </div>
        </div>
        
    </article>
  )
}

export default Book