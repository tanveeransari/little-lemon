import { useState, useEffect } from "react";

function BookingForm({ availableTimes, updateAvailableTimes, onSubmitSuccess, submitting = false }) {
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (availableTimes.length > 0 && !availableTimes.includes(formData.time)) {
      setFormData((prev) => ({ ...prev, time: availableTimes[0] }));
    }
  }, [availableTimes, formData.time]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear any existing error for this field when the user changes it
    if (errors && errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }

    if (name === "date" && updateAvailableTimes) {
      updateAvailableTimes(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Required fields validation
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";

    // Validate date/time not in the past (only if date/time provided)
    if (formData.date && formData.time) {
      const [hour, minute] = formData.time.split(":");
      const selected = new Date(formData.date);
      selected.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
      const now = new Date();
      if (selected < now) {
        newErrors.time = "Selected date and time are in the past. Please choose a future time.";
      }
    }

    // Availability validation
    if (formData.time && !availableTimes.includes(formData.time)) {
      newErrors.time = "Selected time is no longer available. Please choose another.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      setErrors({});
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
    <form className="reservation-form" onSubmit={handleSubmit} aria-label="Table Reservation Form">
      {/* Form-level errors removed; using per-field errors below */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <div id="firstName-error" className="error-message" role="alert" aria-live="assertive">
              {errors.firstName}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <div id="lastName-error" className="error-message" role="alert" aria-live="assertive">
              {errors.lastName}
            </div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div id="email-error" className="error-message" role="alert" aria-live="assertive">
              {errors.email}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <div id="phone-error" className="error-message" role="alert" aria-live="assertive">
              {errors.phone}
            </div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="guests">Number of People *</label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.guests}
            aria-describedby={errors.guests ? "guests-error" : undefined}>
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>
                {n + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Select Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && (
            <div id="date-error" className="error-message" role="alert" aria-live="assertive">
              {errors.date}
            </div>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="time">Select Time *</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? "time-error" : undefined}>
            {availableTimes.map((slot) => (
              <option key={slot} value={slot}>
                {formatDisplayTime(slot)}
              </option>
            ))}
          </select>
          {errors.time && (
            <div id="time-error" className="error-message" role="alert" aria-live="assertive">
              {errors.time}
            </div>
          )}
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
          aria-describedby={errors.comments ? "comments-error" : undefined}
          aria-invalid={!!errors.comments}
        />
        {errors.comments && (
          <div id="comments-error" className="error-message" role="alert" aria-live="assertive">
            {errors.comments}
          </div>
        )}
      </div>

      <p className="disclaimer">
        Note: You cannot edit your reservation after submission. Please double-check everything.
      </p>

      <button
        type="submit"
        className="btn-submit"
        disabled={submitting}
        aria-label={submitting ? "Submitting reservation" : "Book Table now"}>
        {submitting ? "Submitting..." : "Book Table"}
      </button>
    </form>
  );
}

export default BookingForm;
