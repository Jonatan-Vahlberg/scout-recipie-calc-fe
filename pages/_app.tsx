import { ThemeProvider } from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Theme from "../utils/theme";
import { PortionsProvider } from "../utils/context/PortionContext";
import { RecipieProvider } from "../utils/context/RecipieContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <RecipieProvider>
        <PortionsProvider>
          <Component {...pageProps} />
        </PortionsProvider>
      </RecipieProvider>
    </ThemeProvider>
  );
}

export default MyApp;
