import { ReactChild, ReactChildren } from "react";
import classnames from "classnames";
import Footer from "./footer";
import Header from "./header";
import Head from "next/head";
import { useAppContext } from "../contexts/appContext";

interface LayoutProps {
  children: ReactChild | ReactChildren;
}

export default function Layout({ children }: LayoutProps) {
  const { openFilter } = useAppContext();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main
        className={classnames("page__body", { "page--backdrop": openFilter })}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
