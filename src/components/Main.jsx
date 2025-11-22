import { useReducer, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import Body from "../Body";
import BookingPage from "../pages/BookingPage";
import { initializeTimes, updateTimes as reducerUpdateTimes } from "../utils/timeUtils";

function Main() {
  // Use an explicit date for initialization so behavior is deterministic
  const today = new Date();
  const [availableTimes, dispatch] = useReducer(reducerUpdateTimes, initializeTimes(today));

  // Handler to update times for a given date. Prefers the global `fetchAPI` when available,
  // otherwise falls back to the reducer's deterministic filtering logic.
  const updateTimes = (date) => {
    const dateObj = date instanceof Date ? date : typeof date === "string" ? new Date(date) : null;
    if (!dateObj) return;

    try {
      if (typeof window !== "undefined" && typeof window.fetchAPI === "function") {
        const times = window.fetchAPI(dateObj);
        if (Array.isArray(times) && times.length) {
          dispatch({ type: "SET_TIMES", payload: times });
          return;
        }
      }
    } catch (e) {
      console.warn("fetchAPI not available, falling back to default time generation.");
    }
    console.log("UPDATE_BY_DATE action for date:", dateObj);
    dispatch({ type: "UPDATE_BY_DATE", payload: dateObj });
  };

  useEffect(() => {
    updateTimes(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          element={<BookingPage availableTimes={availableTimes} updateAvailableTimes={updateTimes} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default Main;
