/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

import { TabTitle } from "../../utils/GenerateFunctions";
import CemMap from "../map/CemMap";

import "../components.css";
import "./home.scss";
import "primeicons/primeicons.css";
import PictureCarousel from "./PictureCarousel";
import Services_WWD from "./Services_WWD";
import { Link } from "react-router-dom";

const WhatWeDo: React.FC = () => {
  TabTitle("Aeternus – What We Do?");
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
      <div className="padding-samp4 bg-white  ">
        <div className="w-[96%] max-w-[126rem] mx-auto ">
          <div className="text-center mx-auto w-2/3">
            <div className="font-primary leading-[1]  tracking-widest mb-5 text-[#abacaa] ">
              WE'RE HERE FOR YOU
            </div>
            <h2 className="text-[max(2.4rem,min(4.21053vw,4.4rem))] font-subtitle leading-[1] text-[#282828]">
              We clean, water, and cut grasses for your plots.
            </h2>
            <p className="font-gilroy_medium leading-[1.4] text-[max(1.6rem,min(1.77632vw,0.8rem))] text-[#828282]">
              Our best sepulterero's are on it's way and prepared to clean your
              plot!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#F9F9F9]">
        <div className="widget-container2 py-5">
          <div className="title">
            <a className="title_a shadow-2xl">
              <video autoPlay loop muted controls>
                <source
                  src="http://localhost:5000/public/video/request-services-tutorial.mp4"
                  type="video/mp4"
                />
              </video>
            </a>
          </div>
        </div>
        <div className="widget-container2 py-5">
          <div className="title">
            <a className="title_a shadow-xl">
              <img
                className="img_a"
                src="https://images.unsplash.com/photo-1627740283098-1c544d3a479d"
                alt="cleaning"
              ></img>
            </a>
            <div className="title_media">
              <div>
                <h3 className="h3_title font-canela_light font-bold tracking-wide ">
                  Plot Cleaning
                </h3>
                <p className="p_title font-secondary tracking-wide">
                  Cleaning your plot can be a satisfying, positive experience
                  that can instantly signal to everyone around that you care for
                  your plot.
                </p>
                <Link
                  to={"/login"}
                  type="submit"
                  className="w-[50%]  flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-md font-primary text-black bg-[#ffc500] hover:bg-[#9b7b0c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc500]"
                >
                  Clean Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="widget-container2 py-5">
          <div className="title">
            <a className="title_a shadow-xl">
              <img
                className="img_a"
                src="https://images.unsplash.com/photo-1635439954067-78d5811d7789"
                alt="watering"
              ></img>
            </a>
            <div className="title_media">
              <div>
                <h3 className="h3_title font-canela_light font-bold tracking-wide ">
                  Plot Watering
                </h3>
                <p className="p_title font-secondary tracking-wide">
                  Watering your plot grows good quality of grass and maintain a
                  balance in height of the grass.
                </p>
                <Link
                  to={"/login"}
                  type="submit"
                  className="w-[50%]  flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-md font-primary text-black bg-[#ffc500] hover:bg-[#9b7b0c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc500]"
                >
                  Water Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="widget-container2 py-10">
          <div className="title">
            <a className="title_a shadow-xl">
              <img
                className="img_a"
                src="https://images.unsplash.com/photo-1629608934925-725d09a4eb9a"
                alt="grass cutting"
              ></img>
            </a>
            <div className="title_media">
              <div>
                <h3 className="h3_title font-canela_light font-bold tracking-wide ">
                  Plot Grass Cutting
                </h3>
                <p className="p_title font-secondary tracking-wide">
                  Cutting your grass creates immense eveness on would you like
                  it to look like.
                </p>
                <Link
                  to={"/login"}
                  type="submit"
                  className="w-[50%]  flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-md font-primary text-black bg-[#ffc500] hover:bg-[#9b7b0c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc500]"
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Services_WWD /> */}
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
    name: "What We Do?",
    description: "",
    imgPath: "http://localhost:5000/public/what-we-do-2.jpg",
    subtitle: "Clean, maintain, and honor Life",
  },
];

export default WhatWeDo;
