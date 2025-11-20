import { Fragment } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Main from "./Main";
import Reservations from "./pages/Reservations";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
            </>
          }
        />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
