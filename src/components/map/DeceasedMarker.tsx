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
import { TabView, TabPanel } from "primereact/tabview";

import IDeceasedData from "../../types/deceased.type";

export default function DeceasedMarker() {
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

  const [activeIndex, setActiveIndex] = useState(0);

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
    retrieveGravePlots();
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
        className="p-sidebar-md"
      >
        {/* */}
        {/* <p className="capitalize">{gravePlot.status.name}</p> */}

        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          scrollable
        >
          {gravePlot.deceased.map((deceased, index) => (
            <TabPanel
              header={deceased.first_name.charAt(0) + ". " + deceased.last_name}
              key={index}
            >
              <img src={deceased.profile_picture} alt={deceased.first_name} />
              <h3 className="m-1 text-3xl font-bold">
                {deceased.first_name} {deceased.last_name}
              </h3>
              <h4 className="m-1 text-xl">
                {new Date(deceased.birth_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                -{" "}
                {new Date(deceased.death_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h4>
              <h3 className="m-1 text-2xl">Obituary</h3>
              <p className="m-1 text-xl whitespace-pre-line">
                {" "}
                {deceased.obituary}{" "}
              </p>{" "}
            </TabPanel>
          ))}
        </TabView>
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
                setGravePlot(gravePlots);
                if (!gravePlots.deceased[0]) {
                  setVisibleLeft(false);
                } else {
                  setVisibleLeft(true);
                }
              },
            }}
          >
            <Popup keepInView={true} key={index}>
              <h1 className="font-semibold text-sm text-gray-600 ">
                B{gravePlots.block.name} L{gravePlots.lot}
              </h1>

              {gravePlots.deceased.map((deceased, index) => (
                <p
                  className="text-gray-600 capitalize m-auto p-auto"
                  key={index}
                >
                  • {deceased.first_name.charAt(0)}. {deceased.last_name}
                </p>
              ))}

              {/* <p className="text-gray-600 capitalize m-auto p-auto" key={index}>
                • {gravePlots.deceased[index].first_name.charAt(0)}.{" "}
                {gravePlots.deceased[index].last_name}
              </p> */}

              {/* <p className="text-gray-600 capitalize m-auto p-auto ">
                • {gravePlots.deceased.first_name.charAt(0)}. {gravePlots.deceased.last_name}
              </p> */}
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
