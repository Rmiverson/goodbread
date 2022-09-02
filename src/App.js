import './App.css';

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/persistStore'
import Routes from './routes'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Routes />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
