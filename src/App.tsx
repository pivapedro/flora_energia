import { ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { Home } from "./pages";
import store from "./store";
import { GlobalStyles } from "./theme/globalStyle";
import { theme } from "./theme/materialUI";
function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
