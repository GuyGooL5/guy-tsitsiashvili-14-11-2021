import { ConfigurationState } from "../types/states";




/**
 * @brief This function will set the theme value based on the given configration, if set to default it will lookup the browser default 
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