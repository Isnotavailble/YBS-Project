import { TileLayer, MapContainer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./BusStopMap.css";
function DefaultMap(props){
    return (<div className="BusStopMap"><MapContainer center={props.center_data}
            zoom={17}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> 
            </MapContainer></div>
    );
}
export default DefaultMap;