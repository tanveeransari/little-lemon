import salad from "./assets/images/greek salad.jpg";
import bruchetta from "./assets/images/bruchetta.svg";
import lemondessert from "./assets/images/lemon dessert.jpg";
import image1 from "./assets/images/Mario and Adrian A.jpg";
import image2 from "./assets/images/Mario and Adrian b.jpg";
import { Link } from "react-router-dom";

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
                <Link to="/order">Order a delivery 🚗</Link>
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
                <Link to="/order">Order a delivery 🚗</Link>
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
                <Link to="/order">Order a delivery 🚗</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials-header">
            <h3>Testimonials</h3>
          </div>

          <div className="testimonials-grid">
            {/* Card 1 */}
            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <div className="user-profile">
                <img
                  src="https://images.unsplash.com/photo-1762810602195-599ea70234f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ5fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                  alt="User"
                  className="user-img"
                />
                <p className="user-name">Maria S.</p>
              </div>
              <p className="review-text">"Excellent food preparation and great service"</p>
            </div>

            {/* Card 2 */}
            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <div className="user-profile">
                <img
                  src="https://plus.unsplash.com/premium_photo-1762456150958-d0aefc32ce03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzMnx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8"
                  alt="User"
                  className="user-img"
                />
                <p className="user-name">John D.</p>
              </div>
              <p className="review-text">"I like the bruchetta here more than anywhere else."</p>
            </div>

            {/* Card 3 */}
            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <div className="user-profile">
                <img
                  src="https://plus.unsplash.com/premium_photo-1763265293425-f7ad17012b13?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="User"
                  className="user-img"
                />
                <p className="user-name">Anna B.</p>
              </div>
              <p className="review-text">"I love the online ordering system. So easy to use!"</p>
            </div>

            {/* Card 4 */}
            <div className="testimonial-card">
              <div className="rating">⭐⭐⭐⭐⭐</div>
              <div className="user-profile">
                <img
                  src="https://plus.unsplash.com/premium_photo-1763306454161-2587c3791de3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
                  alt="User"
                  className="user-img"
                />
                <p className="user-name">Brandon M.</p>kettlebell
              </div>
              <p className="review-text">"The best Greek Salad in Chicago. Highly recommended."</p>
            </div>
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
              Little Lemon opened in 1995 by two Italian brothers, Adrian and Mario. Despite the city's diversity, the
              two brothers recognized the lack of Mediterranean cuisine in Chicago, and were inspired to bring the
              flavors of their hometown in Italy to the people of Chicago.
            </p>
            <p>The two brothers continue to oversee the Little Lemon restaurant, nearly thirty years later</p>
          </div>
          <div className="about-images">
            <div className="img-box">
              <img src={image1} alt="Mario and Adrian A" />
            </div>
            <div className="img-box">
              <img src={image2} alt="Mario and Adrian B" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Main;
