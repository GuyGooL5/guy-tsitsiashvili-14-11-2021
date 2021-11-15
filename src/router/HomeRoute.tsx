import { Outlet } from "react-router";
import HomePage from "../components/HomePage/HomePage";

function HomeRoute() {
    return <><HomePage />
        <Outlet />
    </>

}


export default HomeRoute;
