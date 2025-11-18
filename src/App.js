import { Fragment } from "react/jsx-runtime";
import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Main from "./Main";

function App() {
  return (
    <Fragment className="App">
      <Header />
      <Nav />
      <Main />
      <Footer />
    </Fragment>
  );
}

export default App;
