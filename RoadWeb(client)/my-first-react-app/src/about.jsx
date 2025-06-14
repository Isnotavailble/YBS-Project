
import pic from "./assets/w.jpg"
import "./about.css";
function About(props) {
    return (<div>
        <div className="about-box">
            <img src={pic} id="about-pic"></img>
            <span id="about-side-container">
                <h2>About Us</h2>
                <div id="about-line"></div>
                <div className="about-text-box">
                    <span>YBS Route</span> is a website where anyone can find their bus destinations clearly in just one place.
                    We assure that our revealed data are nearly 88% of accuracy.
                    By using <span>YBS Route</span>, user could know where they are and
                    where they need to get off with ease.
                </div>
            </span>
        </div><br />
        <div className="about-box" style={{height:"460px"}}>
            <div className="guidelines-box">
                <h2>GuideLines <span>
                    <svg width="56" height="65" viewBox="0 0 56 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.3333 56.875L28 43.3333L11.6667 56.875V13.5417C11.6667 12.1051 12.1583 10.7273 13.0335 9.7115C13.9087 8.69568 15.0957 8.125 16.3333 8.125H39.6667C40.9043 8.125 42.0913 8.69568 42.9665 9.7115C43.8417 10.7273 44.3333 12.1051 44.3333 13.5417V56.875Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
                </h2>
                <div id="about-line"></div>
                <div className="text">Don’t know how to use YBS Route ?
                    we got you back !</div><br />
                <div className="text-box1">
                    <h3>See Bus-Lines</h3>
                    <div className="text">
                        Go to the bustlines page and you will see all the available bus-lines.
                        To see the desired one, just type in search bar.
                        In this page, you can only enter the desired bus number.
                    </div>
                </div>
                <span>
                    <div className="text-box1 text-box2">
                        <h3>See Bus Stopes</h3>
                        <div className="text" >
                            Go to the bus stop page and you will see just few default bus stop in there.
                            To see your desired bus stop, just enter in search bar and then search for it.
                            Once it’s found, it will show all the related bus stop according to your entered name.
                            To see it just click see bus stop button. To see related bus number for that bus stop.
                            Just click see bus-lines button.
                        </div>
                    </div>
                </span>
            </div>
        </div>
    </div>)
}
export default About;