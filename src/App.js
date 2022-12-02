import './scss/app.scss'
import Nav from './containers/Nav'
import RouteBoard from './RouteBoard'
import Footer from './components/Footer'

const App = () => {  
  return (
    <div className='App'>
      <Nav />
      <RouteBoard />
      <Footer />
    </div>
  )
}

export default App
