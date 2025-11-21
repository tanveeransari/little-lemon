import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import Body from "../Body";
import BookingPage from "../pages/BookingPage";
import { initializeTimes, updateTimes } from "../utils/timeUtils";

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

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
        <Route path="/booking" element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Main;
