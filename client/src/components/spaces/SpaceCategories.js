import React from 'react'
import { getAllSpaces } from '../lib/api'
// import { getUserId } from '../lib/auth'
import { Icon, Container } from 'semantic-ui-react'
import { useParams, Link } from 'react-router-dom'
// import StackGrid from 'react-stack-grid'
import { CSSGrid, layout } from 'react-stonecutter'
//measureItems, makeResponsive
//TO MAKE GRID RESPONSIVE




function SpaceCategoriesView() {

  // const Grid = makeResponsive(measureItems(CSSGrid), {
  //   maxWidth: 1920,
  //   minPadding: 100
  // })

  const [spaces, setSpaces] = React.useState([])
  const [activeCategory, setActiveCategory] = React.useState(useParams().category)

  useParams()
  const { category } = useParams()

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

  const filterSpaces = (category) => {
    if (category === 'View All') {
      return spaces
    } else {
      return spaces.filter(space => {
        return space.tags.includes(category)
      })
    }
  }

  const selectedCategory = (e) => {
    const value = e.target.innerHTML.replace('&amp;', '&')
    setActiveCategory(value)
  }

  const categoryList = [
    'View All',
    'Architecture',
    'Art & Design',
    'Food & Drink',
    'Lively',
    'Mother Nature',
    'Peace & Quiet',
    'Riverside Spot',
    'Sports & Leisure'
  ]

  filterSpaces(category)

  const itemHeights = [
    300, 330, 270, 250
  ]
  const randomHeight = () => {
    const randomIndex = Math.floor(Math.random() * itemHeights.length)
    return itemHeights[randomIndex]
  }
  console.log(randomHeight())


  // Favourites and Add Favourites

  // const [isFavourite, setIsFavourite] = React.useState(false)
  // const [favourites, setFavourites] = React.useState(0)

  // const handleFavourite = async event => {
  //   event.preventDefault()
  //   try {
  //     const spaceId = event.target.value
  //     await addToFavourites(spaceId)
  //     setIsFavourite(!isFavourite)
  //     setFavourites(favourites + 1)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // //* Add to the users favourites


  // const handleUnFavourite = async event => {
  //   event.preventDefault()
  //   try {
  //     setIsFavourite(!isFavourite)
  //     setFavourites(favourites - 1)
  //     const spaceId = event.target.value
  //     await removeFromFavourites(spaceId)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // //* Add to the users favourites
  // }

  // const favouriteSpaces = []

  // const hasUserFavourited = () => {
  //   spaces.forEeach(space => {
  //     if (space.favouritedBy.includes(getUserId())) {
  //       favouriteSpaces.push(space)
  //     }
  //   })
  // }


  // const isItAFavourite = (space) => {
  //   if (favouriteSpaces.includes(space)) {
  //     return true
  //   }
  // }









  return (
    <Container>
      <section>
        <div
          className="category-page-tags"
          onClick={(e) => selectedCategory(e)}>
          {categoryList.map(categoryTag => (
            <Link
              key={categoryTag}
              to={`/spaces/category/${categoryTag}`}
              className="category-tag">
              <div className="category-tag">
                <div
                  className={activeCategory === categoryTag
                    ? 'ui olive label category-tag' : 'ui label category-tag'}>{categoryTag}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="ui divider">
        </div>


        <div className="grid-wrapper">
          {spaces ?
            <CSSGrid
              component="div"
              columnWidth={290}
              gutterWidth={50}
              gutterHeight={50}
              layout={layout.pinterest}
              duration={800}
              columns={3}
              easing="ease-out"
            >
              {filterSpaces(category).map((space =>
                <div key={space.name} itemHeight={270}>
                  <Link
                    to={`/spaces/${space._id}`}
                    key={space.name}>
                    <div key={space.name} itemHeight={270} className="category-card">
                      <img className="category-card-image" src={space.image} />
                      <div className="category-card-content">
                        <div className="ui header category-card-header">
                          {space.name}
                        </div>
                        <div className="label-heart-wrapper">
                          <div value={space._id} className="point yellow">
                            <Icon name="heart" />
                            {space.favouritedBy.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </CSSGrid>
            :
            <div>Loading</div>
          }
        </div>
      </section >
    </Container >
  )
}

export default SpaceCategoriesView