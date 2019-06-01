import React, {Component} from "react"
import Geocode from "react-geocode"
import config from "../config"
import stationsObj from "../data/metroLine"
import syntaxHighlight from "../util/syntaxHighlight"

Geocode.setApiKey(config.API_KEY)
const distanceKey = config.DISTANCE_KEY

class SearchForm extends Component {
    constructor() {
        super()
        this.state = {
            origin: "Estrada da Aldeia 207",
            latLng: "",
            destination: "Shopping Eldorado"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.findRoute = this.findRoute.bind(this)
        //this.syntaxHighlight = this.syntaxHighlight.bind(this)
        this.findLatLng = this.findLatLng.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        // use geocoding api to search for coords from origin 
        // TODO: find a way to handle the async calls 
        this.findLatLng(this.state.origin)
        this.findLatLng(this.state.destination)
        event.preventDefault()
    }

    findLatLng(location) {
      Geocode.fromAddress(location).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          const latLng = `${lat},${lng}`
          console.log("latlng --> ")
          console.log(latLng)
          // find closest metro line from origin
          this.findRoute(latLng)
          // find closest metro line from destination
          
        },
        error => {
          console.error(error);
        }
      )
    }



    findRoute(latLng) {
        //find closest Destination from A
        //const url = `https://www.mapquestapi.com/directions/v2/route?key=${distanceKey}&from=${latLng}&to=${stationsObj.metroLine}`           
        const url = `https://api.tomtom.com/routing/1/matrix/json?key=${config.TOMTOM_KEY}&routeType=shortest&travelMode=car`
        const data = {
            "origins": [
              {
                "point": {"latitude": parseFloat(latLng.split(",")[0]),"longitude": parseFloat(latLng.split(",")[1])}
              }
            ],
          
            "destinations": stationsObj.destinationsObj
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
                      // console.log("Response ---> ")
                      // console.log(syntaxHighlight(JSON.stringify(res, null, 2)))
                      // to find closest route to metro, find index of shortest distance in res 
                      // the location in that index in stationsObj.metroLine will be the closest
                      let index = 0;
                      let min;
                      res.matrix[0].forEach((m,i) => {
                        const distance = m.response.routeSummary.lengthInMeters;
                        if (!min) {
                          min = distance;
                        } else {
                          if (distance < min) {
                            min = distance;
                            index = i;
                          }
                        }
                      })

                      console.log(`Closest Location is: ${index}`);
                      console.log(stationsObj.metroLine[index]);
                  })
        //find closest Destination from D
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea value={this.state.origin} name="origin" onChange={this.handleChange}/>
                <br/>
                <textarea value={this.state.destination} name="destination" onChange={this.handleChange}/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default SearchForm