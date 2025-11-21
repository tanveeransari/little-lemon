import { useState, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import Body from "../Body";
import BookingPage from "../pages/BookingPage";

function Main() {
  const generateTimes = (startHour, endHour, stepMinutes) => {
    const times = [];
    for (let h = startHour; h <= endHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        if (h === endHour && m > 0) break; // stop before 22:15, 22:30 etc.
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        times.push(`${hh}:${mm}`);
      }
    }
    return times;
  };
  const initializeTimes = () => {
    return generateTimes(17, 22, 15); // 5:00 PM to 10:00 PM every 15 mins
  };
  const [availableTimes, setAvailableTimes] = useState(initializeTimes());

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Body />
            </>
          }
        />
        <Route
          path="/booking"
          element={<BookingPage availableTimes={availableTimes} setAvailableTimes={setAvailableTimes} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default Main;
