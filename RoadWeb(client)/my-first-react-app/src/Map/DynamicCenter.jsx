import { useMap } from "react-leaflet";
function DynamicCenter(props){
    const map = useMap();
    map.setView(props.center,map.getZoom());

}
export default DynamicCenter;