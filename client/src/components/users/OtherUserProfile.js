import React from 'react'
import { getOtherUserProfile } from '../lib/api'
import { useParams } from 'react-router-dom'
import ProfileInfo from './ProfileInfo'

function UserProfile() {

  const [profile, setProfile] = React.useState({})
  const { id } = useParams()


  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await getOtherUserProfile(id)
        console.log(data)
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
      <ProfileInfo profile={profile}
        image={'https://cdn1.vectorstock.com/i/1000x1000/38/05/male-face-avatar-logo-template-pictograph-vector-11333805.jpg'}
        name={`Where ${profile.firstName} finds their`}
      />
    </>
  )
}

export default UserProfile