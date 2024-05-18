import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './AppRoutes'
import {store} from './redux/store'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';

const client = import.meta.env.VITE_G_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={client}>
    <Router>
      <AppRoutes/>
    </Router>
    </GoogleOAuthProvider>
  </Provider>
)
 