import React from 'react'

import { getUserProfile, headers } from '../lib/api'
import { isAuthenticated } from '../lib/auth'

function WelcomeBanner() {

  const [profile, setProfile] = React.useState({})

  const isLoggedIn = isAuthenticated()

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await getUserProfile(headers())
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [])

  console.log(profile)

  return (
    <>
      {isLoggedIn ?
        <div className="welcome-container">
          <h2 className="welcome-message">{`Welcome, ${profile.firstName}`}</h2>
        </div>
        :
        <div className="welcome-container">
          <h2 className="welcome-message">Welcome</h2>
        </div>
      }
    </>
  )
    
}
export default WelcomeBanner