import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import SimpleReactLightbox from 'simple-react-lightbox'
// import { SRLWrapper } from 'simple-react-lightbox'
import { getAllSpaces } from '../../lib/api'



function SpaceSlider() {

  const [spaces, setSpaces] = React.useState(null)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const getSpaces = async () => {
      try {
        const { data } = await getAllSpaces()
        setSpaces(data)

      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getSpaces()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  }

  const mySpaces = []

  const featuredSpaces = () => {
    if (spaces) {
      for (let i = 0; i <= spaces.length; i++) {
        if (i === 0 || i === 5 || i === 6 || i === 7 || i === 9
          || i === 56 || i === 53 || i === 51 || i === 50 || i === 44
          || i === 42 || i === 41 || i === 39 || i === 38 || i === 37) {
          mySpaces.push(spaces[i])
        }
      }
    }
  }
  featuredSpaces()
  console.log(mySpaces)
  // const options = {
  //   settings: {
  //     overlayColor: 'rgba(120, 120, 120, 0.5)'
  //   }
  // }



  return (
    <SimpleReactLightbox>
      <div className="slider-container">
        <h4 className="featured-list">Featured</h4>
        {spaces ?
          // <SRLWrapper options={options}>
          <Slider {...settings}>
            {mySpaces.map(space => (
              <div className="card" key={space._id}>
                <div className="homepage-card-name">
                  
                  <div className="ui-card img-wrapper">
                    <Link to={`/spaces/${space._id}`}>
                      <img key={space._id} className="images" src={space.image} />
                      <div className="homepage-card-overlay">
                        {space.name}
                      </div>
                    </Link>
                  </div>

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
    </SimpleReactLightbox >
  )
}


export default SpaceSlider