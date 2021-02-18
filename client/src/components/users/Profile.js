import React from 'react'
import { getUserProfile, headers } from '../lib/api'
import ProfileInfo from './ProfileInfo'



function Profile() {

  const [profile, setProfile] = React.useState({})


  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await getUserProfile(headers())
        // console.log(data)
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [])

  // console.log(profile)
  return (
    <>
      <ProfileInfo profile={profile}
        image={profile.profileImage}
        name={'Where you find your'} />
    </>
  )
}

export default Profile