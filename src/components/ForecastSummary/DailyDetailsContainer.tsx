import { Grid } from '@mui/material'
import React from 'react'
import { ForecastData } from '../../types/interfaces/ForecastData'
import DailyDetails from './DailyDetails'

interface DailyDetailsContainerProps {
    data: ForecastData["DailyForecasts"];
    time: "Day" | "Night";
}
export default function DailyDetailsContainer({ data, time }: DailyDetailsContainerProps) {
    return <Grid container spacing={2} justifyContent="space-around">
        {data.map((daily, index) =>
            <Grid item xs >
                <DailyDetails data={daily} index={index} key={index} time={time} />
            </Grid>
        )}
    </Grid>
}
