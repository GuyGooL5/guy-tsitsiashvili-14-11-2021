import { Favorite, FavoriteOutlined, NightsStay, WbSunny } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Typography } from "@mui/material";
import { useMemo } from "react";
import useForecast from "../../hooks/useForecast";
import { configurationSliceActions } from "../../redux/reducers/configurationReducer";
import { favoritesSliceActions } from "../../redux/reducers/favoritesReducer";
import { useReduxDispatch, useReduxSelector } from "../../redux/store";
import { getWeatherStyle } from "../../utils/functions";
import DailyDetailsContainer from "./DailyDetailsContainer";
import ForecastSummaryButtons from "./ForecastSummaryButtons";
import MinimalDetail from "./MinimalDetails";

interface ForecastSummaryProps {
    id: string;
}



export default function ForecastSummary({ id }: ForecastSummaryProps) {

    const { unit, show_night } = useReduxSelector(s => s.configuration);
    const { location } = useReduxSelector(s => s.forecast);
    const { favorites } = useReduxSelector(s => s.favorites);

    const dispatch = useReduxDispatch();
    const { forecast, loading } = useForecast(id, unit);

    const dayOrNight = useMemo(() => show_night ? "Night" : "Day", [show_night]);

    const { color, background } = useMemo(() =>
        getWeatherStyle(forecast ? forecast.DailyForecasts[0][dayOrNight].Icon : null)
        , [dayOrNight, forecast])

    return <Container maxWidth="lg" sx={{ display: "flex" }}>
        <Card sx={{ flexGrow: 1 }}>
            {forecast && <>
                <ForecastSummaryButtons location={location} />
                <Box sx={{}}>
                    <Grid container component={CardMedia} sx={{ background }}
                        alignItems="center" justifyContent="space-between" flexWrap="nowrap" >
                        <Box sx={{ left: 0, width: 320 }}>
                            <MinimalDetail iconSize={96}
                                text={location.LocalizedName}
                                Temperature={{
                                    Value: forecast.DailyForecasts[0].Temperature.Maximum.Value,
                                    Unit: forecast.DailyForecasts[0].Temperature.Maximum.Unit
                                }}
                                WeatherIcon={forecast.DailyForecasts[0][dayOrNight].Icon}
                                color={color} />
                        </Box>
                    </Grid>
                    <CardContent>
                        <Grid item container sx={{ height: 250 }} justifyContent="center" alignContent="center">
                            <Grid item >
                                <Typography variant="h3" color={color} >{forecast.Headline.Text}</Typography>
                            </Grid>
                        </Grid>
                        <DailyDetailsContainer data={forecast.DailyForecasts} />
                    </CardContent>
                </Box>
            </>}
        </Card>
    </Container >
}
