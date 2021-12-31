import { ThemeProvider } from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Theme from "../utils/theme";
import { PortionsProvider } from "../utils/context/PortionContext";
import { RecipieProvider } from "../utils/context/RecipieContext";
import NavHeader from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <RecipieProvider>
        <PortionsProvider>
          <div>
            <NavHeader />
            <div className="container">
              <Component {...pageProps} />
            </div>
          </div>
        </PortionsProvider>
      </RecipieProvider>
    </ThemeProvider>
  );
}

export default MyApp;
