import "./Card.css";
import Map from "../Map/Map.jsx";
function Card(props) {
    return (<>
        {props.loaded ?
            <div className="card-container">
                <h4>{props.location.name}</h4>
                <Map location={props.location}></Map>
            </div>
            :
            <div className="card-container">
                
                <span className="loaderContext" ></span>
                
            </div>
        }
    </>);
}
export default Card;