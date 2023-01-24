import React from "react";
import { Provider } from "react-redux";
import { Header } from "./components/Header";
import store from "./store";
import { GlobalStyles } from "./theme/globalStyle";
function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Header />
    </Provider>
  );
}

export default App;
