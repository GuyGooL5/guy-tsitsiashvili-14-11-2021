import config from "../config";
import mocks from "../mocks";
import { forecastSliceActions } from "../redux/reducers/forecastReducer";
import { ReduxDispatch } from "../redux/store";
import { UnitSystem, Languages } from "../types";
import { ForecastData } from "../types/interfaces/ForecastData";

const getForecast = (key: string, unitSystem: UnitSystem, language?: Languages) =>
    async (dispatch: ReduxDispatch): Promise<ForecastData> => {

        const params = new URLSearchParams([["apikey", config.accuWeatherAPIKey], ["details", "true"]]);
        language && params.append("language", language);
        unitSystem === "Metric" && params.append("metric", "true");

        const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?${params.toString()}`;
        try {
            const data = await (await fetch(url)).json();
            dispatch(forecastSliceActions.set_forecast(data));
            return data;
        } catch (e) {
            dispatch(forecastSliceActions.set_forecast(null));
            throw Error(`${e}`);
        }
    };


const getForecastMocks = (key: string, unitSystem: UnitSystem, language?: Languages) =>
    async (dispatch: ReduxDispatch): Promise<ForecastData> => {

        await new Promise(res => setTimeout(res, 1000));

        if (key === "215854") {
            const data = mocks.forecast[`${key}_${unitSystem}`];
            dispatch(forecastSliceActions.set_forecast(data));
            return data;
        }
        dispatch(forecastSliceActions.set_forecast(null));
        throw Error(`Key: "${key}" not found`);
    };

export default config.useMocks ? getForecastMocks : getForecast;