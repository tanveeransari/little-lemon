import salad from "./assets/images/greek salad.jpg";
import bruchetta from "./assets/images/bruchetta.svg";
import lemondessert from "./assets/images/lemon dessert.jpg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Main() {
  return (
    <main>
      {/* Highlights / Specials Section */}
      <section className="highlights">
        <div className="container">
          <div className="highlights-header">
            <h3>This weeks specials!</h3>
            <button>Online Menu</button>
          </div>
          <div className="cards-grid">
            {/* Card 1 */}
            <article className="card">
              <img src={salad} alt="Greek Salad" className="card-img" />
              <div className="card-content">
                <div className="card-header">
                  <h4>Greek Salad</h4>
                  <span>$12.99</span>
                </div>
                <p>
                  The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished
                  with crunchy garlic and rosemary croutons.
                </p>
                <a href="/order">Order a delivery 🚗</a>
              </div>
            </article>

            {/* Card 2 */}
            <article className="card">
              <img src={bruchetta} alt="Bruschetta" className="card-img" />
              <div className="card-content">
                <div className="card-header">
                  <h4>Bruschetta</h4>
                  <span>$5.99</span>
                </div>
                <p>
                  Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and
                  olive oil.
                </p>
                <a href="/order">Order a delivery 🚗</a>
              </div>
            </article>

            {/* Card 3 */}
            <article className="card">
              <img src={lemondessert} alt="Lemon Dessert" className="card-img" />
              <div className="card-content">
                <div className="card-header">
                  <h4>Lemon Dessert</h4>
                  <span>$5.00</span>
                </div>
                <p>
                  This comes straight from grandma's recipe book, every last ingredient has been sourced and is as
                  authentic as can be imagined.
                </p>
                <a href="/order">Order a delivery 🚗</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h3>Testimonials</h3>
          <div className="testimonials-grid">
            {/* Repeat this block 4 times */}
            {[1, 2, 3, 4].map((item) => (
              <div className="testimonial-card" key={item}>
                <p>Rating: ⭐⭐⭐⭐⭐</p>
                <div className="user-profile">
                  <div className="user-img"></div>
                  <p>User Name</p>
                </div>
                <p>Review text regarding the food and service.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container about-container">
          <div className="about-text">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
              enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
              enim velit mollit.
            </p>
          </div>
          <div className="about-images">
            <div className="img-box"></div>
            <div className="img-box overlay"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Main;
