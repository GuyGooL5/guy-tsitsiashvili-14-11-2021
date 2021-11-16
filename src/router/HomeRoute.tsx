import { Grid } from "@mui/material";
import { Route, Routes } from "react-router";
import AutocompleteSearchbar from "../components/AutocompleteSearchbar";
import ForecastSummary from "../components/ForecastSummary";
import { withNavbar } from "../components/Navbar";
import { useReduxSelector } from "../redux/store";
import ForecastRoute from "./ForecastRoute";

function HomeRoute() {

    const { default_location } = useReduxSelector(s => s.configuration);

    return <Grid container direction="row" spacing={2} sx={{ p: 2 }} justifyContent="center" >
        <Grid item xs alignSelf="center" maxWidth={500} >
            <AutocompleteSearchbar />
        </Grid>
        <Grid item xs={12} justifyContent="center">

            <Routes>
                <Route path="forecast/:id" element={<ForecastRoute />} />
                {/* //TODO: ADD default endpoint. */}
                <Route path="*" element={<ForecastSummary id={default_location.Key} />} />
            </Routes>
        </Grid>
    </Grid>

}

export default withNavbar(HomeRoute, { title: "Herolo Weather App" });