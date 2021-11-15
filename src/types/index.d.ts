export type UnitSystem = "Metric" | "Imperial";

export type Languages = "en-us" | "he-il";

export type Directions = "N" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "S" | "SSW" | "SW" | "WSW" | "W" | "WNW" | "NW" | "NNW";

export type Values<Unit extends string, Type extends Number> = {
    Value: number | null; //Rounded value in specified units. May be NULL.
    Unit: Unit | string; //Type of unit.
    UnitType: Type | number; //Numeric ID associated with the type of unit being displayed.
}

export interface FavoriteData {
    LocalizedName: string;
    Key: string;
}