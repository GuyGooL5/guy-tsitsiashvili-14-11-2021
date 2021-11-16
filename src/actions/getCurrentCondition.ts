import config from "../config";
import { favoritesSliceActions } from "../redux/reducers/favoritesReducer";
import { ReduxDispatch } from "../redux/store";
import { Languages } from "../types";
import { CurrentConditionData } from "../types/interfaces/CurrentConditionData";

const getCurrentCondition = (key: string, language?: Languages) =>
    async (dispatch: ReduxDispatch): Promise<CurrentConditionData> => {

        const params = new URLSearchParams([["apikey", config.accuWeatherAPIKey], ["details", "true"]]);
        language && params.append("language", language);

        const url = `http://dataservice.accuweather.com/currentconditions/v1/${key}?${params.toString()}`;
        try {
            const response = await fetch(url);
            const data = (await response.json())[0];
            dispatch(favoritesSliceActions.set_current_condition({ Key: key, currentCondition: data }));
            return data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    };



export default getCurrentCondition;