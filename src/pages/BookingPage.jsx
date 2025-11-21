import { useState } from "react";
import BookingForm from "../components/BookingForm"; // adjust path as needed

function BookingPage({ availableTimes, dispatch }) {
  const [sent, setSent] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);

  const handleSuccess = (data, resetForm) => {
    console.log("Reservation submitted:", data);
    setConfirmedData(data);
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setConfirmedData(null);
      resetForm(); // reset only the form fields, not availableTimes
      document.location.href = "/";
    }, 5000);
  };

  const updateAvailableTimes = (date) => {
    if (typeof date === "string") {
      dispatch({ type: "UPDATE_BY_DATE", payload: date });
    }
  };
  return (
    <main className="reservations-page">
      <div className="container">
        <section className="reservations-section">
          <h1>Reserve a table</h1>

          {sent && confirmedData ? (
            <div className="success-message">
              <h2>✓ Reservation Confirmed!</h2>
              <p>Thank you for your reservation at Little Lemon.</p>
              <div className="confirmation-details">
                <p>
                  <strong>Name:</strong> {confirmedData.firstName} {confirmedData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {confirmedData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {confirmedData.phone}
                </p>
                <p>
                  <strong>Date:</strong> {confirmedData.date}
                </p>
                <p>
                  <strong>Time:</strong> {formatTwelveHour(confirmedData.time)}
                </p>
                <p>
                  <strong>Guests:</strong> {confirmedData.guests}
                </p>
                <p>
                  <strong>Occasion:</strong> {confirmedData.occasion}
                </p>
              </div>
              <p className="redirect-message">Redirecting in 5 seconds...</p>
            </div>
          ) : (
            <BookingForm
              availableTimes={availableTimes}
              updateAvailableTimes={updateAvailableTimes} // optional now, required later
              onSubmitSuccess={handleSuccess}
            />
          )}
        </section>
      </div>
    </main>
  );
}
// Helper for nice 12-hour display in confirmation
const formatTwelveHour = (time24) => {
  const [h, m] = time24.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${m} ${ampm}`;
};

export default BookingPage;
