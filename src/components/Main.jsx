import { useReducer, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import Body from "../Body";
import BookingPage from "../pages/BookingPage";
import ConfirmedBooking from "../pages/ConfirmedBooking";
import { initializeTimes, updateTimes as reducerUpdateTimes } from "../utils/timeUtils";

function Main() {
  const today = new Date();
  const [availableTimes, dispatch] = useReducer(reducerUpdateTimes, initializeTimes(today));

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

  const navigate = useNavigate();

  useEffect(() => {
    updateTimes(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = async (formData) => {
    try {
      if (typeof window !== "undefined" && typeof window.submitAPI === "function") {
        const result = await Promise.resolve(window.submitAPI(formData));
        return result === true;
      }
      return true;
    } catch (e) {
      console.warn("submitAPI failed", e);
      return false;
    }
  };

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
          element={
            <BookingPage
              availableTimes={availableTimes}
              updateAvailableTimes={updateTimes}
              submitForm={submitForm}
              navigate={navigate}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Main;
