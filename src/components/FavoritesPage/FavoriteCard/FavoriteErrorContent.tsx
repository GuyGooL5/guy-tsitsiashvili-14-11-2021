import { Button, CardActions, CardContent, Typography } from '@mui/material'
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
            <Typography variant="subtitle1" textAlign="center">{error}</Typography>
        </CardContent>
        <CardActions >
            <Button onClick={onRemove} color="error" >Remove</Button>
        </CardActions>
    </>
}
