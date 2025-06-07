import Home from "./home.jsx";
import Nav from "./nav_bar/Nav.jsx";
import BusLines from "./BusLines.jsx";
import BusStop from "./BusStop.jsx"; 
import "./index.css";
import {Routes,Route,useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  let location = useLocation();
  let navigate = useNavigate();
  let [inputData,setInputData] = useState(null);// tight value for init
  
  //after refreshing,it will go to home page again
  useEffect(() => {
    if(location.pathname !== "/"){
      navigate("/");
    }
  },[])
  //this is like a blaster it shoots twice one is data and one is empty
  //as soon as data arrive and show in somewhere and it dispears
  //i don't know how i was thinking 
  useEffect(() => {
    setInputData(null);
    console.log("mainApp state : ",inputData);
    
  }, [inputData]);
  //just to see location change not necessary i guess but cool XD
  useEffect(()=> {
    console.log("change location")},[location.pathname])
    //should move to component level later
    function PageLoader() {
    
    return (<>
      <Routes>
        <Route path="/" element={<Home page={location.pathname}/>}/>
        <Route path="/buslines" element={<BusLines input_data={inputData} update_inputData={setInputData}/>}/>
        <Route path="/busstop" element={<BusStop input_data={inputData} update_inputData={setInputData}/>}/>
        <Route path="/about" element={<div><h1>Coming soon</h1></div>}/>
      </Routes>   
    </>)
  }
      
  return (
    <>
      <Nav input_data={setInputData} page={location.pathname}/>
      <div className="page-context">
      {PageLoader()}
      </div>
    </>
  );
}
export default App;