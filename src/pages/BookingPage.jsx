import BookingForm from "../components/BookingForm"; // adjust path as needed
import { useState } from "react";

function BookingPage({ availableTimes, updateAvailableTimes, submitForm, navigate }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSuccess = async (data, resetForm) => {
    console.log("Reservation submitted (attempting API submit):", data);
    setError(null);
    setSubmitting(true);
    try {
      const result = await Promise.resolve(submitForm ? submitForm(data) : true);
      setSubmitting(false);
      if (result === true) {
        resetForm && resetForm();
        if (typeof navigate === "function") {
          navigate("/confirmed", { state: data });
        } else if (typeof window !== "undefined") {
          window.location.href = "/confirmed";
        }
      } else {
        setError("Failed to submit reservation. Please try again.");
      }
    } catch (e) {
      console.error("Error submitting reservation:", e);
      setSubmitting(false);
      setError("An error occurred when submitting the reservation. Please try again.");
    }
  };

  return (
    <main className="reservations-page">
      <div className="container">
        <section className="reservations-section">
          <h1>Reserve a table</h1>

          <BookingForm
            availableTimes={availableTimes}
            updateAvailableTimes={updateAvailableTimes} // optional now, required later
            onSubmitSuccess={handleSuccess}
            submitting={submitting}
          />
          {error && <p className="error-message">{error}</p>}
        </section>
      </div>
    </main>
  );
}
export default BookingPage;
