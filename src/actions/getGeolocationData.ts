import config from "../config";
import { configurationSliceActions } from "../redux/reducers/configurationReducer";
import { ReduxDispatch } from "../redux/store";
import { LocationData } from "../types";

const getGeolocationData = (lat: number, lng: number) =>
    async (dispatch: ReduxDispatch): Promise<LocationData> => {

        const searchParams = new URLSearchParams
            ([["apikey", config.accuWeatherAPIKey],
            ["q", `${lat},${lng}`],
            ["details", "true"]]);

        const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?${searchParams.toString()}`;

        try{

            const { Key, LocalizedName } :LocationData= await (await fetch(url)).json();
            
            dispatch(configurationSliceActions.set_default_location({ Key, LocalizedName }));
            
            return { Key, LocalizedName };
        }catch(e){
            throw Error("Can't get geolocation data");
        }
    }

export default getGeolocationData;