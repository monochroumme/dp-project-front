import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import { queryClient } from "@/config/configure-react-query";
import store from "@/store";

import { Routes } from "./routes";
import { GlobalFunctionality } from "./global-functionality";
import "./styles.less";

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ cssVar: true }}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <GlobalFunctionality />
            <Routes />
          </BrowserRouter>
        </SnackbarProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
