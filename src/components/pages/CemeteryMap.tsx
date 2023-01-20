import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

import { TabTitle } from "../../utils/GenerateFunctions";
import CemMap from "../map/CemMap";

import "../components.css";
import "./home.scss";

const CemeteryMap: React.FC = () => {
  TabTitle("Aeternus – Cemetery Map");
  return (
    <div className="font-sans text-center bg-gray-500 -z-50 ">
      <Carousel
        autoPlay={true}
        animation="fade"
        duration={3500}
        fullHeightHover={true}
        cycleNavigation={true}
        interval={7000}
        indicatorIconButtonProps={{
          style: {
            padding: "10px", // 1
            color: "white", // 3
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#c89d5e", // 2
          },
        }}
        indicatorContainerProps={{
          style: {
            marginBottom: "20px", // 5
            zIndex: "8",
          },
        }}
      >
        {items.map((item, index) => {
          return <Project item={item} key={index} />;
        })}
      </Carousel>
      <div className="padding-samp4 bg-white text-gray-900  ">
        <div className="w-[96%] max-w-[126rem] mx-auto ">
          <div className="text-center">
            <div className="font-primary leading-[1] tracking-wide mb-5 uppercase text-[#000]">
              Click a Grave Plot to see details and information of the plot
            </div>
            <div>
              <CemMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type Item = {
  name: string;
  description: string;
  imgPath: string;
  subtitle: string;
};

interface ProjectProps {
  item: Item;
}
function Project({ item }: ProjectProps) {
  return (
    <div className="font-primary text-center bg-gray-100 h-[86vh]">
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${item.imgPath})`, zIndex: -1 }}
      >
        <div className="text-center text-neutral-content p-auto">
          <div className="max-w-6xl">
            <p className="mb-5 animate-textShow font-primary uppercase tracking-widest text-gray-100">
              {item.description}
            </p>
            <h1 className="text-[max(3.5rem,min(5.20833vw,5.3rem))] animate-textShow2 font-title leading-[1.3] text-white">
              {item.name}
            </h1>
            <p className="animate-textShow -mt-16 font-cursive text-[max(3.5rem,min(7.8125vw,5rem))] text-[#ffc500]">
              {item.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const items: Item[] = [
  {
    name: "Cemetery Interactive Map",
    description: "",
    imgPath: "https://aeternus-api.onrender.com/public/map.jpg",
    subtitle: "Search, locate, and read",
  },
];

export default CemeteryMap;
