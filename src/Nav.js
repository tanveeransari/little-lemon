import logo from "./assets/images/Logo.svg";

function Nav() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="/" className="nav-logo">
          {/* If you don't have the SVG file yet, just use text "Little Lemon" */}
          <img src={logo} alt="Little Lemon" />
        </a>
        <ul className="nav-links">
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
    </nav>
  );
}
export default Nav;
