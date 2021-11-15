import { Card, CardContent, Container, Grid } from "@mui/material";
import useForecast from "../../hooks/useForecast";
import { useReduxSelector } from "../../redux/store";

interface ForecastSummaryProps {
    id: string;
}

export default function ForecastSummary({ id }: ForecastSummaryProps) {

    const { unit } = useReduxSelector(s => s.configuration);
    const { LocalizedName, Key } = useReduxSelector(s => s.forecast);

    const { forecast, loading } = useForecast(id, unit);



    return <Container maxWidth="lg" sx={{ display: "flex" }}>
        <Card sx={{ flexGrow: 1 }}>
            <CardContent>
                <Grid container justifyContent="space-between">
                    <Grid item>{LocalizedName}</Grid>
                </Grid>
            </CardContent>
            {JSON.stringify(forecast)}
        </Card>
    </Container>
}
