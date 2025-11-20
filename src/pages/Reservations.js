import { useState } from "react";

function Reservations() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "1",
    date: "",
    time: "",
    occasion: "Birthday",
    seating: "Standard",
    comments: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Log submission (in a real app, you'd send this to a backend)
    console.log("Reservation submitted:", formData);

    // Show success message
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        guests: "1",
        date: "",
        time: "",
        occasion: "Birthday",
        seating: "Standard",
        comments: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="reservations-page">
      <div className="container">
        <section className="reservations-section">
          <h1>Reserve a table</h1>

          {submitted ? (
            <div className="success-message">
              <h2>✓ Reservation Confirmed!</h2>
              <p>Thank you for your reservation at Little Lemon.</p>
              <div className="confirmation-details">
                <p>
                  <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Date:</strong> {formData.date}
                </p>
                <p>
                  <strong>Time:</strong> {formData.time}
                </p>
                <p>
                  <strong>Guests:</strong> {formData.guests}
                </p>
                <p>
                  <strong>Occasion:</strong> {formData.occasion}
                </p>
              </div>
              <p className="redirect-message">Redirecting in 3 seconds...</p>
            </div>
          ) : (
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guests">Number of People</label>
                  <select id="guests" name="guests" value={formData.guests} onChange={handleChange} required>
                    {[...Array(20).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="date">Select Date</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="time">Select Time</label>
                  <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="occasion">Occasion</label>
                  <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Business Meeting">Business Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="seating">Seating Preferences</label>
                <select id="seating" name="seating" value={formData.seating} onChange={handleChange}>
                  <option value="Standard">Standard</option>
                  <option value="Window">Window Seating</option>
                  <option value="Patio">Patio</option>
                  <option value="Bar">Bar</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="comments">Additional Comments</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Let us know about any dietary restrictions, special occasions, or preferences"
                  rows="4"
                />
              </div>

              <p className="disclaimer">
                Note: You cannot edit your reservation after submission. Please double-check your answer before
                submitting your reservation request.
              </p>

              <button type="submit" className="btn-submit">
                Book Table
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

export default Reservations;
