/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

import { TabTitle } from "../../utils/GenerateFunctions";
import CemMap from "../map/CemMap";

import "../components.css";
import "./home.scss";
import "primeicons/primeicons.css";

const AboutUs: React.FC = () => {
  TabTitle("Aeternus – About Us!");
  return (
    <div className="font-sans text-center bg-white -z-50 ">
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
      <div className="padding-samp5 bg-white  ">
        <div className="w-[96%] max-w-[126rem] mx-auto ">
          <div className="text-center mx-auto w-2/3">
            <div className="font-primary leading-[1]  tracking-widest mb-5 text-[#abacaa] ">
              CONTACT US
            </div>
            <h2 className="text-[max(2.4rem,min(4.21053vw,4.4rem))] font-subtitle leading-[1.5] ">
              Get In Touch
            </h2>
            <p className="font-gilroy_medium leading-[1.4] text-[max(1.6rem,min(1.77632vw,0.8rem))] text-[#828282]">
              We'll be pleased to welcome your visit at any of our warm and
              comfortable offices. We invite you to come in and see for yourself
              how we're revolutionizing the way you think about funeral and
              cemetery services.
            </p>
          </div>
          <div className="page-intro-contact font-primary text-[#185adb]">
            <span className="text-[max(1.2rem,min(1.77632vw,0.8rem))]">
              <i className="pi pi-phone mx-2 text-[#185adb] font-bold "></i>
              <a className="inline ">Call (+63) 99217300312</a>
            </span>
            <span className="text-[max(1.2rem,min(1.77632vw,0.8rem))] ">
              <i className="pi pi-envelope mx-2 text-[#185adb] font-bold "></i>
              <a className="inline">Send as a message</a>
            </span>
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
            <h1 className=" text-[max(3.5rem,min(5.20833vw,5.3rem))] animate-textShow2 font-title leading-[1.3] text-white">
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
    name: "About Us",
    description: "",
    imgPath: "http://localhost:5000/public/about-us.jpg",
    subtitle: "The Aeternus System Difference",
  },
];

export default AboutUs;
