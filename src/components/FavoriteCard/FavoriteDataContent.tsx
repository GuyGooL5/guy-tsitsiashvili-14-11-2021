import { ArrowRightAlt, Delete, Replay } from "@mui/icons-material";
import { CardHeader, IconButton, Typography, CardActionArea, CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import weatherIcons from "../../assets/weatherIcons";
import { favoritesSliceActions } from "../../redux/reducers/favoritesReducer";
import { useReduxDispatch, useReduxSelector } from "../../redux/store";
import { FavoriteData, CurrentConditionData, Directions, } from "../../types/states";
import { getDirectionDegree } from "../../utils/functions";

interface DataCardProps {
    favorite: FavoriteData;
    data: CurrentConditionData;
    onRefresh: () => void;
    editMode: boolean;
}




function FavoriteDataContent({ favorite, data, onRefresh, editMode }: DataCardProps) {

    const Wi = useMemo(() => data.WeatherIcon ? weatherIcons[data.WeatherIcon].Icon : null, [data.WeatherIcon]);

    const navigate = useNavigate();
    const { unit } = useReduxSelector(s => s.configuration);
    const dispatch = useReduxDispatch();

    const { background, color } = useMemo(() => {
        const { day, night } = data.WeatherIcon ? weatherIcons[data.WeatherIcon] : { day: true, night: true };
        if (day && night)
            return {
                background: "radial-gradient(circle, #e0ebef 0%, #b6c1c6 100%)",
                color: "#64767d"
            };
        if (day)
            return {
                background: "radial-gradient(circle, #ffedb2 0%, #ffe696 100%)",
                color: "#9a7400"
            };
        return {
            background: "radial-gradient(circle, #234660 0%, #072032 100%)",
            color: "#7599a9"
        };
    }, [data.WeatherIcon]);


    function handleDelete() {
        dispatch(favoritesSliceActions.remove_favorite(favorite.Key));
    }


    function navigateToFullForecast() {
        navigate(`/forecast/${favorite.Key}`);
    }


    return <>
        <CardHeader
            action={
                editMode ?
                    <IconButton color="error" onClick={handleDelete}><Delete /></IconButton>
                    :
                    <IconButton aria-label="retry" color="primary" onClick={onRefresh}><Replay /></IconButton>
            }
            title={<Typography variant="h6">{favorite.LocalizedName}</Typography>}
        />

        <CardActionArea onClick={navigateToFullForecast} sx={{ background }}>
            <Box display="block">
                {Wi && <Wi size={128} color={color} style={{ position: "absolute", paddingTop: 16, paddingLeft: 16 }} />}

                <Typography variant="h5" color={color}
                    sx={{ position: "relative", width: "100%", textAlign: "right", px: 2, pt: 2, pb: 1 }}>
                    {data.WeatherText}
                </Typography>

                <Typography variant="h3" color={color}
                    sx={{ position: "relative", width: "100%", textAlign: "right", px: 2, pt: 1, pb: 2 }}>
                    {data.Temperature[unit].Value}°{data.Temperature[unit].Unit}
                </Typography>
            </Box>
        </CardActionArea>
        <CardContent>
            {data.Wind.Speed[unit].Value && <ExtraWind
                speed={data.Wind.Speed[unit].Value} unit={data.Wind.Speed[unit].Unit} direction={data.Wind.Direction.English} />}
            {data.RelativeHumidity && <ExtraHumidity humidity={data.RelativeHumidity} />}
        </CardContent>
    </ >
}

interface WindDirectionProps {
    speed: number | null;
    unit: string;
    direction: Directions | string;
}

const ExtraWind = ({ speed, unit, direction }: WindDirectionProps) => speed ?
    <Grid container >
        <Grid item >
            <Typography variant="body1">
                <span style={{ fontWeight: 700 }}>Wind: </span>{speed} {unit} </Typography>
        </Grid >
        <Grid item  >
            <ArrowRightAlt sx={{ transform: `rotate(${getDirectionDegree(direction) - 90}deg)` }} />
        </Grid>
        <Grid item alignSelf="top">
            <Typography variant="caption" fontWeight={700}>{direction} </Typography>
        </Grid >

    </Grid >
    : null;


const ExtraHumidity = ({ humidity }: { humidity: number }) =>
    <Typography variant="body1">
        <span style={{ fontWeight: 700 }}>Humidity: </span>{humidity}% </Typography>;

export default FavoriteDataContent;


