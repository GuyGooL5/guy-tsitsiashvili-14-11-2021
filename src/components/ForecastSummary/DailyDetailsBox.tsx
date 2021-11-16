import { Box, Typography, TypographyProps } from "@mui/material";
import { useMemo } from "react";
import weatherIcons from "../../assets/weatherIcons";
import { DailyForecast } from "../../types/interfaces/ForecastData";


interface MinMaxTextProps {
    min: number | null;
    max: number | null;
    unit: string;
}
const MinMaxText = ({ min, max, unit, ...props }: MinMaxTextProps & TypographyProps) =>
    <Typography {...props}>{max ? `${max}°${unit}` : "N/A"} \ {min ? `${min}°${unit}` : "N/A"}</Typography>


interface MinimalDetailsProps {
    color: string;
    iconIndex: number | null;
    day: string;
    weatherText: string;
    Temperature: DailyForecast["Temperature"];
    iconSize: number;
}

export default function DailyDetailsBox({ color, day, weatherText, iconSize, Temperature, iconIndex }: MinimalDetailsProps) {

    const Wi = useMemo(() => iconIndex ? weatherIcons[iconIndex].Icon : null, [iconIndex]);

    return <Box display="block">
        {Wi && <Wi size={iconSize} color={color} style={{ position: "absolute", paddingTop: 16, paddingLeft: 16 }} />}

        <Typography variant="h5" color={color}
            sx={{ position: "relative", width: "100%", textAlign: "right", px: 2, pt: 2, pb: 1 }}>
            {day}
        </Typography>
        <Typography variant="body1" color={color} fontWeight={700}
            sx={{ position: "relative", width: "100%", textAlign: "right", px: 2, }}>
            {weatherText}
        </Typography>
        <MinMaxText variant="h5" color={color} textAlign="right" sx={{ px: 2, pb: 1 }}
            min={Temperature.Minimum.Value}
            max={Temperature.Maximum.Value}
            unit={Temperature.Maximum.Unit} />
    </Box>

}


