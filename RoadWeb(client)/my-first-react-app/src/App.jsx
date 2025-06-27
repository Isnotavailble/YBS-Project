import Home from "./home.jsx";
import Nav from "./nav_bar/Nav.jsx";
import BusLines from "./BusLines.jsx";
import BusStop from "./BusStop.jsx";
import About from "./about.jsx";
import "./index.css";
import { ContextData } from "./ContextData/ContextData.jsx";
import { Routes, Route,  useNavigate, useLocation } from "react-router-dom";
import { useEffect,useContext } from "react";
function App() {
  let navigate = useNavigate();
  let location = useLocation();
  let {inputData} = useContext(ContextData);
  //after refreshing,it will go to home page again
  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log("mainApp state : ", inputData);
  }, [inputData]);

  //should move to component level later
  function PageLoader() {

    return (<>
      <Routes>
        <Route path="/" element={<Home page={location.pathname} />} />
        <Route path="/buslines" element={<BusLines />} />
        <Route path="/busstop" element={<BusStop/>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>)
  }

  return (
    <>
      <Nav page={location.pathname} />
      <div className="page-context">
        {PageLoader()}
      </div>
    </>
  );
}
export default App;