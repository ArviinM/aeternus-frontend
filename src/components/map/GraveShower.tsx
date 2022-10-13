import { LatLngBounds } from "leaflet";
import { Popup, Rectangle, useMap } from "react-leaflet";
import "./map.css";

const GraveShower: React.FC<{
  southWest: any[];
  northEast: any[];
  name: any;
}> = ({ southWest, northEast, name }) => {
  const map = useMap();
  const grave = new LatLngBounds(
    [parseFloat(southWest[0]), parseFloat(southWest[1])],
    [parseFloat(northEast[0]), parseFloat(northEast[1])]
  );
  return (
    <div>
      <Rectangle
        bounds={grave}
        eventHandlers={{
          click: (e: any) => {
            map.flyToBounds(grave);
          },
        }}
      >
        <Popup keepInView={true}>
          <h1 className="text-lg font-semibold text-gray-600 ">{name}</h1>
        </Popup>
      </Rectangle>
    </div>
  );
};

export default GraveShower;
