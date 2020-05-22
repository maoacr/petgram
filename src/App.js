import React from 'react'
import { GlobalStyle } from './styles/GlobalStyles'
import { Logo } from './components/Logo'
import { Home } from './pages/Home'
import { Router } from '@reach/router'

import { Detail } from './pages/Detail'
import { Favs } from './pages/Favs'
import { User } from './pages/User'
import { NotRegisteredUser } from './pages/NotRegisteredUser'
import { NavBar } from './components/NavBar'

const UserLogged = ({children}) => {
  return children({ isAuth: false })
}


export const App = () => {

  return (
    <div>
      <GlobalStyle />
      <Logo />
      <Router>
        <Home path='/' />
        <Home path='/pet/:id' />
        <Detail path='/detail/:detailId' />
      </Router>
      
      <UserLogged>
          {
            ({ isAuth }) =>
            isAuth
              ? <Router>
                  <Favs path='/favs'/>
                  <User path='/user'/>
                </Router>
              : <NotRegisteredUser>
                  <NotRegisteredUser path='/favs'/>
                  <NotRegisteredUser path='/user'/>
                </NotRegisteredUser> 
          }
      </UserLogged>


      <NavBar />
    </div>
  )
}
