import React, {Component} from "react"
import GoogleMapReact from 'google-map-react'
import config from "../config"

class Map extends React.Component {
    static defaultProps = {
        center: {
            lat: -23.55,
            lng: -46.63
        },
        zoom: 11
      };

    constructor() {
        super()
        this.state = {
            center: {
                lat: -23.55,
                lng: -46.63
              },
              zoom: 6,
              map: {},
              maps: {},
              markers: new Set()
        }
        this.handleClick = this.handleClick.bind(this)
        this.renderMarkers = this.renderMarkers.bind(this)
        this.initiateMap = this.initiateMap.bind(this)
    }

    handleClick(event) {
        const c = {
            lat: event.lat,
            lng: event.lng
        }
        const cStr = `${c.lat},${c.lng}`
        console.log(cStr)
        this.setState(prevState => {
            return {
                center: c,
                markers: new Set(prevState.markers).add(cStr)
            }
        })
    }

    initiateMap(map, maps) {
        const c = this.state.center
        const cStr = `${c.lat},${c.lng}`
        this.setState(prevState => {
            return {
                markers: new Set(prevState.markers).add(cStr),
                map:  map,
                maps: maps
            }
        })
    }

    renderMarkers() {  
        const {map, maps, markers} = this.state; 
        const markersArr = Array.from(markers); 
        markersArr.forEach(m => {
            const lat = parseFloat(m.split(",")[0])
            const lng = parseFloat(m.split(",")[1])
            const c = {
                lat: lat,
                lng: lng
            }
            let marker = new maps.Marker({
                position: c,
                map,
                title: 'Choose a place!'
            })
        })
    }

    render() {
        if (this.state.markers.size > 0) {
            this.renderMarkers()
        }
        console.log(this.state.markers.size)
        return (
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: config.API_KEY }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              onClick={this.handleClick}
              onGoogleApiLoaded={({map, maps}) => this.initiateMap(map, maps)}
              yesIWantToUseGoogleMapApiInternals
            >
              
            </GoogleMapReact>
          </div>
        );
      }
}

export default Map