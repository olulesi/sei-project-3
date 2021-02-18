import React from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { getAllSpaces } from '../../lib/api'
import { Link } from 'react-router-dom'
// import { Icon } from 'semantic-ui-react'
// import { getToken } from '../lib/auth'
import CitySpaceFavicon from '../../../assets/CitySpaceFavicon.png'
function SpaceIndexMap() {
  const [viewport, setViewport] = React.useState({
    latitude: 51.502643,
    longitude: -0.07497,
    zoom: 10
  })
  const [spaces, setSpaces] = React.useState([])
  const [popup, setPopup] = React.useState(null)
  // const token = getToken()
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
  return (
    <div className="map-container">
      <h4 className="featured-list">Browse Map</h4>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        height="100%"
        width="100%"
        scrollZoom={false} 
        mapStyle='mapbox://styles/mapbox/streets-v11'
        {...viewport}
        onClick={() => setPopup(null)}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {spaces.map(space => (
          <Marker
            key={space._id}
            latitude={Number(space.location.latitude)}
            longitude={Number(space.location.longitude)}
          >
            <span
              role="img"
              aria-label="map-marker"
              onMouseOver={() => setPopup(space)}
              onMouseOut={() => setPopup(null)}
            >
              {/* <Icon name="circle thin green" /> */}
              <img
                src={CitySpaceFavicon}
                alt="popup"
                width="17px"></img>
            </span>
          </Marker>
        ))}
        {popup &&
          <Link to={`/spaces/${popup._id}`}>
            <Popup
              // closeOnClick={true}
              // onClose={() => setPopup(null)}
              scrollZoom={false}
              latitude={Number(popup.location.latitude)}
              longitude={Number(popup.location.longitude)}
            >
              <div className="index-popup-image">
                <img src={popup.image} width="150px"/>
              </div>
              <div>
                {popup.name}
              </div>
            </Popup>
          </Link>
        }
      </ReactMapGL>
      {/* <Link to={`/spaces/${popup._id}`}>
        <div>Link here</div>
      </Link> */}
    </div >
  )
}
export default SpaceIndexMap