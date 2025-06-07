import { useMap } from "react-leaflet";
function DynamicCenter(props){
    const map = useMap();
    map.flyTo(props.center,14);

}
export default DynamicCenter;