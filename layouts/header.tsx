import Cart from "../components/cart";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Link href="/">
          <a className="icon-logo header__logo" />
        </Link>

        <Cart />
      </div>

      <div className="container">
        <hr className="divider" />
      </div>
    </header>
  );
};

export default Header;
