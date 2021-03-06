const metroLine = [
    "-23.572073619674494,-46.708131517171466",
    "-23.577153887416014,-46.72443972533614",
    "-23.584212354038133,-46.73795371224816",
    "-23.58492247115088,-46.74683520064332",
    "-23.586143780502432,-46.75079679003977",
    "-23.582561112887714,-46.772152663432166",
    "-23.590435939316748,-46.79815324992512",
    "-23.592151115165574,-46.801772143037965",
    "-23.590312228763274,-46.8232357097998"
]

const lineObjArr = metroLine.map(e => {
    return {
        lat: parseFloat(e.split(",")[0]),
        lng: parseFloat(e.split(",")[1])
    }
})

const destinationsObj = metroLine.map(e => {
    return {
        "point": {
            "latitude": parseFloat(e.split(",")[0]),
            "longitude": parseFloat(e.split(",")[1])
        }
    }
})

const stationsObj = {
    metroLine: metroLine,
    lineObjArr: lineObjArr,
    destinationsObj: destinationsObj
} 

export default stationsObj