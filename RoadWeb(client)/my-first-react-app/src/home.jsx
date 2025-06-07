
import PopLo from "./popular-lo/PopLo.jsx";
import photo from "./assets/w.jpg"
import "./home.css";
import { Link } from "react-router-dom";
function Home(props) {
    return (<div>
        <div className="h-container">
            <div className="img-container">
                <img src={photo}></img>

            </div>
            <p>
                <span id="q">Want to hang out and don't know how to YBS? we got you back!</span>

                YBS Route is a user-friendly mobile application designed to provide a comprehensive guide to bus lines in Yangon.
                Whether you're a daily commuter or a first-time visitor,
                the app helps you easily navigate the city's public transportation system.
                With detailed route maps, bus numbers, stop locations, and estimated travel times,
                YBS Route ensures users can find the most efficient path to their destination.
                Its intuitive interface makes it simple to search for routes,
                plan trips, and avoid confusion on the go. By streamlining access to bus line information,
                YBS Route supports a smoother, more convenient commuting experience across the city.
            </p>
            <Link to={"/about"} id="manual-Links">read more</Link>


        </div>
        <div className="line"> </div>
         {props.page === "/" ? <PopLo/> : null}
        <div className="line"> </div>
    </div>);
}
export default Home;