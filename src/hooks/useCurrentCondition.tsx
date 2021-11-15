import { useCallback, useEffect, useState } from "react";
import config from "../config";
import mocks from "../mocks";
import { Languages } from "../types";
import { CurrentConditionData } from "../types/interfaces/CurrentConditionData";


async function fetchCurrentCondition(key: string, language?: Languages):
    Promise<CurrentConditionData[]> {

    const params = new URLSearchParams([["apikey", config.accuWeatherAPIKey], ["details", "true"]]);
    language && params.append("language", language);

    const url = `http://dataservice.accuweather.com/currentconditions/v1/${key}?${params.toString()}`;
    try {
        const response = await fetch(url);
        return response.json();
    } catch (e) {
        console.log(e);
        throw e;
    }

}

const useCurrentCondition = (key?: string, language?: Languages) => {
    const [currentCondition, setCurrentCondition] = useState<CurrentConditionData | null>(null);

    const [loading, setLoading] = useState(false)
    //TODO: generalize errors.
    const [error, setError] = useState("")


    const getCurrentCondition = useCallback(async (_key: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetchCurrentCondition(_key, language);
            setCurrentCondition(response[0]);
        } catch (e) {
            setError(_key);
        } finally {
            setLoading(false);
        }
    }, [language]);

    useEffect(() => {
        if (key) getCurrentCondition(key);
    }, [getCurrentCondition, key])

    return { currentCondition, getCurrentCondition, loading, error };

}
const useCurrentConditionMocks = (key?: string, language?: Languages) => {

    const [currentCondition, setCurrentCondition] = useState<CurrentConditionData | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const getCurrentCondition = useCallback(async (_key: string) => {
        setLoading(true);
        setError("");
        //Fake loading;
        await new Promise(res => setTimeout(res, 1000));

        switch (_key) {
            case "213181": case "58175": case "347625":
                setCurrentCondition(mocks.currentCondition[_key]); break;

            //TODO: Better Handle error
            default:
                setError(_key);
                setCurrentCondition(null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (key) getCurrentCondition(key);
    }, [getCurrentCondition, key])



    return { currentCondition, getCurrentCondition, loading, error };

}

export default config.useMocks ? useCurrentConditionMocks : useCurrentCondition;