import '../scss/home.scss'
import React from 'react'

const Home = () => {
  return(
    <div className='home'>
      <div className='landing-welcome'>
        <h1>GoodBread</h1>
        <p>Welcome to GoodBread. A place for all your digital recipes.</p>        
      </div>

      <div className='home-favorites'>
        <h3>Favorites</h3>
        <p>Coming soon.</p>
      </div>

      <div className='app-news'>
        <h3>Announcments</h3>
        <p>Coming soon.</p>
      </div>
    </div>
  )        
}

export default Home