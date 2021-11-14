import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigurationState } from "../../types/states";
import LocalStorage from "../../utils/LocalStorage";



const initialState: ConfigurationState = {
    theme: LocalStorage.get("theme") ?? "default"
};

const configurationSlice = createSlice({
    name: "configuration",
    initialState,
    reducers: {
        set_theme: (state, { payload }: PayloadAction<ConfigurationState["theme"]>) => {
            LocalStorage.set("theme", payload);
            state.theme = payload;
        }
    }
})


export const configurationSliceActions = { ...configurationSlice.actions };

export default configurationSlice.reducer;