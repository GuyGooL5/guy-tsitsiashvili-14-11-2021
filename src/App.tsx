import { Provider } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { reduxStore, useReduxDispatch, useReduxSelector } from "./redux/store";
import AppRouter from "./router";
import { getTheme } from "./utils/functions";
import useSnackbar, { SnackbarContextProvider } from "./hooks/useSnackbar";
import getGeolocationData from "./actions/getGeolocationData";
import { useEffect } from "react";

function App() {
  return <Provider store={reduxStore}>
    <DarkModeApp />
  </Provider>

}

function DarkModeApp() {
  const configuration = useReduxSelector(s => s.configuration);
  const theme = createTheme({ palette: { mode: getTheme(configuration.theme), } })


  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarContextProvider>
      {navigator.geolocation ? <GeolocationEnabledApp />: <AppRouter />}
    </SnackbarContextProvider>
  </ThemeProvider>
}


function GeolocationEnabledApp() {


  const { snackbar } = useSnackbar();
  const dispatch = useReduxDispatch();
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      const { latitude, longitude } = data.coords;
      getGeolocationData(latitude, longitude)(dispatch);
    }, () => snackbar("Can't get your location, please enable geolocation access"));
  }, [])

  return <AppRouter />
}


export default App;
