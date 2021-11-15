import { WbSunny, NightsStay, Favorite, FavoriteBorder, Thermostat } from '@mui/icons-material'
import { Button, CardActions, IconButton } from '@mui/material'
import { useMemo } from 'react'
import { configurationSliceActions } from '../../redux/reducers/configurationReducer'
import { favoritesSliceActions } from '../../redux/reducers/favoritesReducer'
import { useReduxDispatch, useReduxSelector } from '../../redux/store'
import { LocationData } from '../../types'
import { getWeatherStyle } from '../../utils/functions'



interface ForecastSummaryButtonsProps {
    location: LocationData;
}

export default function ForecastSummaryButtons({ location }: ForecastSummaryButtonsProps) {

    const { show_night, unit } = useReduxSelector(s => s.configuration);
    const { favorites } = useReduxSelector(s => s.favorites);
    const dispatch = useReduxDispatch();

    const favorited = useMemo(() => Object.keys(favorites).includes(location.Key), [favorites, location.Key]);

    const { color } = getWeatherStyle(show_night ? 1 : 33);

    return <CardActions sx={{ float: 'right' }}>
        <Button variant={favorited ? "text" : "contained"} startIcon={favorited ? <FavoriteBorder /> : <Favorite />}
            onClick={() => favorited ?
                dispatch(favoritesSliceActions.remove_favorite(location.Key))
                : dispatch(favoritesSliceActions.add_favorite(location))
            }>
            {favorited ? "Remove Favorite" : "Add Favorite"}</Button>
        <Button startIcon={<Thermostat />}
            onClick={() => dispatch(configurationSliceActions.set_unit(unit === "Metric" ? "Imperial" : "Metric"))}>
            {unit === "Metric" ? "F" : "C"}</Button>
        <IconButton sx={{ color }}
            onClick={() => dispatch(configurationSliceActions.set_night(!show_night))}>
            {show_night ? <WbSunny /> : <NightsStay />}
        </IconButton>
    </CardActions>
}