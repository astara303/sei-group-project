import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
// const pinImage = '/src/assets/pin.png'

class Map extends React.Component {

  state = {
    viewport: {
      width: 450,
      height: 300,
      latitude: 51.515313,
      longitude: -0.071626,
      zoom: 12
    },
    clickedLocation: null,
    showPopup: false
  }

  render() {
    console.log(this.props)
    return (
      <div className="columns">
        <div className="column  ">
          <ReactMapGL mapboxApiAccessToken={mapboxToken}
            mapStyle="mapbox://styles/mapbox/streets-v9" 
            {...this.state.viewport} 
            onViewportChange={viewport => this.setState({ viewport })}
            onClick={this.props.handleMap}
          >
            {this.props.data.latitude &&
              <Marker 
                longitude={this.props.data.longitude} 
                latitude={this.props.data.latitude} > 
                <div className="pin" /> 
              </Marker>
            }
            {/* {showPopup && <Popup
        //   latitude={this.state.clickedLocation[0]}
        //   longitude={this.state.clickedLocation[1]}
        //   closeButton={true}
        //   closeOnClick={false}
        //   onClose={() => this.setState({ showPopup: false })}
        //   anchor="top" >
        //   <div>You are here</div>
        // </Popup>} */}
          </ReactMapGL>
        </div>
      </div>
    )
  }
}

export default Map