import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import getForecast from "../../actions/getForecast";
import setLocation from "../../actions/setLocation";
import useSnackbar from "../../hooks/useSnackbar";
import { useReduxDispatch, useReduxSelector } from "../../redux/store";
import { UnitSystem } from "../../types";
import { getWeatherStyle } from "../../utils/functions";
import DailyDetailsContainer from "./DailyDetailsContainer";
import ForecastSummaryButtons from "./ForecastSummaryButtons";
import LoadingSkeleton from "./LoadingSkeleton";
import MinimalDetail from "./MinimalDetails";



interface ForecasetHeadlingProps { color: string, text: string }
const ForecastHeadline = ({ color, text }: ForecasetHeadlingProps) =>
    <Grid item container sx={{ height: 250 }} justifyContent="center" alignContent="center">
        <Grid item ><Typography variant="h3" color={color} >{text}</Typography></Grid>
    </Grid>;

interface ForecastSummaryProps {
    id: string;
}

const ForecastSummary = memo(({ id }: ForecastSummaryProps) => {

    const [loading, setLoading] = useState(true);
    const { default_location } = useReduxSelector(s => s.configuration);
    const { unit, show_night } = useReduxSelector(s => s.configuration);
    const { location, forecast } = useReduxSelector(s => s.forecast);

    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const { snackbar, snackbarHandler } = useSnackbar();

    const refresh = useCallback(async (newUnit?: UnitSystem) => {
        setLoading(true);
        try {
            await getForecast(id, newUnit ?? unit)(dispatch);
        } catch (e) {
            setLocation(default_location, "/")(dispatch, navigate);
            snackbar(`${e}`, {
                buttons: [
                    <Button color="secondary" onClick={snackbarHandler.close}>Dismiss</Button>]
            });

        } finally {
            setLoading(false);
        }
    }, [default_location, dispatch, id, navigate, snackbar, snackbarHandler.close, unit]);

    useEffect(() => {
        refresh();
    }, [])

    const time = useMemo(() => show_night ? "Night" : "Day", [show_night]);

    const { color, background } = useMemo(() =>
        getWeatherStyle(forecast ? forecast.DailyForecasts[0][time].Icon : null)
        , [time, forecast])

    return <Container maxWidth="lg" sx={{ display: "flex" }}>
        {loading ? <LoadingSkeleton /> :
            <Card sx={{ flexGrow: 1 }}>
                {forecast && <>
                    <ForecastSummaryButtons location={location} onRefresh={refresh} />
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
                                    WeatherIcon={forecast.DailyForecasts[0][time].Icon}
                                    color={color} />
                            </Box>
                        </Grid>
                        <CardContent>
                            <ForecastHeadline color={color} text={forecast.Headline.Text} />
                            <DailyDetailsContainer data={forecast.DailyForecasts} time={time} />
                        </CardContent>
                    </Box>
                </>}
            </Card>
        }
    </Container >
}, (prev, next) => prev.id !== next.id);

export default ForecastSummary;
