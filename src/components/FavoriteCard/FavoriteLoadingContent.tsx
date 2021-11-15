import { CardHeader, CardContent, Grid, CircularProgress, Typography } from "@mui/material";

interface LoadingCardProps {
    city: string;
}
function FavoriteLoadingContent({ city }: LoadingCardProps) {

    return <>
        <CardHeader title={<Typography variant="h6">{city}</Typography>} />
        <CardContent >
            <Grid container sx={{ height: "100%" }} alignItems="center" alignContent="center" justifyContent="center">
                <Grid item alignSelf="center">
                    <CircularProgress size={128} />
                </Grid>
            </Grid>
        </CardContent>
    </>
}


export default FavoriteLoadingContent;