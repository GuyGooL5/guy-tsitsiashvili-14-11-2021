import { Done, Edit } from '@mui/icons-material';
import { Button, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { useReduxSelector } from '../../redux/store';
import FavoriteCard from './FavoriteCard';
import { withNavbar } from '../Navbar';

function FavoritesPage() {

    const [editMode, setEditMode] = useState(false);

    const { favorites } = useReduxSelector(s => s.favorites);


    return <Container maxWidth="xl" sx={{ my: 2 }}>
        <Button sx={{ my: 2 }} startIcon={editMode ? <Done /> : <Edit />}
            onClick={() => setEditMode(!editMode)}>
            {editMode ? "Done" : "Edit"}
        </Button>
        <Grid container flexDirection="row" justifyContent="flex-start" spacing={2}>
            {Object.entries(favorites).map(([key, value]) =>
                <Grid item sm={12} md={6} lg={4} xl={3} key={key} flexGrow={1}>
                    <FavoriteCard key={key} data={value} editMode={editMode} />
                </Grid>
            )}
        </Grid>
    </Container >
}

export default withNavbar(FavoritesPage, { title: "Favorites" });