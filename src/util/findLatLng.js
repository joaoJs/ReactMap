import Geocode from "react-geocode"
import config from "../config"
import findRoute from "./findRoute"
import { async } from "q";

Geocode.setApiKey(config.API_KEY)

async function findLatLng(location) {
    return new Promise(async resolve => {
        Geocode.fromAddress(location).then(
            async response => {
                const { lat, lng } = response.results[0].geometry.location;
                const latLng = `${lat},${lng}`
                // find closest metro line 
                var result = await findRoute(latLng)
                resolve(result)              
            },
            error => {
                console.error(error);
            }
        )
    })
} 


  export default findLatLng