import styled, { ThemeProvider } from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Theme from "../utils/theme";
import { PortionsProvider } from "../utils/context/PortionContext";
import { RecipieProvider } from "../utils/context/RecipieContext";
import { ListProvider } from "../utils/context/ListContext";
import NavHeader from "../components/Header";
import Head from "next/head";
import { CartProvider } from "../utils/context/CartContext";

const Layout = styled.div`
  min-height: 100vh;
`;

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
      </Head>
      <ThemeProvider theme={Theme}>
        <CartProvider>
          <ListProvider>
            <RecipieProvider>
              <PortionsProvider>
                <Layout className="h-100">
                  <NavHeader />
                  <div className="w-100 h-100 container">
                    <Component {...pageProps} />
                  </div>
                </Layout>
              </PortionsProvider>
            </RecipieProvider>
          </ListProvider>
        </CartProvider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
