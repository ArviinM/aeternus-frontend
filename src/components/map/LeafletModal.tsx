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
import GravePlotService from "../../services/graveplot.service";
import IGravePlotData from "../../types/graveplot.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TabTitle } from "../../utils/GenerateFunctions";
import GraveMarker from "./GraveMarker";

const bounds = new LatLngBounds(
  [14.331085, 121.092627],
  [14.329605, 121.096482]
);
const bounds2 = new LatLngBounds(
  [14.331045, 121.092697],
  [14.329605, 121.096482]
);

// const blackOptions = { color: "green" };

const LeafletModal: React.FC = () => {
  TabTitle("Aeternus – Cemetery Map");
  const { id } = useParams();

  const [gravePlots, setGravePlots] = useState<Array<IGravePlotData>>([]);
  const [currentGravePlot, setCurrentGravePlot] =
    useState<IGravePlotData | null>(null);

  useEffect(() => {
    if (id) getGravePlot(id);
  }, [id]);

  useEffect(() => {
    retrieveGravePlots();
  }, []);

  const getGravePlot = (id: string) => {
    GravePlotService.get(id)
      .then((response: any) => {
        setCurrentGravePlot({
          id: response.data.id,
          lot_address: response.data.lot_address,
          // birthdate: response.data.birthdate,
          // deathdate: response.data.deathdate,
          // description: response.data.description,
          // photoImg: response.data.photoImg,
          status: response.data.status,
          southWest: response.data.southWest,
          northEast: response.data.northEast,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const retrieveGravePlots = () => {
    GravePlotService.getAll()
      .then((response: any) => {
        setGravePlots(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      <MapContainer
        className="leaflet-container4"
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

export default LeafletModal;
