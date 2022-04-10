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
import { QueryClient, QueryClientProvider } from "react-query";
import { DrawerProvider } from "../utils/context/DrawerContext";
import { UserProvider } from "../utils/context/UserContext";

const Layout = styled.div`
  min-height: 100vh;
`;

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={Theme}>
          <UserProvider>

          <DrawerProvider>
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
          </DrawerProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
