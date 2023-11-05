import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { configureStore  } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store ={store}>

   
    <BrowserRouter>
       <App />
    </BrowserRouter>

    </Provider>
  </React.StrictMode>,
)
