import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Fix default marker icon issues in some builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MyMap = (props) => {
    return (
        <MapContainer center={[props.location.latitude,props.location.longitude]} 
        zoom={17} scrollWheelZoom={false} zoomControl={false} dragging={false}
        doubleClickZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
            />
            <Marker  position={[props.location.latitude,props.location.longitude]}>
                <Popup autoClose={true}>
                    <b>{props.location.name}</b>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MyMap;
