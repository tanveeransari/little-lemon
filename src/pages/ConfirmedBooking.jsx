import { useLocation, Link } from "react-router-dom";

function ConfirmedBooking() {
  const { state } = useLocation();
  const data = state || null;

  if (!data) {
    return (
      <main className="reservations-page">
        <div className="container">
          <section className="reservations-section">
            <h1>Reservation Confirmed</h1>
            <p>No reservation data found. If you just booked, please return to the booking page.</p>
            <Link to="/">Return Home</Link>
          </section>
        </div>
      </main>
    );
  }

  const formatTwelveHour = (time24) => {
    const [h, m] = time24.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${m} ${ampm}`;
  };

  return (
    <main className="reservations-page">
      <div className="container">
        <section className="reservations-section">
          <div className="success-message">
            <h2>✓ Reservation Confirmed!</h2>
            <p>Thank you for your reservation at Little Lemon.</p>
            <div className="confirmation-details">
              <p>
                <strong>Name:</strong> {data.firstName} {data.lastName}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>
              <p>
                <strong>Date:</strong> {data.date}
              </p>
              <p>
                <strong>Time:</strong> {formatTwelveHour(data.time)}
              </p>
              <p>
                <strong>Guests:</strong> {data.guests}
              </p>
              <p>
                <strong>Occasion:</strong> {data.occasion}
              </p>
            </div>
            <p className="redirect-message">You can return to the home page when ready.</p>
            <Link to="/">Return Home</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ConfirmedBooking;
