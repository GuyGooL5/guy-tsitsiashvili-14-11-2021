import { useMemo } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { reduxStore, useReduxSelector } from "./redux/store";
import AppRouter from "./router";
import { getTheme } from "./utils/functions";
import { SnackbarContextProvider } from "./hooks/useSnackbar";

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
      <AppRouter />
    </SnackbarContextProvider>
  </ThemeProvider>
}

export default App;
