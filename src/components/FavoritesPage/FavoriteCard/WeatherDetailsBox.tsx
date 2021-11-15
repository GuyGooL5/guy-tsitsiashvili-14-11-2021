import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import weatherIcons from '../../../assets/weatherIcons';

interface WeatherDetailsBoxProps {
    color: string;
    WeatherIcon: number | null;
    WeatherText: string;
    Temperature: {
        Value: number;
        Unit: string;
    }
}

export default function WeatherDetailsBox({ color, WeatherText, Temperature, WeatherIcon }: WeatherDetailsBoxProps) {

    const Wi = useMemo(() => WeatherIcon ? weatherIcons[WeatherIcon].Icon : null, [WeatherIcon]);


    return <Box display="block">
        {Wi && <Wi size={128} color={color} style={{ position: "absolute", paddingTop: 16, paddingLeft: 16 }} />}

        <Typography variant="h5" color={color}
            sx={{ position: "relative", width: "100%", textAlign: "right", px: 2, pt: 2, pb: 1 }}>
            {WeatherText}
        </Typography>

        <Typography variant="h3" color={color}
            sx={{ position: "relative", width: "100%", textAlign: "right", px: 2, pt: 1, pb: 2 }}>
            {Temperature.Value}°{Temperature.Unit}
        </Typography>
    </Box>

}
