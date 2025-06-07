import "./PopLo.css";
import Card from "../Card/Card.jsx";
import { useState, useEffect, useMemo } from "react";
import Overlay from "../Overlay/OverlayTemp.jsx";
import { Link } from "react-router-dom";
function PopLo(props) {
    const [popData, setPopData] = useState(null);
    const [error, setError] = useState(null);
    //make 4 default cards with loading or base animation
    const defaultCards = () => {
        let temp = [];
        for (let c = 3; c >= 0; c--) {
            temp.push(<Card key={c} loaded={false}></Card>);
        }
        return temp;
    }
    //rendered cards dependent on data null or not null from state popData
    //check d output
    const cardRendering = useMemo(() => {
        if (popData !== null) {
            return (<>
                {popData.map((lo, id) => {
                    console.log("d", lo);
                    return<Card key={id} location={lo.location} loaded={true} />
                })}
            </>);
        }
        else {
            return <>{defaultCards()}</>
        }
    }, [popData]);
    //api call only on mount
    useEffect(() => {
        const controller = new AbortController;
        fetch("http://localhost:8080/api/admin/getAllPopularLocations", { signal: controller.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Something was wrong");
                }
                return response.json();
            })
            .then(data => {
                setPopData(data);
                console.log("Popular locations : ", data);

            })
            .catch(e => {
                let ms = String(e.message);
                if (ms.toLowerCase().includes("networkerror")) {
                    setError("networkerror");
                    console.log("got it");
                }
                else if (ms.toLowerCase().includes("abort")) {
                    console.log("aborted");
                }
                else setError("networkerror");


                console.log(ms + "(poplular locations)");
            })

        return () => { controller.abort();}

    }, [])
    //the whole rendering in pile
    return (<div className="pop-locations">
        {error === "networkerror" ? <Overlay /> : null}
        <h3>Popular <span>BusStop</span></h3>
        <p>
            These are the Popular BusStop based on their traffic.
            We assure that our Bus Stop data are 90% of accuarcy.
            We have checked almost of the location by ourselves.
            Want to take a look all the BusStopes we have collected?<br></br><br></br>
            <Link to={"/busstop"} id="manual-Links">Check all available BusStopes here</Link>
        </p>
        
        
        <div className="p-container">
            {cardRendering}
        </div>
    </div>);
}
export default PopLo;