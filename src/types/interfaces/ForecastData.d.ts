interface Values<Unit extends string, UnitType extends number> {
    Value: number | null; //Rounded value in specified units. May be NULL.
    Unit: Unit; //Type of unit.
    UnitType: UnitType //Numeric ID associated with the type of unit being displayed.
}

interface Imperial {
    Temperature: Values<"F", 18>;
}
interface Metric {
    Temperature: Values<"C", 17>
}

export type UnitSystem = Imperial | Metric;

type WeatherData = {
    Icon: number; //Numeric value representing an icon that matches the forecast.
    IconPhrase: string; //Phrase description of the icon.
    HasPrecipitation: boolean; //Boolean value that indicates the presence of any type of precipitation. Displays true if precipitation is present.

}


export interface DailyForecast {
    Date: string; //DateTime of the forecast, displayed in ISO8601 format.
    EpochDate: number; //Date of the forecast, displayed as the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
    Temperature: {
        Minimum: UnitSystem["Temperature"];
        Maximum: UnitSystem["Temperature"];
    };
    Day: WeatherData;
    Night: WeatherData;
    Sources: string[]; //Forecast sources.
    MobileLink: string //Link to the daily forecast for the requested location on AccuWeather`s mobile site.
    Link: string; //Link to the daily forecast for the requested location on AccuWeather`s web site.
};


export interface ForecastData {
    Headline: {
        EffectiveDate: string //DateTime, displayed in ISO8601 format, when the Headline is in effect.
        EffectiveEpochDate: number; //Effective Date of the headline, displayed as the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
        Severity: 7; //Severity of the headline, displayed as an integer. The lower the number, the greater the severity. 0 = Unknown 1 = Significant 2 = Major 3 = Moderate 4 = Minor 5 = Minimal 6 = Insignificant 7 = Informational
        Text: string; //Text of the headline, which represents the most significant weather event over the next 5 days. Displayed in the language specified by language code in URL.
        Category: string //Category of the headline.        ,
        EndDate: string | null; //DateTime, displayed in ISO8601 format, when the Headline expires. May be NULL.
        EndEpochDate: number; //End Date of the headline, displayed as the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
        MobileLink: string //Link to the daily forecast for the requested location on AccuWeather`s mobile site.
        Link: string; //Link to the daily forecast for the requested location on AccuWeather`s web site.
    };
    DailyForecasts: DailyForecast[];
}
