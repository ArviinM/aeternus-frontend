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

import GraveMarker from "./GraveMarker";
import EditFeature from "./EditFeature";
import { useState } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const bounds = new LatLngBounds(
  [14.331085, 121.092627],
  [14.329605, 121.096482]
);
const bounds2 = new LatLngBounds(
  [14.331045, 121.092697],
  [14.329605, 121.096482]
);

interface Coordinates {
  southWest: [any, any];
  northEast: [any, any];
}

const EditFeatureModal: React.FC<Coordinates> = (props: Coordinates) => {
  const [southWest1, setSouthWest1] = useState<any>();
  const [southWest2, setSouthWest2] = useState<any>();

  const [northEast1, setNorthEast1] = useState<any>();
  const [northEast2, setNorthEast2] = useState<any>();

  props.southWest[0](southWest1);
  props.southWest[1](southWest2);

  props.northEast[0](northEast1);
  props.northEast[1](northEast2);
  return (
    <div>
      <MapContainer
        className="leaflet-container6"
        center={[14.330071016060707, 121.09468013122873]}
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

        {/* {Add Edit Controls} */}
        <EditFeature
          southWest={[setSouthWest1, setSouthWest2]}
          northEast={[setNorthEast1, setNorthEast2]}
        />
        {/* display markers */}
        <GraveMarker />

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

export default EditFeatureModal;
