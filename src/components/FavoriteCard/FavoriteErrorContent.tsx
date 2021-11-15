import { Replay } from '@mui/icons-material'
import { Button, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'

interface FavoriteErrorContentProps {
    title: string;
    error: string;
    onRefresh: () => void;
}

export default function FavoriteErrorContent({ error, title, onRefresh }: FavoriteErrorContentProps) {
    return <Grid container direction="column" justifyContent="space-around" sx={{ height: "100%" }}>
        <Grid item >
            <CardHeader
                action={<IconButton aria-label="retry" color="primary" onClick={onRefresh}><Replay /></IconButton>}
                title={<Typography variant="h6">{title}</Typography>}
            />
        </Grid>
        <Grid item flexGrow={1}>
            <CardContent sx={{ height: "100%" }} >
                <Typography variant="body1" textAlign="center" fontWeight={700}>
                    There was an error loading the resource
                </Typography>
                <Typography variant="subtitle1" textAlign="center">Error: {error}</Typography>
            </CardContent>
        </Grid>
        <Grid item >
            <CardActions >
                <Button >Remove</Button>
            </CardActions>
        </Grid>
    </Grid>
}
