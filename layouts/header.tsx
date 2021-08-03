import { Cart } from "../components";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <Link href="/">
            <a className="icon-logo header__logo" />
          </Link>

          <Cart />
        </div>

        <hr className="divider" />
      </div>
    </header>
  );
};

export default Header;
