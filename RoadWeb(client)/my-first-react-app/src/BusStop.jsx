import BusStopMap from "./Map/BusStopMap.jsx";
import "./BusStop.css";
import NotFound from "./assets/NotFound.png";
import { useState, useEffect, useRef } from "react";
import BusLineMap from "./Map/BusLineMap.jsx";
import OverLay from "./Overlay/OverlayTemp.jsx";
import Loader from "./Overlay/Loader.jsx";
function BusStop(props) {
    const [sidePage, setSidePage] = useState("BusStopMap");
    const [relatedAllBus, setRelatedAllBus] = useState(null);
    const clickButton = useRef({});
    const [selectedStop, setSelectedStop] = useState(null);
    const [error, setError] = useState(null);
    const [invalidInput, setInvalidInput] = useState(null);
    const [selectedBus, setSelectedBus] = useState(null);
    const [loaded, setLoaded] = useState(null);
    //remove zero-width characters from input
    function sanitizeInput(input) {
        return input.replace(/[\u200B\u200C\u200D\uFEFF]/g, '');
    }
    //get bus number
    function getBus(bus_num) {
        setError("loading");
        fetch("http://localhost:8080/api/admin/getBusNum/" + bus_num)
            .then(r => {
                if (!r.ok) { throw new Error(`HTTP error: ${r.status}`) }
                else
                    return (r.json());
            })
            .then(bus => {
                let temp = [];
                console.log("Bus data: ", bus);
                bus.destinations.forEach(d => {
                    temp.push([[d.latitude, d.longitude], d.name]);
                })
                setError(null);
                setLoaded(temp);
            })
            .catch(e => {console.log(e.message); })

    }

    function showBus(index) {
        const el = clickButton.current[`stop-${index}`];
        if (el) {
            if (el.style.maxHeight !== "0px") {
                el.style.maxHeight = "0px";

            }
            else {
                el.style.maxHeight = "700px";
            }

        }
    }
    //rednering map views

    useEffect(() => {
        if (loaded !== null) {
            console.log("Loaded data : ", loaded);
        }
    }, [loaded]);

    useEffect(() => {
        if (error)
            setError(false)

    }, [sidePage])
    //render when value changed

    useEffect(() => {
        if (selectedStop !== null) {
            setSidePage("BusStopMap");
            console.log("render map view page");
        }
    }, [selectedStop]);

    useEffect(() => {
        if (selectedBus !== null) {
            setSidePage("BusLine");
            console.log("render bus line page");
        }
    }, [selectedBus]);

    //fully encoded input and fire api function
    function getBusStop(name) {
        setError("loading");
        const controller = new AbortController;
        const encoded_input = sanitizeInput(name);
        fetch("http://localhost:8080/api/admin/getStop?stop=" + encoded_input, { signal: controller.signal })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(c => {
                        throw new Error(c.message)
                    })
                }
                else {
                    return response.json();
                }
            })
            .then(busStop_data => {
                setRelatedAllBus(busStop_data);
                setError(null);
                console.log("related", busStop_data);
            })
            .catch(e => {
                
                console.log(e.message);
                if (e.message === "Related BusLine not founded for " + name) {
                    console.log("Related BusLine not founded for " + name);
                    setError("Not Found");
                    setInvalidInput(name);
                    
                }
                else if (e.message === "NetworkError when attempting to fetch resource.") {
                    setError("Unknown Error");
                }

            })
        return () => controller.abort();
    }
    //initial setup
    //updated : busStop removed (api will fire once when component is mounted)
    useEffect(() => {
        const clean = getBusStop("ဒဂုံဧရာအ‌ဝေး‌ပြေး");
        return () => clean();

    }, []);
    //input data from search bar (updated direct handle input)
    useEffect(() => {
        if (props.input_data !== null) {
            console.log("input recieved : ", props.input_data);
            getBusStop(props.input_data);
        }
    }, [props.input_data]);

    //when all bus data is loaded,set default bus stop
    useEffect(() => {
        if (relatedAllBus !== null) {
            const defaultStop = relatedAllBus[0].location;
            setSelectedStop(defaultStop);
            console.log("set Default Bus is Done!");
        }
    }, [relatedAllBus]);


    return (<div id="map">
        <div className="side-container-busstop">
            <div className="title-left-side-bar"><h2>Bus-Lines</h2></div>
            <div>{
                //perfomance updated for BusStop and busline buttons
                relatedAllBus ? <div>
                    {relatedAllBus.map((busStop, index) =>
                        <div key={index} id="bus-and-stop" >
                            <div className="bus-stop-name">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                </i><p>{busStop.location.name}</p>
                                <button id="drop-bottom" value={index} onClick={() => { showBus(index) }}>
                                    See BusLines</button>

                                <button onClick={() => { console.log("selected : ", busStop.location); setSelectedStop(busStop.location); setSelectedBus(null);setError(false) }}>See BusStop</button>
                            </div>
                            <div className="bus-related"
                                ref={(el) => { if (el) clickButton.current[`stop-${index}`] = el }}>
                                {busStop.bus.map((bus, i) => {
                                    const refID = `stop-${index}-bus${i}`;

                                    return (<div key={i} className="button">
                                        <span id="bus-icon-background">
                                            <svg id="bus-button-icon2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bus-front" viewBox="0 0 16 16">
                                            <path d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44 44 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43 43 0 0 0 8 3" />
                                            <path d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A44 44 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2zM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A43 43 0 0 1 8 1" />
                                        </svg>
                                        </span>

                                        <span>{bus.num}</span> 
                                        <button ref={(el) => { if (el) clickButton.current[refID] = el }}
                                            value={bus.num}
                                            onClick={(e) => {
                                                setSelectedStop(null);
                                                getBus(e.target.value);
                                                setSelectedBus(e.target.value);
                                                setError(null);
                                                console.log("Button : ", bus.num)
                                            }
                                            }>see busline</button>
                                    </div>)
                                })}
                            </div>
                        </div>
                    )}
                </div> : null}</div>
        </div>
        {error === "Unknown Error" ? <OverLay /> : null}
        {error === "loading"? <Loader/> : null}
        <span id="map-container">
            {error === "Not Found" ? <div className="overlay2">
                Related BusLine is not founded for <span>{invalidInput}</span>
                <img src={NotFound}></img></div> : null}

            {sidePage === "BusStopMap" && selectedStop ? <BusStopMap
                center_data={[selectedStop.latitude, selectedStop.longitude]}
                name={selectedStop.name}>
            </BusStopMap> : null}

            {sidePage === "BusLine" && selectedBus && loaded? <><div className="selectedBus">{selectedBus}</div><BusLineMap
                marker_data={loaded}
                center_data={loaded[0][0]} bus_num={parseInt(selectedBus, 10)}>
            </BusLineMap></> : null}
        </span>


    </div>)
}
export default BusStop;