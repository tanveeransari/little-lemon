import { useState } from "react";

function Reservations() {
  // Generate times between startHour and endHour with step in minutes
  const generateTimes = (startHour, endHour, stepMinutes) => {
    const times = [];
    for (let h = startHour; h <= endHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        const totalMinutes = h * 60 + m;
        // Allow the exact end hour (22:00) but stop after that
        if (totalMinutes > endHour * 60) break;

        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        times.push(`${hh}:${mm}`);
      }
    }
    return times;
  };

  // Available reservation times (5 PM – 10 PM, every 15 minutes)
  const [availableTimes, setAvailableTimes] = useState(() => generateTimes(17, 22, 15));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "1",
    date: "",
    time: availableTimes.length ? availableTimes[0] : "", // default to first slot
    occasion: "Birthday",
    dietpref: "No Preference",
    seating: "Standard",
    comments: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic required field validation
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

    // Ensure selected time is still one of the allowed slots
    if (!availableTimes.includes(formData.time)) {
      alert("Please select a valid reservation time.");
      return;
    }
    // TODO: Replace this with actual submission logic
    console.log("Reservation submitted:", formData);
    setSent(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        guests: "1",
        date: "",
        time: availableTimes.length ? availableTimes[0] : "",
        occasion: "Birthday",
        dietpref: "No Preference",
        seating: "Standard",
        comments: "",
      });
      setSent(false);
    }, 3000);
  };

  return (
    <main className="reservations-page">
      <div className="container">
        <section className="reservations-section">
          <h1>Reserve a table</h1>

          {sent ? (
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
                  <strong>Time:</strong>{" "}
                  {formData.time ? `${formData.time.replace(/:\d{2}$/, (m) => (m + "0" === m ? "" : m))}` : ""}
                  {/* Simple formatting – you could also map 24h → 12h here if desired */}
                  {formData.time}
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
              {/* ... other fields unchanged ... */}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guests">Number of People</label>
                  <select id="guests" name="guests" value={formData.guests} onChange={handleChange} required>
                    {[...Array(10).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Select Date</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
              </div>

              {/* ==== TIME SELECT REPLACES INPUT TYPE=TIME ==== */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="time">Select Time</label>
                  <select id="time" name="time" value={formData.time} onChange={handleChange} required>
                    {availableTimes.map((slot) => {
                      // Optional: convert 24h → 12h with AM/PM for better UX
                      const [h, m] = slot.split(":");
                      const hour = parseInt(h);
                      const ampm = hour >= 12 ? "PM" : "AM";
                      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                      const displayTime = `${displayHour}:${m} ${ampm}`;

                      return (
                        <option key={slot} value={slot}>
                          {displayTime}
                        </option>
                      );
                    })}
                  </select>
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

              {/* ... rest of the form unchanged ... */}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="seating">Seating Preferences</label>
                  <select id="seating" name="seating" value={formData.seating} onChange={handleChange}>
                    <option value="Standard">Standard</option>
                    <option value="Window">Window Seating</option>
                    <option value="Patio">Patio</option>
                    <option value="Bar">Bar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dietpref">Dietary Preferences</label>
                  <select id="dietpref" name="dietpref" value={formData.dietpref} onChange={handleChange}>
                    <option value="No Preference">No Preference</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Halal">Halal</option>
                    <option value="Kosher">Kosher</option>
                  </select>
                </div>
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
