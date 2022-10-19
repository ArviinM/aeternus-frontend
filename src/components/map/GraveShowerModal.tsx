import { LatLngBounds } from "leaflet";
import {
  CircleMarker,
  ImageOverlay,
  LayersControl,
  MapContainer,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import "./map.css";

import GraveShower from "./GraveShower";

const bounds = new LatLngBounds(
  [14.331085, 121.092627],
  [14.329605, 121.096482]
);
const bounds2 = new LatLngBounds(
  [14.331045, 121.092697],
  [14.329605, 121.096482]
);

const GraveShowerModal: React.FC<{
  southWest: any[];
  northEast: any[];
  blockName: any;
  lotName: any;
  availability: any;
}> = ({ southWest, northEast, blockName, lotName, availability }) => {
  return (
    <div>
      <MapContainer
        className="leaflet-container5"
        center={[southWest[0], southWest[1]]}
        zoom={19}
        maxZoom={24}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {/* <GraveMapHome /> */}
        <ZoomControl position={"bottomright"} />
        <TileLayer
          maxNativeZoom={19}
          maxZoom={24}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* display specific grave plot only */}
        <GraveShower
          southWest={southWest}
          northEast={northEast}
          blockName={blockName}
          lotName={lotName}
          availability={availability}
        />

        <LayersControl>
          <LayersControl.Overlay name="Drone Map from CIO" checked>
            <ImageOverlay
              url="/Biñan-Cemetery.png"
              bounds={bounds}
              opacity={0.8}
            ></ImageOverlay>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Sattelite Map from Google Maps">
            <ImageOverlay
              url="/Biñan-Cemetery-2-GMaps.png"
              bounds={bounds2}
              opacity={0.8}
            ></ImageOverlay>
          </LayersControl.Overlay>
        </LayersControl>
        <CircleMarker
          center={[14.330036568840208, 121.09326796308288]}
          className="my-labels"
          radius={0.1}
        >
          <Tooltip
            direction="center"
            opacity={1}
            permanent
            className="my-labels"
          >
            Biñan Public Cemetery
          </Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

export default GraveShowerModal;
