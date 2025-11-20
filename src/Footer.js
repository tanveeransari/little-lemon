import logo from "./assets/images/Logo.svg";
import { Link } from "react-router-dom"; // Optional if using React Router

function Footer() {
  return (
    <footer>
      <div className="container footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Little Lemon" />
        </div>
        <div className="footer-column">
          <h4>&nbsp;</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/booking">Reservations</Link>
            </li>
            <li>
              <Link to="/order-online">Order Online</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
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
