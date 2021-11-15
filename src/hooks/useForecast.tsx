import { useState, useCallback, useEffect } from "react";
import config from "../config";
import mocks from "../mocks";
import { Languages, UnitSystem } from "../types";
import { ForecastData } from "../types/interfaces/ForecastData";

async function fetchForecast(key: string, unitSystem: UnitSystem, language?: Languages):
    Promise<ForecastData> {

    const params = new URLSearchParams([["apikey", config.accuWeatherAPIKey], ["details", "true"]]);
    language && params.append("language", language);
    unitSystem === "Metric" && params.append("metric", "true");

    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?${params.toString()}`;
    try {
        const response = await fetch(url);
        return response.json();
    } catch (e) {
        console.log(e);
        throw e;
    }

}


const useForecast = (key?: string, unitSystem: UnitSystem = "Metric", language?: Languages) => {

    const [forecast, setForecast] = useState<ForecastData | null>(null);

    const [loading, setLoading] = useState(false)

    //TODO: generalize errors.
    const [error, setError] = useState("")


    const getForecast = useCallback(async (_key: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetchForecast(_key, unitSystem, language);
            setForecast(response);
        } catch (e) {
            setError(_key);
        } finally {
            setLoading(false);
        }
    }, [language, unitSystem]);

    useEffect(() => {
        if (key) getForecast(key);
    }, [getForecast, key])

    return { forecast, getForecast, loading, error };

}
const useForecastMocks = (key?: string, unitSystem: UnitSystem = "Metric", language?: Languages) => {

    const [forecast, setForecast] = useState<ForecastData | null>(null);

    const [loading, setLoading] = useState(false)

    //TODO: generalize errors.
    const [error, setError] = useState("")


    const getForecast = useCallback(async (_key: string) => {
        setLoading(true);
        setError("");
        //Fake loading;
        await new Promise(res => setTimeout(res, 1000));


        switch (_key) {
            case "215854":
                setForecast(mocks.forecast[`${_key}_${unitSystem}`]); break;

            //TODO: Better Handle error
            default:
                setError(_key);
                setForecast(null);
        }
        setLoading(false);
    }, [unitSystem]);

    useEffect(() => {
        if (key) getForecast(key);
    }, [getForecast, key])

    return { forecast, getForecast, loading, error };

}

export default config.useMocks ? useForecastMocks : useForecast;