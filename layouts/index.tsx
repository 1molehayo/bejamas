import { ReactChild, ReactChildren } from "react";
import classnames from "classnames";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: ReactChild | ReactChildren;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={classnames("page__body")}>{children}</main>
      <Footer />
    </>
  );
}
