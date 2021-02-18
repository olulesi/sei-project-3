import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { getAllSpaces } from '../lib/api'
import { getUserProfile, headers } from '../lib/api'

function RecommendedSlider() {

  const recommendedSpaces = []
  const [spaces, setSpaces] = React.useState([])
  const [hasError, setHasError] = React.useState(false)
  const [profile, setProfile] = React.useState({})

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  }

  React.useEffect(() => {
    const getSpaces = async () => {
      try {
        const { data } = await getAllSpaces()
        setSpaces(data)
      } catch (err) {
        console.log(err)
      }
    }
    getSpaces()
  }, [])
  console.log(spaces)


  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await getUserProfile(headers())
        setProfile(data)
      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getProfile()
  }, [])



  const addRecommendedSpaces = () => {
    if (profile.favouriteTags) {
      for (let i = 0; i <= profile.favouriteTags.length; i++) {
        const filterSpaces = () => spaces.filter(space => {
          if (space.tags.includes(profile.favouriteTags[i])) {
            return recommendedSpaces.push(space)
          }
        })
        filterSpaces()
      }
    }
  }
  addRecommendedSpaces()

  console.log(recommendedSpaces)



  return (
    <div className="homepage-recommended-section">
      <div className="homepage-user-recommended-wrapper">
        <h2 className="featured-list">
          Recommended
          {profile.firstName ? ` for ${profile.firstName}`
            :
            ''}</h2>
        <div className="user-tags">
          {profile.favouriteTags ?
            profile.favouriteTags.map(categoryTag => (
              <Link
                key={categoryTag}
                to={`/spaces/category/${categoryTag}`}>
                <div
                  className="user-label-tags">{categoryTag}</div>
              </Link>
            ))
            :
            <p>...loading</p>
          }
        </div>
        <div>

        </div>
        {spaces ?
          // <SRLWrapper options={options}>
          <Slider {...settings}>
            {recommendedSpaces.map(space => (
              <div className="card recommended-card-wrapper" key={space._id}>
                <div className="ui-card img-wrapper">
                  <Link to={`/spaces/${space._id}`}>
                    <img key={space._id} className="images" src={space.image} />
                    <div className="recommended-slider-card-overlay">
                      {space.name}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
          // </SRLWrapper>
          :
          <h2 className="title has-text-centered">
            {hasError ? 'There was An Error' : '...loading '}
          </h2>
        }
      </div>
    </div>
  )
}

export default RecommendedSlider