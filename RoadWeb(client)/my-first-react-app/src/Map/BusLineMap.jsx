import { TileLayer, MapContainer, Polyline, Popup, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./BusLineMap.css";
import DynamicCenter from "./DynamicCenter";
import D from "../Points/start/6.json";
import { useState } from "react";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Tiles = {
    OpenStreetMap: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenStreetMap contributors',
    },
    EsriSatellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles © Esri',
    }

}

const BusLineMap = (props) => {
    const start_list = D.filter(p => p.bus_num === props.bus_num);
    const startPoint = [start_list[0].location.latitude, start_list[0].location.longitude];
    const points = props.marker_data.map((p, i) => p[0]);
    const [selectedTile, setSelectedTile] = useState("OpenStreetMap");
    const { url, attribution } = Tiles[selectedTile];
    const handleChange = (e) => {
        setSelectedTile(e.target.value);
    };

    function TileStyle() {
        return (<select id="drop" onChange={(event) => handleChange(event)} value={selectedTile}>
            {Object.keys(Tiles).map((t, i) => <option key={i} value={t}>{t}</option>)}
        </select>);
    }

    function getDistance([lat1, lon1], [lat2, lon2]) {
        return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
    }

    function sortBusStopsByDistance(stops, start) {
        const sorted = [start]; // Start with one known point
        const remaining = stops.filter(s => s !== start);

        let current = start;

        while (remaining.length > 0) {
            let nearestIndex = 0;
            let nearestDistance = getDistance(current, remaining[0]);

            for (let i = 1; i < remaining.length; i++) {
                const dist = getDistance(current, remaining[i]);
                if (dist < nearestDistance) {
                    nearestDistance = dist;
                    nearestIndex = i;
                }
            }

            current = remaining.splice(nearestIndex, 1)[0];
            sorted.push(current);
        }

        return sorted;
    }
    let list = sortBusStopsByDistance(points, startPoint);


    return (
        <div id="bus-line-map">
            <div>{TileStyle()}</div>
            <MapContainer center={props.center_data}
                zoom={13}>
                <TileLayer url={url} attribution={attribution} />
                {props.marker_data.map((e, i) =>
                    <Marker key={i} position={e[0]}>
                        <Popup><b>{e[1]}</b></Popup>
                    </Marker>
                )}
                <DynamicCenter center={startPoint}></DynamicCenter>
                <Polyline positions={list}></Polyline>

            </MapContainer>
        </div>);
};

export default BusLineMap;