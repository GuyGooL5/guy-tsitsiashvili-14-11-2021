import { useMemo } from "react";
import { useNavigate } from "react-router";
import { Typography, CardActionArea, CardContent, Grid } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { useReduxDispatch, useReduxSelector } from "../../../redux/store";
import { getDirectionDegree, getWeatherStyle } from "../../../utils/functions";
import { CurrentConditionData } from "../../../types/interfaces/CurrentConditionData";
import { Directions, LocationData } from "../../../types";
import setLocation from "../../../actions/setLocation";
import WeatherDetailsBox from "./WeatherDetailsBox";

interface DataCardProps {
    favorite: LocationData;
    data: CurrentConditionData;
}




function FavoriteDataContent({ favorite, data }: DataCardProps) {

    const { unit } = useReduxSelector(s => s.configuration);
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();




    const { background, color } = useMemo(() => getWeatherStyle(data.WeatherIcon), [data.WeatherIcon]);


    function navigateToFullForecast() {
        setLocation(favorite)(dispatch, navigate);
    }


    return <>
        <CardActionArea onClick={navigateToFullForecast} sx={{ background }}>
            <WeatherDetailsBox color={color}
                Temperature={{ Value: data.Temperature[unit].Value, Unit: data.Temperature[unit].Unit }}
                WeatherIcon={data.WeatherIcon}
                WeatherText={data.WeatherText}
            />
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


