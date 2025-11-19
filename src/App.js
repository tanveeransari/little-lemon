import { Fragment } from "react/jsx-runtime";
import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Main from "./Main";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Nav />
      <Header />
      <Main />
      <Footer />
    </Fragment>
  );
}

export default App;
