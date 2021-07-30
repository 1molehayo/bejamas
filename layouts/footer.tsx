const Footer = () => {
  const getYear = (): Number => {
    return new Date().getFullYear();
  };

  return (
    <footer className="footer">
      <div className="container footer__container">
        <p className="footer__text copyright">
          © {getYear()} Bejamas.io - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
