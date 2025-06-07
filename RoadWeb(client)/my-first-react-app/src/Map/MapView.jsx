// components/MapView.js
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import RoutingMachine from './RoutingMachine';

const MapView = ({ waypoints }) => {
  return (
    <MapContainer center={waypoints[0]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <RoutingMachine waypoints={waypoints} />
    </MapContainer>
  );
};

export default MapView;
