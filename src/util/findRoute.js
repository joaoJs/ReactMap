import stationsObj from "../data/metroLine"
import config from "../config"
import syntaxHighlight from "./syntaxHighlight"

const findRoute = (latLng) => {
    //find closest Destination from A           
    const url = `https://api.tomtom.com/routing/1/matrix/json?key=${config.TOMTOM_KEY}&routeType=shortest&travelMode=car`
    const data = {
        "origins": [
          {
            "point": {"latitude": parseFloat(latLng.split(",")[0]),"longitude": parseFloat(latLng.split(",")[1])}
          }
        ],
      
        "destinations": stationsObj.destinationsObj
      }

      return new Promise(resolve => {
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
                    let minTime;
                    res.matrix[0].forEach((m,i) => {
                        const distance = m.response.routeSummary.lengthInMeters
                        const time = m.response.routeSummary.travelTimeInSeconds
                        if (!min) {
                            min = distance
                            minTime = time
                        } else {
                        if (distance < min) {
                            min = distance
                            index = i
                            minTime = time
                        }
                        }
                    })
                    resolve({
                        index: index,
                        distance: min,
                        time: minTime
                    })
                })
            })
}

export default findRoute