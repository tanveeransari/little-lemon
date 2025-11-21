import { useState, useEffect } from "react";

function BookingForm({ availableTimes, updateAvailableTimes, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "1",
    date: "",
    time: availableTimes[0] || "", // will be set properly on mount
    occasion: "None",
    dietpref: "No Preference",
    seating: "Standard",
    comments: "",
  });

  // Sync default time when availableTimes change (e.g. date changes later)
  useEffect(() => {
    if (availableTimes.length > 0 && !availableTimes.includes(formData.time)) {
      setFormData((prev) => ({ ...prev, time: availableTimes[0] }));
    }
  }, [availableTimes, formData.time]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // When date changes → trigger parent to possibly update times
    if (name === "date" && updateAvailableTimes) {
      updateAvailableTimes(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    if (!availableTimes.includes(formData.time)) {
      alert("Selected time is no longer available. Please choose another.");
      return;
    }

    const resetForm = () => {
      setFormData((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        date: "",
        time: availableTimes[0] || "",
        comments: "",
      }));
    };

    onSubmitSuccess(formData, resetForm);
  };

  const formatDisplayTime = (time24) => {
    const [h, m] = time24.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${m} ${ampm}`;
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      {/* All your existing form rows – only changes are using props/state from above */}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
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
          <label htmlFor="lastName">Last Name *</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
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
          <label htmlFor="guests">Number of People *</label>
          <select id="guests" name="guests" value={formData.guests} onChange={handleChange} required>
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>
                {n + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Select Date *</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="time">Select Time *</label>
          <select id="time" name="time" value={formData.time} onChange={handleChange} required>
            {availableTimes.map((slot) => (
              <option key={slot} value={slot}>
                {formatDisplayTime(slot)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
            <option value="None">None</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Engagement">Engagement</option>
            <option value="Business Meeting">Business Meeting</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

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
          rows="4"
          placeholder="Let us know about any dietary restrictions, special occasions, or preferences"
        />
      </div>

      <p className="disclaimer">
        Note: You cannot edit your reservation after submission. Please double-check everything.
      </p>

      <button type="submit" className="btn-submit">
        Book Table
      </button>
    </form>
  );
}

export default BookingForm;
