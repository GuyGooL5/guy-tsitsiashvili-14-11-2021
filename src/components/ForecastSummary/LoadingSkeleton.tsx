import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";

export default function LoadingSkeleton() {
    return <Card sx={{ flexGrow: 1 }}>
        <CardActions />
        <Skeleton width="100%" height={165} />
        <CardContent>
            <div style={{ height: 250 }} />
            <Grid container spacing={2} justifyContent="space-around">
                {Array(5).fill(null).map((v, i) => <Grid item xs key={i}>
                    <Skeleton height={250} sx={{ minWidth: 180, p: 1 }} />
                </Grid>)}
            </Grid>
        </CardContent>
    </Card>
}
