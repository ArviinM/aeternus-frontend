/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import L, { LatLngBounds } from "leaflet";
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

  const [allDeceased, setAllDeceased] = useState<Array<IDeceasedData>>([]);

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
              <a
                href={
                  "https://www.google.com/maps/dir/?api=1&destination=" +
                  gravePlot.northEast[0] +
                  "%2C" +
                  gravePlot.northEast[1] +
                  "&travelmode=driving&zoom=15"
                }
                target="_blank"
              >
                <button
                  type="submit"
                  className="w-[50%]  flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-md font-primary text-black bg-[#ffc500] hover:bg-[#9b7b0c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc500]"
                >
                  Get Directions
                </button>
              </a>
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

      <Control position={"bottomleft"}>
        <ButtonGroup orientation="horizontal" variant="contained">
          <Button
            style={{
              maxWidth: "90px",
              maxHeight: "30px",
              minWidth: "90px",
              minHeight: "30px",
            }}
            sx={{ background: "green" }}
            onClick={() => {
              map.flyToBounds(center);
            }}
            disableElevation={true}
          >
            Available
          </Button>
          <Button
            style={{
              maxWidth: "90px",
              maxHeight: "30px",
              minWidth: "90px",
              minHeight: "30px",
            }}
            sx={{ background: "blue" }}
            onClick={() => {
              map.flyToBounds(center);
            }}
            disableElevation={true}
          >
            Occupied
          </Button>
          <Button
            style={{
              maxWidth: "90px",
              maxHeight: "30px",
              minWidth: "90px",
              minHeight: "30px",
            }}
            sx={{ background: "black" }}
            onClick={() => {
              map.flyToBounds(center);
            }}
            disableElevation={true}
          >
            Reserved
          </Button>
        </ButtonGroup>
      </Control>
    </div>
  );
}
