import { Card } from "@mui/material";
import { useMemo } from "react";
import { useReduxSelector } from "../../redux/store";
import { DailyForecast } from "../../types/interfaces/ForecastData";
import { getDayOffest, getWeatherStyle } from "../../utils/functions";
import DailyDetailsBox from "./DailyDetailsBox";
import MinimalDetail from "./MinimalDetails";

interface DailyDetailsProps {
    data: DailyForecast;
    time: "Day" | "Night";
    index: number;
}

export default function DailyDetails({ data, time, index }: DailyDetailsProps) {

    const { show_night } = useReduxSelector(s => s.configuration);

    const icon = useMemo(() => show_night ? data.Night.Icon : data.Day.Icon
        , [data.Day.Icon, data.Night.Icon, show_night]);

    const { color, background } = useMemo(() => getWeatherStyle(icon), [icon])

    const day = useMemo(() => getDayOffest(index).substr(0, 3), [index]);

    return <Card sx={{ minWidth: 210, background }}>
        <DailyDetailsBox iconSize={64} color={color} day={day} weatherText={data[time].IconPhrase}
            Temperature={data.Temperature} iconIndex={icon} />
    </Card >

}
