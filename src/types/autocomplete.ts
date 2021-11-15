export interface AutocompleteData {
    Version: number; //Version of the API.
    Key: string; //Location Key.
    Type: "City" | "PostalCode" | "POI" | "LatLong" | string; //Location type
    Rank: number; //Number applied to Locations, set by factors such as population, political importance, and geographic size.
    LocalizedName: string;//	Display name in local dialect set with language code in URL.Default is US English(en - us).
    Country: {
        ID: string; //Unique ISO or Microsoft Localization Code for the country.
        LocalizedName: string;//Country name as displayed in the local dialect set with language code in the URL. Default is US English (en-us).
    };
    AdministrativeArea: {
        ID: string; //Unique Administrative Area ID for the location
        LocalizedName: string; //Administrative Area name displayed in the local dialect set with the language code in the URL.Default is US English(en - us).

    };
}