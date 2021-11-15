import { useState, useCallback, useEffect } from "react";
import config from "../config";
import { Languages } from "../types";
import { ForecastData } from "../types/interfaces/ForecastData";

async function fetchForecast(key: string, metric: boolean = true, language?: Languages):
    Promise<ForecastData> {

    const params = new URLSearchParams([["apikey", config.accuWeatherAPIKey], ["details", "true"]]);
    language && params.append("language", language);
    metric && params.append("metric", "true");

    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?${params.toString()}`;
    try {
        const response = await fetch(url);
        return response.json();
    } catch (e) {
        console.log(e);
        throw e;
    }

}


const useForecast = (key?: string, metric: boolean = true, language?: Languages) => {

    const [forecast, setForecast] = useState<ForecastData | null>(null);

    const [loading, setLoading] = useState(false)

    //TODO: generalize errors.
    const [error, setError] = useState("")


    const getForecast = useCallback(async (_key: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetchForecast(_key, metric, language);
            setForecast(response);
        } catch (e) {
            setError(_key);
        } finally {
            setLoading(false);
        }
    }, [language, metric]);

    useEffect(() => {
        if (key) getForecast(key);
    }, [getForecast, key])

    return { forecast, getForecast, loading, error };

}

export default useForecast;