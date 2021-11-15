import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import weatherIcons from "../../assets/weatherIcons";

interface MinimalDetailsProps {
    color: string;
    WeatherIcon: number | null;
    text: string;
    Temperature: {
        Value: number | null;
        Unit: string;
    };
    iconSize: number;
}

export default function MinimalDetail({ color, text, iconSize, Temperature, WeatherIcon }: MinimalDetailsProps) {

    const Wi = useMemo(() => WeatherIcon ? weatherIcons[WeatherIcon].Icon : null, [WeatherIcon]);
    
    return <Box display="block">
        {Wi && <Wi size={iconSize} color={color} style={{ position: "absolute", paddingTop: 16, paddingLeft: 16 }} />}

        <Typography variant="h5" color={color}
            sx={{ position: "relative", width: "100%", textAlign: "right", px: 2, pt: 2, pb: 1 }}>
            {text}
        </Typography>

        <Typography variant="h3" color={color}
            sx={{ position: "relative", width: "100%", textAlign: "right", px: 2, pt: 1, pb: 2 }}>
            {Temperature.Value ? `${Temperature.Value}°${Temperature.Unit}` : "N/A"}
        </Typography>
    </Box>

}
