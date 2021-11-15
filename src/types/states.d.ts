type Values<Unit extends string, Type extends Number> = {
    Value: number | null; //Rounded value in specified units. May be NULL.
    Unit: Unit | string; //Type of unit.
    UnitType: Type | number; //Numeric ID associated with the type of unit being displayed.
}

export interface Temperature {
    Metric: Values<"C", 17>,
    Imperial: Values<"F", 18>
}

export interface Precipitation {
    Metric: Values<"mm", 3>,
    Imperial: Values<"in", 1>

};

export type Directions = "N" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "S" | "SSW" | "SW" | "WSW" | "W" | "WNW" | "NW" | "NNW";

export interface CurrentConditionData {
    LocalObservationDateTime: string; //DateTime of the current observation, displayed in ISO8601 format.
    EpochTime: number; //DateTime of the current observation, displayed as the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
    WeatherText: string; //Phrase description of the current weather condition. Displayed in the language set with language code in URL.
    WeatherIcon: number | null; //Numeric value representing an image that displays the current condition described by WeatherText.May be NULL.
    IsDayTime: boolean; //Flag indicating the time of day (true=day, false=night);
    Temperature: Temperature;
    HasPrecipitation: boolean; //Flag indicating the presence or absence of precipitation. True indicates the presence of precipitation, false indicates the absence of precipitation.
    PrecipitationType: "Rain" | "Snow" | "Ice" | "Mixed" | string | null; //If precipitation is present, the type of precipitation will be returned. Possible values are Rain, Snow, Ice, or Mixed. Null in the absence of precipitation.
    MobileLink: string; //Link to current conditions for the requested location on AccuWeather`s mobile site.
    Link: string; //Link to current conditions for the requested location on AccuWeather`s web site.
    LocalSource?: {
        Id: number; //Numeric identifier unique to the local data provider. This parameter is not shown if there is not local source information to display.
        Name: string; //Name of the local data provider, displayed in the language set with language code in URL, if available. Otherwise, Name is displayed in English or the language in which the name was provided. This parameter is not shown if there is no local source information to display.
        WeatherCode: string; //Weather code provided by the local data provider. This weather code allows the current condition to be matched to icons provided by the local data provider instead of AccuWeather icons. This parameter is not shown if there is no local source information to display.
    }
    RealFeelTemperature: Temperature; //Patented AccuWeather RealFeel Temperature. Contains Metric and Imperial Values.
    RealFeelTemperatureShade: Temperature; //Patented AccuWeather RealFeel Temperature in the shade.Contains Metric and Imperial Values.
    RelativeHumidity: number | null; //Relative humidity. May be NULL.
    DewPoint: Temperature; //Dew point temperature. Contains Metric and Imperial Values
    Wind: {
        Direction: {
            Degrees: number; //Wind direction in Azimuth degrees (e.g. 180 degrees is a wind coming from the south). May be NULL.
            Localized: string; //Direction abbreviated in the language specified by language code in URL.
            English: Directions | string; //Direction abbreviated in English.
        };
        Speed: {
            Metric: Values<"km/h", 7>;
            Imperial: Values<"mi/h", 9>;
        }; //Wind Speed. Contains Metric and Imperial Values.
    };
    WindGust: {
        Speed: {
            Metric: Values<"km/h", 7>;
            Imperial: Values<"mi/h", 9>;
        }; //Wind gust speed. Contains Metric and Imperial Values
    },
    UVIndex: number | null; //Measure of the strength of the ultraviolet radiation from the sun. May be NULL.
    UVIndexText: string; //Text associated with the UVIndex.
    Visibility: {
        Metric: Values<"km", 6>;
        Imperial: Values<"mi", 2>;
    }; //Visibility. Contains Metric and Imperial Values.
    ObstructionsToVisibility: string; //ObstructionsToVisibility
    CloudCover: number | null; //Number representing the percentage of the sky that is covered by clouds. May be NULL.
    Ceiling: {
        Metric: Values<"m", 5>
        Imperial: Values<"ft", 0>
    }; //Cloud ceiling. Contains Metric and Imperial Values.
    Pressure: {
        Metric: Values<"mb", 14>;
        Imperial: Values<"inHg", 12>;
    }; //Atmospheric pressure. Contains Metric and Imperial Values.
    PressureTendency: {
        LocalizedText: string; //Description of the pressure tendency in the language specified by language code in the URL.
        Code: "F" | "S" | "R" | string; //Pressure tendency code regardless of language. (F=falling, S=steady, R=rising)
    };
    Past24HourTemperatureDeparture: Temperature; //Departure from the temperature observed 24 hours ago. Contains Metric and Imperial Values.
    ApparentTemperature: Temperature; //Perceived outdoor temperature caused by the combination of air temperature, relative humidity, and wind speed. Contains Metric and Imperial Values.
    WindChillTemperature: Temperature; //Perceived air temperature on exposed skin due to wind. Contains Metric and Imperial Values.
    WetBulbTemperature: Temperature; //The temperature to which air may be cooled by evaporating water into it at constant pressure until it reaches saturation. Contains Metric and Imperial Values.
    Precip1hr: Precipitation; //Amount of precipitation (liquid water equivalent) that has fallen in the past hour. Contains Metric and Imperial Values.
    PrecipitationSummary: Record<
        "Precipitation"  //Deprecated. Please use the precipitation summary for a specific time span.
        | "PastHour"  //The amount of precipitation (liquid equivalent) that has fallen in the past hour. Contains Metric and Imperial Values.
        | "Past3Hours"  //The amount of precipitation (liquid equivalent) that has fallen in the past 3 hours. Contains Metric and Imperial Values.
        | "Past6Hours"  //The amount of precipitation (liquid equivalent) that has fallen in the past 6 hours. Contains Metric and Imperial Values.
        | "Past9Hours"  //The amount of precipitation (liquid equivalent) that has fallen in the past 9 hours. Contains Metric and Imperial Values.
        | "Past12Hours"  //The amount of precipitation (liquid equivalent) that has fallen in the past 12 hours. Contains Metric and Imperial Values.
        | "Past18Hours"  //The amount of precipitation (liquid equivalent) that has fallen in the past 18 hours. Contains Metric and Imperial Values.
        | "Past24Hours" //The amount of precipitation (liquid equivalent) that has fallen in the past 24 hours. Contains Metric and Imperial Values.
        , Precipitation>;
    PrecipitationSummary: Record<
        "Past6HourRange"  //The temperature (minimum, maximum) observed over the past 6 hours. Contains Metric and Imperial Values.
        | "Past12HourRange"  //The temperature (minimum, maximum) observed over the past 12 hours. Contains Metric and Imperial Values.
        | "Past24HourRange" //The temperature (minimum, maximum) observed over the past 24 hours. Contains Metric and Imperial Values.
        , { Minimum: Temperature, Maximum: Temperature }>;
    IndoorRelativeHumidity: number; //The relative humidity in the user's home or building.
}


export interface ConfigurationState {
    theme: "light" | "dark" | "default";
    unit: keyof Temperature;
}

export interface FavoriteData {
    LocalizedName: string;
    Key: string;
}

export type FavoritesMap = {
    [key: string]: FavoriteData;
}
export interface FavoritesState {
    favorites: FavoritesMap;
}