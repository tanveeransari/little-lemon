import hero from "./assets/images/restauranfood.jpg";
import burger from "./assets/images/🦆 icon _hamburger menu.svg";
import { Link } from "react-router-dom"; // Optional if using React Router

const Header = () => {
  return (
    <header className="hero-section">
      <div className="container hero-container">
        <div className="hero-text">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          <button aria-label="Reserve a Table">Reserve a Table</button>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Restaurant Food" className="hero-img" />
          {/* <Link to="/reservations"> */}

          {/* </Link> */}
        </div>
      </div>
    </header>
  );
};
export default Header;
