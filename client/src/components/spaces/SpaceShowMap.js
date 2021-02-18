import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
//import { Icon } from 'semantic-ui-react'
//import { Input } from 'semantic-ui-react'
import CitySpaceFavicon from '../../assets/CitySpaceFavicon.png'

function spaceShowMap({ space }) {
  return (
    <div className="map-container-small">
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        height="300px"
        width="400px"
        mapStyle='mapbox://styles/mapbox/streets-v11'
        latitude={space.location ? space.location.latitude : 51.533451}
        longitude={space.location ? space.location.longitude : -51.533451}
        zoom={14}
      // {...viewport}
      // onViewportChange={(viewport) => setViewport(viewport)}
      >
        <Marker
          key={space._id}
          latitude={Number(space.location.latitude)}
          longitude={Number(space.location.longitude)}
        >
          <span
            role="img"
            aria-label="map-marker"
          // onMouseOver={() => setPopup(space)}
          // onMouseOut={() => setPopup(null)}
          >
            <img
              src={CitySpaceFavicon}
              alt="popup"
              width="27px"></img>
            {/* <Icon name="circle thin green" /> */}



          </span>
        </Marker>
      </ReactMapGL>
    </div>

  )
}

export default spaceShowMap