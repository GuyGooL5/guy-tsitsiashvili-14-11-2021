import { Route, Routes } from "react-router";
import ForecastSummary from "../components/HomePage/ForecastSummary";
import HomePage from "../components/HomePage/HomePage";
import ForecastRoute from "./ForecastRoute";

function HomeRoute() {
    return <><HomePage />
        <Routes>
            <Route path="forecast/:id" element={<ForecastRoute />} />
            {/* //TODO: ADD default endpoint. */}
            <Route path="*" element={<ForecastSummary id={"215854"} />} />
        </Routes>
    </>

}


export default HomeRoute;
