import { LatLngBounds } from "leaflet";
import React, { useEffect, useState } from "react";
import { Popup, Rectangle, useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";

import GravePlotService from "../../services/graveplot.service";
import Deceased from "../../services/deceased.service";

import IGravePlotData from "../../types/graveplot.type";

import { Button, ButtonGroup } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { Home as HomeIcon } from "@mui/icons-material";

import "../components.css";
import { Sidebar } from "primereact";
import IDeceasedData from "../../types/deceased.type";

export default function DeceasedMarker() {
  let emptyGravePlot: IGravePlotData = {
    id: "",
    block: { id: "", name: "" },
    lot: "",
    status: { id: "", name: "" },
    southWest: ["", ""],
    northEast: ["", ""],
  };

  let emptyDeceased: IDeceasedData = {
    id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    profile_picture: "",
    birth_date: undefined,
    death_date: undefined,
    obituary: "",
    grave_plot: {
      _id: "",
      block: { id: "", name: "" },
      lot: "",
      status: { id: "", name: "" },
      southWest: ["", ""],
      northEast: ["", ""],
    },
  };

  const map = useMap();

  const [allDeceased, setAllDeceased] = useState<Array<IDeceasedData>>([]);
  const [deceased, setDeceased] = useState<IDeceasedData>(emptyDeceased);

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
    retrieveAllDeceased();
  }, []);

  const retrieveAllDeceased = () => {
    Deceased.getAllDeceased()
      .then((response: any) => {
        setAllDeceased(response.data);
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

  let date = new Date(deceased.birth_date);
  let formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let date2 = new Date(deceased.death_date);
  let formattedDate2 = date2.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <Sidebar
        visible={visibleLeft}
        onHide={() => setVisibleLeft(false)}
        modal={false}
        baseZIndex={100000}
        className="p-sidebar-md"
      >
        <img src={deceased.profile_picture} alt={deceased.first_name} />
        <h3 className="m-1 text-3xl font-bold">
          {deceased.first_name} {deceased.last_name}
        </h3>
        <h4 className="m-1 text-xl">
          {formattedDate} - {formattedDate2}
        </h4>
        <h3 className="m-1 text-2xl">Obituary</h3>
        <p className="m-1 text-xl whitespace-pre-line"> {deceased.obituary} </p>
        {/* <p className="capitalize">{gravePlot.status.name}</p> */}
      </Sidebar>

      {allDeceased.map((allDeceased, index) => (
        <div>
          <Rectangle
            key={index}
            pathOptions={{ color: color(allDeceased.grave_plot.status.name) }}
            bounds={
              new LatLngBounds(
                [
                  parseFloat(allDeceased.grave_plot.southWest[0]),
                  parseFloat(allDeceased.grave_plot.southWest[1]),
                ],
                [
                  parseFloat(allDeceased.grave_plot.northEast[0]),
                  parseFloat(allDeceased.grave_plot.northEast[1]),
                ]
              )
            }
            eventHandlers={{
              click: () => {
                map.flyToBounds(
                  new LatLngBounds(
                    [
                      parseFloat(allDeceased.grave_plot.southWest[0]),
                      parseFloat(allDeceased.grave_plot.southWest[1]),
                    ],
                    [
                      parseFloat(allDeceased.grave_plot.northEast[0]),
                      parseFloat(allDeceased.grave_plot.northEast[1]),
                    ]
                  )
                );
                setVisibleLeft(true);
                //setGravePlot(gravePlots);
                setDeceased(allDeceased);
              },
            }}
          >
            <Popup keepInView={true} key={index}>
              <h1 className="font-semibold text-sm text-gray-600 ">
                B{allDeceased.grave_plot.block.name} L
                {allDeceased.grave_plot.lot}
              </h1>
              <p className="text-gray-600 capitalize m-auto p-auto ">
                • {deceased.first_name.charAt(0)} {deceased.last_name}
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
              retrieveAllDeceased();
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
