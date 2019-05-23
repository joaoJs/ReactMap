import React, {Component} from "react"
import Geocode from "react-geocode"
import config from "../config"
import stationsObj from "../data/metroLine"

Geocode.setApiKey(config.API_KEY)
const distanceKey = config.DISTANCE_KEY

class SearchForm extends Component {
    constructor() {
        super()
        this.state = {
            address: "Estrada da Aldeia 207",
            latLng: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.findRouteA = this.findRouteA.bind(this)
    }

    handleChange(event) {
        this.setState({
            address: event.target.value
        })
    }

    handleSubmit(event) {
        // use geocoding api to search for coords from address 
        Geocode.fromAddress(this.state.address).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              const latLng = `${lat},${lng}`
              this.findRouteA(latLng)
            },
            error => {
              console.error(error);
            }
        )
        event.preventDefault()
    }

    findRouteA(latLng) {
        //find closest Destination from A
        //const url = `https://www.mapquestapi.com/directions/v2/route?key=${distanceKey}&from=${latLng}&to=${stationsObj.metroLine}`     
        console.log("-------")
        //const locations = [latLng].concat(stationsObj.metroLine)
        const locationsStr = JSON.stringify(stationsObj.metroLine);
        
        const url = `https://api.tomtom.com/routing/1/matrix/json?key=${config.TOMTOM_KEY}&routeType=shortest&travelMode=truck`

        console.log(url)

        const data = {
            "origins": [
              {
                "point": {"latitude": -23.572073619674494,"longitude": -46.708131517171466}
              }
            ],
          
            "destinations": [
              {
                "point": {"latitude": -23.577153887416014,"longitude": -46.72443972533614}
              },
              {
                "point": {"latitude": -23.584212354038133,"longitude": -46.73795371224816}
              }
            ]
          }

        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
              }
            }).then(res => res.json())
                  .then((res,err) => {
                      if (err) {
                          console.log(err)
                      }
                      console.log(JSON.stringify(res))
                      //const timeA = res.route.formattedTime
                  })


        //find closest Destination from D
    }

    // findRouteB(c) {

    // }



    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea value={this.state.address} onChange={this.handleChange}/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default SearchForm