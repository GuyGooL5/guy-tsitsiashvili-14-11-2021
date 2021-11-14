import { useMemo } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";

import { reduxStore, useReduxSelector } from "./redux/store";
import AppRouter from "./router";
import { getTheme } from "./utils/functions";

function App() {


  return <div>
    <Provider store={reduxStore}>
      <DarkModeApp />
    </Provider>
  </div>

}

function DarkModeApp() {
  const configuration = useReduxSelector(s => s.configuration);

  const themeMode = useMemo(() => getTheme(configuration.theme), [configuration.theme])
  const theme = createTheme({
    palette: { mode: themeMode }
  })
  return <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
}

export default App;
