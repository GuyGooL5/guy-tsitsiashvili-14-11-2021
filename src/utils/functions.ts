import { Directions } from "../types";
import { ConfigurationState } from "../types/states";




/** This function will set the theme value based on the given configration, if set to default it will lookup the browser default 
 * if supported, 'light' otherwise.
 */

export function getTheme(selectedTheme: ConfigurationState["theme"]): "light" | "dark" {
    switch (selectedTheme) {
        case "light": return "light";
        case "dark": return "dark";
        case "default":
        default: return (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light";

    }

}

/**
 * This function converts the country code to the corresponding emoji flag.
 * @see {@link https://dev.to/jorik/country-code-to-flag-emoji-a21} credit
 */
export function getFlagEmoji(countryCode: string) {
    return countryCode.toUpperCase().replace(/./g, char =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

export function getDirectionDegree(direction: Directions | string) {
    switch (direction) {
        case "NNE": return 22.5;
        case "NE": return 45;
        case "ENE": return 67.5;
        case "E": return 90;
        case "ESE": return 112.5;
        case "SE": return 135;
        case "SSE": return 157.5;
        case "S": return 180;
        case "SSW": return 202.5;
        case "SW": return 225;
        case "WSW": return 247.5;
        case "W": return 270;
        case "WNW": return 292.5;
        case "NW": return 315;
        case "NNW": return 337.5;
        case "N":
        default:
            return 0;
    }
}
