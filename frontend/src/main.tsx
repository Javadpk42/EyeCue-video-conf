import React from 'react'


import ReactDOM from 'react-dom/client'
import './global.css'
import App from './App'
import {store} from './redux/store'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SocketProvider } from './context/socketProvider'
const client = import.meta.env.VITE_G_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={client}>
      <SocketProvider>
      <App/>
      </SocketProvider>
    </GoogleOAuthProvider>
  </Provider>
)
