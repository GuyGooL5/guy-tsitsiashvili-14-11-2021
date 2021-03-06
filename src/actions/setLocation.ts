import { NavigateFunction } from "react-router";
import { LocationData } from "../types";
import { forecastSliceActions } from "../redux/reducers/forecastReducer";
import { ReduxDispatch } from "../redux/store";

const setLocation = (location: LocationData,navigateTo?:string) => (dispatch: ReduxDispatch, navigate: NavigateFunction) => {
    dispatch(forecastSliceActions.set_location(location));
    navigate(navigateTo??`/forecast/${location.Key}`);
}

export default setLocation;