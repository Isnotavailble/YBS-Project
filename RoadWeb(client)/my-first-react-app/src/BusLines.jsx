import BusLineMap from "./Map/BusLineMap.jsx";
import { useState, useEffect } from "react";
import OverLay from "./Overlay/OverlayTemp.jsx";
import "./BusLines.css";
import Loader from "./Overlay/Loader.jsx";

function BusLines(props) {
    const [bus_j, setBusJ] = useState(null);
    const [allBus, setAllBus] = useState(null);
    const [busButtons, setBusButtons] = useState(null);
    const [selectedBus, setSelectedBus] = useState(53);
    const [status, setStatus] = useState(null);

    function getBus() {
        const controller = new AbortController;
        setStatus("loading");
        fetch("http://localhost:8080/api/admin/getBusNum/" + selectedBus,
            { signal: controller.signal })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(c => {
                        throw new Error(c.message || "Unknown Error")
                    })

                }
                else {
                    return response.json();
                }

            })
            .then(bus_data => {
                setBusJ(bus_data);
                setStatus(null);

            })
            .catch(e => {
                if (e.message === "Not Found") {
                    setStatus("not found");
                }
                if (e.name === "AbortError") {
                    console.log(e.message + "api cancale (BusNum)");
                }
                if (e.message === "Unknown Error") {
                    setStatus("network error");
                }

            });

        return () => controller.abort();
    }
    //saved all the data
    function getAllBus() {
        setStatus("loading");
        const controller = new AbortController;
        fetch("http://localhost:8080/api/admin/getAllBus", { signal: controller.signal })
            .then(r => {
                if (!r.ok) { throw new Error(`HTTP error: ${r.status}`) }
                return (r.json());
            })
            .then(data => {
                setStatus(null);
                setAllBus(data);
            })
            .catch(error => {
                if (error.message === 'Failed to fetch' ||
                    error.message === 'NetworkError when attempting to fetch resource.'
                    || error.message === "HTTP error: 404"
                ) {
                    setStatus("network error");
                }
                console.log(error.message);
            });
        return () => controller.abort();
    }
    //initial setup
    useEffect(() => {
        const allbus_clean = getAllBus();
        return () => { allbus_clean; }
    }, []);
    //cleanup code to cancel the request if page change..
    useEffect(() => {
        if (selectedBus !== null) {
            const cleanUp = getBus();
            return cleanUp;
        }
        return () => { }

    }, [selectedBus]);
    //catch only integer data from search bar
    useEffect(() => {
        const inputData = props.input_data ? parseInt(props.input_data, 10) : null;
        if (typeof inputData === "number" && !isNaN(inputData)) {
            setSelectedBus(inputData);
            console.log("Input recieve", inputData);
        }
        else if (inputData === null) {
            console.log("Input is denied", inputData);
        }

    }, [props.input_data]);
    //data successfully saved
    //new data
    //double check the stop are in database
    useEffect(() => {

        if (bus_j !== null && allBus !== null) {
            console.log("selected : ", bus_j.num);

        }

    }, [bus_j]);
    //in this case this catch only when the allbuss change once cuz api is 
    // fetched at mount state.
    useEffect(() => {
        if (allBus !== null) {
            console.log("render botton");
            const bus_list = allBus.map((bus, i) =>
                <div className="bus-b" key={i}>
                    <span className="bus-button-icon-background">
                        <svg id="bus-button-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bus-front" viewBox="0 0 16 16">
                            <path d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44 44 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43 43 0 0 0 8 3" />
                            <path d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A44 44 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2zM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A43 43 0 0 1 8 1" />
                        </svg>
                    </span>
                    <span className="bus-button-num">{bus.num}</span>
                    <button className="bus-b-button" onClick={(e) => {
                        setSelectedBus(e.target.value);
                        props.update_inputData(e.target.value)
                    }} key={i} value={bus.num}>
                        see bus line
                    </button>
                </div>)
            setBusButtons(bus_list);
        }
    }, [allBus])

    //for rednering Map BusLineMap accept with data template in array so this is just a wrapper!
    function DrawMap() {
        if (bus_j !== null) {
            let arrival_locations = [];
            bus_j.destinations.forEach(stops => {
                arrival_locations.push([[stops.latitude, stops.longitude], stops.name])
            })
            return (
                <BusLineMap
                    center_data={arrival_locations[0][0]}
                    marker_data={arrival_locations} bus_num={bus_j.num}>
                </BusLineMap>);
        }
        return null;

    }

    return (<div id="map">
        {status === "network error" ? <OverLay /> : null}
        {status === "loading" ? <Loader /> : null}
        <span className="side-container">
            <h3>Available BusLines</h3>
            {busButtons}</span>
        <span className="bus-map-container">
            {bus_j !== null ? DrawMap() : null}
            {status === "not found" ?
                <div className="overlay2">
                    <span style={{ color: "" }}>BusLine {selectedBus} </span>'s not available!
                </div>
                : null}
        </span>
        <div className="selectedBusLine">{bus_j === null ? "loading..." : bus_j.num}</div>
    </div>);
}
export default BusLines;