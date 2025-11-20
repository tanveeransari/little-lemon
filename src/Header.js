import hero from "./assets/images/restauranfood.jpg";
import { Link } from "react-router-dom"; // using Link for reservations

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
          <Link to="/booking">
            <button aria-label="Reserve a Table">Reserve a Table</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Restaurant Food" className="hero-img" />
        </div>
      </div>
    </header>
  );
};
export default Header;
