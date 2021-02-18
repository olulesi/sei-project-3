import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'

import SpaceIndexView from './components/spaces/SpaceIndexView'
import SpaceShow from './components/spaces/SpaceShow'
import SpaceNew from './components/spaces/SpaceNew'
import SpaceEdit from './components/spaces/SpaceEdit'
import SpaceCategories from  './components/spaces/SpaceCategories'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import Profile from './components/users/Profile'
import OtherUserProfile from './components/users/OtherUserProfile'



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/spaces/:id/edit" component={SpaceEdit} />
        <Route path="/spaces/category/:category" component={SpaceCategories} />
        <Route path="/spaces/new" component={SpaceNew} />
        <Route path="/spaces/:id" component={SpaceShow} /> 
        <Route path="/spaces" component={SpaceIndexView} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/users/:id" component={OtherUserProfile} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

