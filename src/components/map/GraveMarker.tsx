import { LatLngBounds } from "leaflet";
import React, { useEffect, useState } from "react";
import { Popup, Rectangle, useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import GravePlotService from "../../services/graveplot.service";
import IGravePlotData from "../../types/graveplot.type";
import { Button, ButtonGroup } from "@mui/material";
import "../components.css";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { Home as HomeIcon } from "@mui/icons-material";

export default function GraveMarker() {
  const map = useMap();
  const [gravePlots, setGravePlots] = useState<Array<IGravePlotData>>([]);

  useEffect(() => {
    retrieveGravePlots();
  }, []);

  const retrieveGravePlots = () => {
    GravePlotService.getAll()
      .then((response: any) => {
        setGravePlots(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const center = new LatLngBounds(
    [14.331085, 121.092627],
    [14.329605, 121.096482]
  );

  return (
    <div>
      {gravePlots.map((gravePlots, index) => (
        <div>
          <Rectangle
            key={index}
            bounds={
              new LatLngBounds(
                [
                  parseFloat(gravePlots.southWest[0]),
                  parseFloat(gravePlots.southWest[1]),
                ],
                [
                  parseFloat(gravePlots.northEast[0]),
                  parseFloat(gravePlots.northEast[1]),
                ]
              )
            }
            eventHandlers={{
              click: (e) => {
                map.flyToBounds(
                  new LatLngBounds(
                    [
                      parseFloat(gravePlots.southWest[0]),
                      parseFloat(gravePlots.southWest[1]),
                    ],
                    [
                      parseFloat(gravePlots.northEast[0]),
                      parseFloat(gravePlots.northEast[1]),
                    ]
                  )
                );
              },
            }}
          >
            <Popup keepInView={true}>
              <h1 className="text-lg font-semibold text-gray-600 ">
                {gravePlots.lot_address}
              </h1>

              <h1 className="text-lg font-semibold text-gray-600 ">
                {/* {gravePlots.birthdate} • {gravePlots.deathdate} */}
              </h1>

              <p className="text-gray-600 uppercase m-auto p-auto ">
                {gravePlots.status.name}
              </p>
              {/* <img
                src={gravePlots.photoImg}
                className="h-auto w-auto m-auto content-center"
                alt="grave-pic"
              ></img> */}
            </Popup>
          </Rectangle>
        </div>
      ))}
      <Control position={"topright"}>
        <ButtonGroup orientation="vertical" variant="contained">
          <Button
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            color="inherit"
            onClick={() => {
              retrieveGravePlots();
            }}
          >
            <RefreshIcon />
          </Button>
        </ButtonGroup>
      </Control>
      <Control position={"topright"}>
        <ButtonGroup orientation="vertical" variant="contained">
          <Button
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            color="inherit"
            onClick={() => {
              map.flyToBounds(center);
            }}
          >
            <HomeIcon />
          </Button>
        </ButtonGroup>
      </Control>
    </div>
  );
}
