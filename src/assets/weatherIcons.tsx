import {
    WiDaySunny,
    WiDaySunnyOvercast,
    WiDayHaze,
    WiDayCloudy,
    WiCloudy,
    WiFog,
    WiShowers,
    WiDayShowers,
    WiThunderstorm,
    WiDayThunderstorm,
    WiRain,
    WiSnow,
    WiDaySnow,
    WiSnowflakeCold,
    WiSleet,
    WiRainMix,
    WiHot,
    WiStrongWind,
    WiNightClear,
    WiNightPartlyCloudy,
    WiNightCloudy,
    WiNightFog,
    WiNightShowers,
    WiNightThunderstorm,
    WiNightSnow,
} from "react-icons/wi";

import { IconType } from 'react-icons'

type WeatherIcons = {
    [i: number]: {
        name: string;
        day: boolean;
        night: boolean;
        Icon: IconType
    }
}

const weatherIcons: WeatherIcons = {
    1: {
        name: "Sunny",
        day: true,
        night: false,
        Icon: WiDaySunny
    },
    2: {
        name: "Mostly Sunny",
        day: true,
        night: false,
        Icon: WiDaySunny
    },
    3: {
        name: "Partly Sunny",
        day: true,
        night: false,
        Icon: WiDaySunnyOvercast
    },
    4: {
        name: "Intermittent Clouds",
        day: true,
        night: false,
        Icon: WiDaySunnyOvercast
    },
    5: {
        name: "Hazy Sunshine",
        day: true,
        night: false,
        Icon: WiDayHaze
    },
    6: {
        name: "Mostly Cloudy",
        day: true,
        night: false,
        Icon: WiDayCloudy
    },
    7: {
        name: "Mostly Cloudy",
        day: true,
        night: true,
        Icon: WiCloudy
    },
    8: {
        name: "Dreary (Overcast)",
        day: true,
        night: true,
        Icon: WiCloudy
    },
    11: {
        name: "Fog",
        day: true,
        night: true,
        Icon: WiFog
    },
    12: {
        name: "Showers",
        day: true,
        night: true,
        Icon: WiShowers
    },
    13: {
        name: "Mostly Cloudy w/ Showers",
        day: true,
        night: false,
        Icon: WiDayShowers
    },
    14: {
        name: "Partly Sunny w/ Showers",
        day: true,
        night: false,
        Icon: WiDayShowers
    },
    15: {
        name: "T-Storms",
        day: true,
        night: true,
        Icon: WiThunderstorm
    },
    16: {
        name: "Mostly Cloudy w/ T-Storms",
        day: true,
        night: false,
        Icon: WiDayThunderstorm
    },
    17: {
        name: "Partly Sunny w/ T-Storms",
        day: true,
        night: false,
        Icon: WiDayThunderstorm
    },
    18: {
        name: "Rain",
        day: true,
        night: true,
        Icon: WiRain
    },
    19: {
        name: "Flurries",
        day: true,
        night: true,
        Icon: WiSnow
    },
    20: {
        name: "Mostly Cloudy w/ Flurries",
        day: true,
        night: false,
        Icon: WiDaySnow
    },
    21: {
        name: "Partly Sunny w/ Flurries",
        day: true,
        night: false,
        Icon: WiDaySnow
    },
    22: {
        name: "Snow",
        day: true,
        night: true,
        Icon: WiSnow
    },
    23: {
        name: "Mostly Cloudy w/ Snow",
        day: true,
        night: false,
        Icon: WiDaySnow
    },
    24: {
        name: "Ice",
        day: true,
        night: true,
        Icon: WiSnowflakeCold
    },
    25: {
        name: "Sleet",
        day: true,
        night: true,
        Icon: WiSleet
    },
    26: {
        name: "Freezing Rain",
        day: true,
        night: true,
        Icon: WiRainMix
    },
    29: {
        name: "Rain and Snow",
        day: true,
        night: true,
        Icon: WiRainMix
    },
    30: {
        name: "Hot",
        day: true,
        night: true,
        Icon: WiHot
    },
    31: {
        name: "Cold",
        day: true,
        night: true,
        Icon: WiSnowflakeCold
    },
    32: {
        name: "Windy",
        day: true,
        night: true,
        Icon: WiStrongWind
    },
    33: {
        name: "Clear",
        day: false,
        night: true,
        Icon: WiNightClear
    },
    34: {
        name: "Mostly Clear",
        day: false,
        night: true,
        Icon: WiNightPartlyCloudy
    },
    35: {
        name: "Partly Cloudy",
        day: false,
        night: true,
        Icon: WiNightPartlyCloudy
    },
    36: {
        name: "Intermittent Clouds",
        day: false,
        night: true,
        Icon: WiNightCloudy
    },
    37: {
        name: "Hazy Moonlight",
        day: false,
        night: true,
        Icon: WiNightFog
    },
    38: {
        name: "Mostly Cloudy",
        day: false,
        night: true,
        Icon: WiNightCloudy
    },
    39: {
        name: "Partly Cloudy w/ Showers",
        day: false,
        night: true,
        Icon: WiNightShowers
    },
    40: {
        name: "Mostly Cloudy w/ Showers",
        day: false,
        night: true,
        Icon: WiNightShowers
    },
    41: {
        name: "Partly Cloudy w/ T-Storms",
        day: false,
        night: true,
        Icon: WiNightThunderstorm
    },
    42: {
        name: "Mostly Cloudy w/ T-Storms",
        day: false,
        night: true,
        Icon: WiNightSnow
    },
    43: {
        name: "Mostly Cloudy w/ Flurries",
        day: false,
        night: true,
        Icon: WiNightThunderstorm
    },
    44: {
        name: "Mostly Cloudy w/ Snow",
        day: false,
        night: true,
        Icon: WiNightThunderstorm
    },
}
export default weatherIcons;