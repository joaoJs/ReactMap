import React, {Component} from "react"
import GoogleMapReact from 'google-map-react'
import config from "../config"
import stationsObj from "../data/metroLine"

class Map extends React.Component {
    static defaultProps = {
        center: {
            lat: -23.582561112887714,
            lng: -46.772152663432166
        },
        zoom: 13
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
              maps: {}
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
        this.setState({
                center: c
            })
    }

    initiateMap(map, maps) {
        const c = this.state.center
        this.setState({
                map:  map,
                maps: maps
            })

        const flightPath = new maps.Polyline({
            path: stationsObj.lineObjArr,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        this.renderMarkers() 

        flightPath.setMap(map);
    }

    renderMarkers() {  
        const {map, maps} = this.state;  
        stationsObj.metroLine.forEach(m => {
            const lat = parseFloat(m.split(",")[0])
            const lng = parseFloat(m.split(",")[1])
            const c = {
                lat: lat,
                lng: lng
            }
            let marker = new maps.Marker({
                position: c,
                map,
                icon: process.env.PUBLIC_URL + "/img/metroMarker.png",
                title: 'Choose a place!'
            })
        })
    }

    render() {
        // this.renderMarkers()
        
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