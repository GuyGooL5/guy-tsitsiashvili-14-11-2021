import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigurationState } from "../../types/states";
import LocalStorage from "../../utils/LocalStorage";



const initialState: ConfigurationState = {
    theme: LocalStorage.get("theme") ?? "default",
    unit: LocalStorage.get("unit") ?? "Metric",
    //TODO: refine this.
    default_location: LocalStorage.get("default_location") ?? { LocalizedName: "Tel Aviv", Key: "215854" },
    show_night: new Date().getHours() > 17
};

const configurationSlice = createSlice({
    name: "configuration",
    initialState,
    reducers: {
        set_theme: (state, { payload }: PayloadAction<ConfigurationState["theme"]>) => {
            LocalStorage.set("theme", payload);
            state.theme = payload;
        },
        set_unit: (state, { payload }: PayloadAction<ConfigurationState["unit"]>) => {
            LocalStorage.set("unit", payload);
            state.unit = payload;
        },
        set_night: (state, { payload }: PayloadAction<ConfigurationState["show_night"]>) => {
            state.show_night = payload;
        }
    }
})


export const configurationSliceActions = { ...configurationSlice.actions };

export default configurationSlice.reducer;