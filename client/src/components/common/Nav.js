import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { getUserProfile, headers } from '../lib/api'
import { isAuthenticated, logout, getUserId } from '../lib/auth'
import {
  Button,
  // Container,
  Menu
} from 'semantic-ui-react'


function Nav() {

  

  const [profile, setProfile] = React.useState({})
  const [navbar,setNavbar] = React.useState(false)

  const changeBackground = () => {
    window.scrollY >= 50 ? setNavbar(true) : setNavbar(false)
  }

  window.addEventListener('scroll', changeBackground)

  const location = useLocation()

  const isLoggedIn = isAuthenticated()

  const history = useHistory()

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await getUserProfile(headers())
        setProfile(data)
      } catch (err) {
        console.log(err)
        // setHasError(true)
      }
    }
    getProfile()
  }, [])


  console.log(profile.profileImage)
  const handleLogout = () => {
    logout()
    history.push('/')
  }


  return (

    
    <div className={navbar ? 'ui menu fixed active' : 'ui menu fixed'}>
      <>
        {location.pathname === '/' ?
          <>
            <Menu.Item position='right'>
              {!isLoggedIn ?
                <>
                  <Button primary as={Link} to='/login' style={{ borderRadius: 5 }}>
                  Log In
                  </Button>
                  <Button primary as={Link} to='/register' style={{ marginLeft: '0.5em' }}>
                  Sign Up
                  </Button>
                </>
                :
                <>
                  <Button primary as="" onClick={handleLogout}>
                  Log Out
                  </Button>
                  <Link to={`/profile/${getUserId()}`} className="navbar-item">
                    <i className="big user circle icon"></i>
                  </Link>
                </>}
            </Menu.Item>
          </>
          :
          <>
            <Link to="/spaces" className="navbar-item">
              <Menu.Item
                className="home"
                name='Home'
              />
            </Link>
            <Link to="/spaces/category/View%20All" className="navbar-item">
              <Menu.Item
                className="home"
                name='Explore'
              />
            </Link>
            {isLoggedIn &&
      <Link to="/spaces/new" className="navbar-item">
        <Menu.Item
          className="home"
          name='Add New Space'
        />
      </Link>}
            <Menu.Item position='right'>
              {!isLoggedIn ?
                <>
                  <Button primary as={Link} to='/login'>
                  Log In
                  </Button>
                  <Button primary as={Link} to='/register' style={{ marginLeft: '0.5em' }}>
                  Sign Up
                  </Button>
                </>
                :
                <>
                  <Button primary as="" onClick={handleLogout}>
                  Log Out
                  </Button>
                  <Link to={`/profile/${getUserId()}`} className="navbar-item">
                    <i className="big user circle icon"></i>
                  </Link>
                </>}
            </Menu.Item>
          </>
        }
      </>
    </div>
            
  
         
          
       
        
     
  


     
  )
}

export default Nav