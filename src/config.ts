import { LocationData } from "./types";

type EnvironmentVaribles =
    | "REACT_APP_ACCU_WEATHER_API_KEY"
    ;

const env = process.env as NodeJS.ProcessEnv & Record<EnvironmentVaribles, string>;

interface AppConfig {
    accuWeatherAPIKey: string;
    defaultLocation: LocationData;
}


const config: AppConfig = {
    accuWeatherAPIKey: env.REACT_APP_ACCU_WEATHER_API_KEY,
    defaultLocation: { Key: "215854", LocalizedName: "Tel Aviv" },
}

export default config;