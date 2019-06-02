import config from "../config"
import stationsObj from "../data/metroLine"

const findDistBtwnLines = (closestToOrigin, closestToDest) => {
    const indexes = [closestToOrigin.index, closestToDest.index].sort() 
    const stations = stationsObj.metroLine.slice(indexes[0], indexes[1] + 1)
    const stationsStr = stations.join(":")
    console.log(stationsStr)
    // usr stationsStr to make url
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${stationsStr}/json?key=${config.TOMTOM_KEY}`
    return new Promise(resolve => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                resolve({
                        distance: res.routes[0].summary.lengthInMeters,
                        time: res.routes[0].summary.travelTimeInSeconds
                    })
            })
    })
}

export default findDistBtwnLines