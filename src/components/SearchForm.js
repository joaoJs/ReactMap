import React, {Component} from "react"
import Geocode from "react-geocode"
import config from "../config"
import findLatLng from "../util/findLatLng"
import findDistBtwnLines from "../util/findDistBtwnLines"

Geocode.setApiKey(config.API_KEY)
const distanceKey = config.DISTANCE_KEY

class SearchForm extends Component {
    constructor() {
        super()
        this.state = {
            origin: "Estrada da Aldeia 207",
            destination: "Shopping Eldorado",
            latLng: "",
            totalDistance: undefined,
            totalTime: undefined,
            waiting: false 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.findDistances = this.findDistances.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        this.findDistances()
        this.setState(prevState => {
          return {
            waiting: !prevState.waiting
          }
        })
        event.preventDefault()
    }

    async findDistances() {
      var closestToOrigin = await findLatLng(this.state.origin)
      this.state.closestToOrigin = closestToOrigin
      var closestToDest = await findLatLng(this.state.destination)
      this.state.closestToDest = closestToDest
      var distBetweenLines = await findDistBtwnLines(closestToOrigin, closestToDest)
      this.setState(prevState => {
        return {
          totalDistance: closestToOrigin.distance + closestToDest.distance + distBetweenLines.distance,
          totalTime: closestToOrigin.time + closestToDest.time + distBetweenLines.time,
          waiting: !prevState.waiting
        }
      })
    }

    render() {
        return (
            <div>
              <form onSubmit={this.handleSubmit}>
                  <textarea value={this.state.origin} name="origin" onChange={this.handleChange}/>
                  <br/>
                  <textarea value={this.state.destination} name="destination" onChange={this.handleChange}/>
                  <input type="submit" value="Submit" />
              </form>
              <h2>{this.state.waiting ? "Waiting..." : this.state.totalDistance}</h2>
              <h2>{this.state.waiting ? "Waiting..." : this.state.totalTime}</h2>
            </div>
        )
    }
}

export default SearchForm