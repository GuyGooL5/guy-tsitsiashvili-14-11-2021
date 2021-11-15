import { useMemo } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { Typography, CardActionArea, CardContent, Grid } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import weatherIcons from "../../../assets/weatherIcons";
import { useReduxDispatch, useReduxSelector } from "../../../redux/store";
import { getDirectionDegree } from "../../../utils/functions";
import { CurrentConditionData } from "../../../types/interfaces/CurrentConditionData";
import { Directions, LocationData } from "../../../types";
import setLocation from "../../../actions/setLocation";

interface DataCardProps {
    favorite: LocationData;
    data: CurrentConditionData;
}




function FavoriteDataContent({ favorite, data }: DataCardProps) {

    const { unit } = useReduxSelector(s => s.configuration);
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();

    const Wi = useMemo(() => data.WeatherIcon ? weatherIcons[data.WeatherIcon].Icon : null, [data.WeatherIcon]);



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


    function navigateToFullForecast() {
        setLocation(favorite)(dispatch, navigate);
    }


    return <>
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

            {data.Wind.Speed[unit].Value &&
                <ExtraWind speed={data.Wind.Speed[unit].Value}
                    unit={data.Wind.Speed[unit].Unit}
                    direction={data.Wind.Direction.English} />}

            {data.RelativeHumidity &&
                <ExtraHumidity humidity={data.RelativeHumidity} />}
        </CardContent>
    </>
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


