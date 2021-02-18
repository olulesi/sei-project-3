import React from 'react'
import { Link } from 'react-router-dom'
import { getAllSpaces } from '../../lib/api'


function SpaceIndexCategories() {

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

  return (
    <>
      <div className="homepage-categories-section">
        <div className="homepage-categories-container">


          <h2 className="featured-list">Go To Any Space</h2>
          {spaces ?
            <div className="categories-wrapper">
              <Link to="/spaces/category/Sports & Leisure">
                <div className="column">
                  <div className="card" key={spaces[9]._id}>
                    <div className="category-wrapper">
                      <img key={spaces[9]._id} className="images" src={spaces[9].image} />
                    </div>
                    <h6 className="label">Sports & Leisure</h6>
                  </div>
                </div>
              </Link>
              <Link to="/spaces/category/Peace & Quiet">
                <div className="column">
                  <div className="card" key={spaces[18]._id}>
                    <div className="category-wrapper">
                      <img key={spaces[18]._id} className="images" src={spaces[18].image} />
                    </div>
                    <h6 className="label">Peace & Quiet</h6>
                  </div>
                </div>
              </Link>
              <Link to="/spaces/category/Mother Nature">
                <div className="column">
                  <div className="card" key={spaces[44]._id}>
                    <div className="category-wrapper">
                      <img key={spaces[44]._id} className="images" src={spaces[44].image} />
                    </div>
                    <h6 className="label">Mother Nature</h6>
                  </div>
                </div>
              </Link>
              <Link to="/spaces/category/Riverside Spot">
                <div className="column">
                  <div className="card" key={spaces[6]._id}>
                    <div className="category-wrapper">
                      <img key={spaces[6]._id} className="images" src={spaces[6].image} />
                    </div>
                    <h6 className="label">Riverside Spot</h6>
                  </div>
                </div>
              </Link>
              <Link to="/spaces/category/Lively">
                <div className="column">
                  <div className="card" key={spaces[27]._id}>
                    <div className="category-wrapper">
                      <img key={spaces[27]._id} className="images" src={spaces[27].image} />
                    </div>
                    <h6 className="label">Lively</h6>
                  </div>
                </div>
              </Link>
              <Link to="/spaces/category/Architecture">
                <div className="column">
                  <div className="card" key={spaces[13]._id}>
                    <div className="category-wrapper">
                      <img key={spaces[13]._id} className="images" src={spaces[13].image} />
                    </div>
                    <h6 className="label">Architecture</h6>
                  </div>
                </div>
              </Link>
              <Link to="/spaces/category/Food & Drink">
                <div className="column">
                  <div className="card" key={spaces[12]._id}>
                    <div className="category-wrapper">
                      <img key={spaces[12]._id} className="images" src={spaces[12].image} />
                    </div>
                    <h6 className="label">Food & Drink</h6>
                  </div>
                </div>
              </Link>
              <Link to="/spaces/category/Art & Design">
                <div className="column">
                  <div className="card" key={spaces[36]._id}>
                    <div className="category-wrapper">
                      <img key={spaces[1]._id} className="images" src={spaces[1].image} />
                    </div>
                    <h6 className="label">Art & Design</h6>
                  </div>
                </div>
              </Link>
            </div>

            :
            <h2 className="title has-text-centered">
              {hasError ? 'There was An Error' : '...loading'}
            </h2>
          }
        </div>
      </div>
    </>
  )
}
export default SpaceIndexCategories