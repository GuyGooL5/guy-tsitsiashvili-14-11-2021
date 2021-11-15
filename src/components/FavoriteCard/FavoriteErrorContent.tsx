import { Button, CardActions, CardContent, Grid, Typography } from '@mui/material'
import FavoriteCardHeader from './FavoriteCardHeader';

interface FavoriteErrorContentProps {
    error: string;
    onRemove: () => void;
}

export default function FavoriteErrorContent({ error, onRemove }: FavoriteErrorContentProps) {

    return <>
        <CardContent  >
            <Typography variant="body1" textAlign="center" fontWeight={700}>
                There was an error loading the resource
            </Typography>
            <Typography variant="subtitle1" textAlign="center">Error: {error}</Typography>
        </CardContent>
        <CardActions >
            <Button onClick={onRemove} >Remove</Button>
        </CardActions>
    </>
}
