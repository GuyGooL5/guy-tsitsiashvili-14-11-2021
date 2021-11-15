import { Container, Grid } from '@mui/material'
import React from 'react'
import AutocompleteSearchbar from './AutocompleteSearchbar'
import { withNavbar } from '../Navbar'

function HomePage() {
    return <Container maxWidth="lg">
        <Grid container flexDirection="column">
            <Grid item>
                <AutocompleteSearchbar />
            </Grid>
        </Grid>
    </Container>
}

export default withNavbar(HomePage, { title: "Herolo Weather App" })
