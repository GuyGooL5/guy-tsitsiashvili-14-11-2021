import config from "../config";
import mocks from "../mocks";
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


const getCurrentConditionMocks = (key: string, language?: Languages) =>
    async (dispatch: ReduxDispatch): Promise<CurrentConditionData> => {

        await new Promise(res => setTimeout(res, 1000));

        if (["213181", "58175", "347625"].includes(key)) {
            const data = mocks.currentCondition[key];
            dispatch(favoritesSliceActions.set_current_condition({ Key: key, currentCondition: data }));
            return data;
        }
        throw Error(`Key ${key} not found`);
    };

export default config.useMocks ? getCurrentConditionMocks : getCurrentCondition;