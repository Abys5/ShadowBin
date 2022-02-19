import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MantineProvider } from "@mantine/core";

ReactDOM.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles theme={{ colorScheme: "dark" }}>
            <App />
        </MantineProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
