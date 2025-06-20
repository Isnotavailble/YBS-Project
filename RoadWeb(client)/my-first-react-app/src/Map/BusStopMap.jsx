import { TileLayer, MapContainer, Polyline, Popup, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./BusStopMap.css";
import DynamicCenter from "./DynamicCenter";
function BusStopMap(props){
    return (<div className="BusStopMap">

        <MapContainer center={props.center_data} 
            zoom={14}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DynamicCenter center={props.center_data} />
                <Marker position={props.center_data}>
                    <Popup><b>{props.name}</b></Popup>
                </Marker>
                
            </MapContainer></div>
    );
}
export default BusStopMap;