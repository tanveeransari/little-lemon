import logo from "./assets/images/Logo.svg";

function Footer() {
  return (
    <footer>
      <div className="container footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Little Lemon" />
        </div>
        <div className="footer-column">
          <h4>Doormat Navigation</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/menu">Menu</a>
            </li>
            <li>
              <a href="/reservations">Reservations</a>
            </li>
            <li>
              <a href="/order-online">Order Online</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li>2548 Maldove Way, Chicago IL</li>
            <li>(629)-243-6827</li>
            <li>info@littlelemon.com</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Social Media Links</h4>
          <ul>
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Instagram</a>
            </li>
            <li>
              <a href="/">Twitter</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
