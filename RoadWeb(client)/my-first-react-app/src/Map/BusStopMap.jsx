import { TileLayer, MapContainer, Polyline, Popup, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./BusStopMap.css";
import DynamicCenter from "./DynamicCenter";
function BusStopMap(props) {
    return (<div className="BusStopMap">

        <MapContainer center={props.center_data}
            zoom={15} maxZoom={15} minZoom={15} zoomControl={false}
        >
            <TileLayer bounds={[[16.710, 95.990], [17.070, 96.2503624]]} tileSize={512} zoomOffset={-1}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=qyT85KBHD3CAAaPRmR2z' />
            <DynamicCenter center={props.center_data} />
            <Marker position={props.center_data}>
                <Popup><b>{props.name}</b></Popup>
            </Marker>

        </MapContainer></div>
    );
}
export default BusStopMap;