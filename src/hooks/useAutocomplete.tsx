import { useCallback, useState } from "react"
import { setTimeout } from "timers";
import config from "../config";
import mocks from "../mocks";
import { Languages } from "../types";
import { AutocompleteData } from "../types/autocomplete";


async function fetchPredictions(query: string, language?: Languages): Promise<AutocompleteData[]> {

    const params = new URLSearchParams([["apikey", config.accuWeatherAPIKey], ["q", query]]);
    language && params.append("language", language);
    
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?${params.toString()}`

    try {
        const response = await fetch(url);
        return response.json();
    } catch (e) {
        console.log(e);
        throw e;
    }


}



interface AutocompleteConfig {
    language?: Languages;
}


const useAutocomplete = (autocompleteConfig?: AutocompleteConfig) => {

    const [predictions, setPredictions] = useState<AutocompleteData[]>([]);

    const [loading, setLoading] = useState(false)
    //TODO: generalize errors.
    const [error, setError] = useState<any>(null)

    const getPredictions = useCallback(async (input: string) => {
        setLoading(true);
        try {
            const data = await fetchPredictions(input, autocompleteConfig?.language);
            setPredictions(data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, [autocompleteConfig?.language]);

    return { predictions, error, loading, getPredictions };
}

const useAutocompleteMocks = (autocompleteConfig?: AutocompleteConfig) => {

    const [predictions, setPredictions] = useState<AutocompleteData[]>([]);
    const [loading, setLoading] = useState(false)

    //TODO: generalize errors.
    const [error, setError] = useState<any>(null)

    const getPredictions = useCallback(async (input: string) => {
        setLoading(true);
        //Fake loading;
        await new Promise(res => setTimeout(res, 500));

        switch (input.toLowerCase()) {
            case "error": setError(input); break;
            case "h": case "ha": case "hai": case "haif":
                setPredictions(mocks.autocomplete); break;
            default:
                setPredictions([]);
        }
        setLoading(false);
    }, []);

    return { predictions, error, loading, getPredictions };
}

export default config.useMocks ? useAutocompleteMocks : useAutocomplete;