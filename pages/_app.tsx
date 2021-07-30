import "../styles/main.scss";
import type { AppProps } from "next/app";
import Layout from "../layouts";
import { AppProvider } from "../contexts/appContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Layout>
  );
}
export default MyApp;
