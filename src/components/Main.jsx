import { Routes, Route } from "react-router-dom";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import Body from "../Body";
import BookingPage from "../pages/BookingPage";

function Main() {
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
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Main;
