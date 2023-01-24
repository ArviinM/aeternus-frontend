import { LatLngBounds } from "leaflet";
import { Popup, Rectangle, useMap } from "react-leaflet";
import "./map.css";

const GraveShower: React.FC<{
  southWest: any[];
  northEast: any[];
  blockName: any;
  lotName: any;
  availability: any;
}> = ({ southWest, northEast, blockName, lotName, availability }) => {
  const map = useMap();
  const grave = new LatLngBounds(
    [parseFloat(southWest[0]), parseFloat(southWest[1])],
    [parseFloat(northEast[0]), parseFloat(northEast[1])]
  );

  const color = (status: any) => {
    if (status === "Available") {
      return `green`;
    }
    if (status === "Occupied") {
      return "blue";
    }
    if (status === "Reserved") {
      return "black";
    }
    return "red";
  };

  return (
    <div>
      <Rectangle
        bounds={grave}
        eventHandlers={{
          click: (e: any) => {
            map.flyToBounds(grave);
          },
        }}
        pathOptions={{ color: color(availability) }}
      >
        <Popup keepInView={true}>
          <h1 className="text-lg font-semibold text-gray-600 ">
            B{blockName} L{lotName}
          </h1>
        </Popup>
      </Rectangle>
    </div>
  );
};

export default GraveShower;
