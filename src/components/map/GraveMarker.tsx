import { LatLngBounds } from "leaflet";
import React, { useEffect, useState } from "react";
import { Popup, Rectangle, useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";

import GravePlotService from "../../services/graveplot.service";
import IGravePlotData from "../../types/graveplot.type";

import { Button, ButtonGroup } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { Home as HomeIcon } from "@mui/icons-material";

import "../components.css";
import { Sidebar } from "primereact";

export default function GraveMarker() {
  let emptyGravePlot: IGravePlotData = {
    id: "",
    block: { id: "", name: "" },
    lot: "",
    status: { id: "", name: "" },
    southWest: ["", ""],
    northEast: ["", ""],
    deceased: [
      {
        id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        profile_picture: "",
        birth_date: undefined,
        death_date: undefined,
        obituary: "",
      },
    ],
    lot_owner: {
      id: "",
      first_name: "",
      last_name: "",
      username: "",
      address: "",
      contact_no: "",
      email: "",
    },
  };

  const map = useMap();

  const [gravePlots, setGravePlots] = useState<Array<IGravePlotData>>([]);
  const [gravePlot, setGravePlot] = useState<IGravePlotData>(emptyGravePlot);

  const color = (status: any) => {
    if (status === "available") {
      return `green`;
    }
    if (status === "occupied") {
      return "blue";
    }
    if (status === "reserved") {
      return "black";
    }
    return "red";
  };

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

  const [visibleLeft, setVisibleLeft] = useState(false);

  return (
    <div>
      <Sidebar
        visible={visibleLeft}
        onHide={() => setVisibleLeft(false)}
        modal={false}
        baseZIndex={100000}
      >
        <h3>
          Block {gravePlot.block.name} Lot {gravePlot.lot}
        </h3>
        <p className="capitalize">{gravePlot.status.name}</p>
      </Sidebar>

      {gravePlots.map((gravePlots, index) => (
        <div>
          <Rectangle
            key={index}
            pathOptions={{ color: color(gravePlots.status.name) }}
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
              click: () => {
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
                setVisibleLeft(true);
                setGravePlot(gravePlots);
              },
            }}
          >
            <Popup keepInView={true} key={index}>
              <h1 className="text-lg font-semibold text-gray-600 ">
                B{gravePlots.block.name} L{gravePlots.lot}
              </h1>

              <h1 className="text-lg font-semibold text-gray-600 ">
                {/* {gravePlots.birthdate} • {gravePlots.deathdate} */}
              </h1>

              <p className="text-gray-600 uppercase m-auto p-auto ">
                {gravePlots.status.name}
              </p>
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
