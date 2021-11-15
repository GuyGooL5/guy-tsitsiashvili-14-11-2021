
type EnvironmentVaribles =
    | "REACT_APP_ACCU_WEATHER_API_KEY"
    ;

const env = process.env as NodeJS.ProcessEnv & Record<EnvironmentVaribles, string>;

interface AppConfig {
    accuWeatherAPIKey: string;
    useMocks: boolean;
}


const config: AppConfig = {
    accuWeatherAPIKey: env.REACT_APP_ACCU_WEATHER_API_KEY,
    useMocks: true
}

export default config;