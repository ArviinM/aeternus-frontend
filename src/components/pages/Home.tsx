import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

import { TabTitle } from "../../utils/GenerateFunctions";
import PictureCarousel from "./PictureCarousel";
import HomeServices from "./HomeServices";
import CemMapModal from "../modal/CemMapModal";

import "../components.css";
import "./home.scss";

const Home: React.FC = () => {
  const [openCemMapModal, setOpenCemMapModal] = useState(false);
  TabTitle("Aeternus – Home");
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
      <div className="w-full bg-[#ffc500] ">
        {openCemMapModal && <CemMapModal closeModal={setOpenCemMapModal} />}
        <div className="home-main">
          <div className="second padding-samp">
            <button className="padding-samp2 button-main disabled">
              <span className="text-center navigation-media">
                <img
                  className="img-main"
                  src="https://cdn.f1connect.net/media/180358/r/64x0/icon-obituaries.png, https://cdn.f1connect.net/media/180358/icon-obituaries.png"
                  alt="carousel-pic"
                />
              </span>
              <span className="span-body">
                <span className="span-title font-primary">
                  Find an Obituary
                </span>
                <span className="span-subtitle font-subtitle">
                  Find a loved one, share a memory, send a gift.
                </span>
              </span>
              <span className="text-black text-[130%] right-[max(1rem,min(1.31579vw,2rem))]">
                &#10095;
              </span>
            </button>
          </div>
          <div className="second padding-samp ">
            {/* <Link to="/cemetery-map"> */}
            <button
              className="padding-samp2 button-main"
              onClick={() => {
                setOpenCemMapModal(true);
              }}
            >
              <span className="text-center navigation-media">
                <img
                  className="img-main"
                  src="https://cdn.f1connect.net/media/180359/r/64x0/icon-immediate-need.png, https://cdn.f1connect.net/media/180359/icon-immediate-need.png"
                  alt="carousel-pic"
                />
              </span>
              <span className="pr-6 flex-[1] pl-6">
                <span className="span-title font-primary">
                  Lost a loved one
                </span>
                <span className="span-subtitle font-subtitle">
                  Cannot find a loved one, locate at cemetery map.
                </span>
              </span>
              <span className="text-black text-[130%]">&#10095;</span>
            </button>
            {/* </Link> */}
          </div>
          <div className="second padding-samp">
            <button className="padding-samp2 button-main">
              <span className="text-center navigation-media">
                <img
                  className="img-main"
                  src="https://cdn.f1connect.net/media/180360/r/64x0/icon-plan-ahead.png,%20https://cdn.f1connect.net/media/180360/icon-plan-ahead.png"
                  alt="carousel-pic"
                />
              </span>
              <span className="pr-6 flex-[1] pl-6">
                <span className="span-title font-primary">Grave Services</span>
                <span className="span-subtitle font-subtitle">
                  Need cleaning, grass cutting and watering?
                </span>
              </span>
              <span className="text-black text-[130%]">&#10095;</span>
            </button>
          </div>
        </div>
      </div>
      <div className="padding-samp4 bg-white text-gray-900  ">
        <div className="w-[83%] max-w-[126rem] mx-auto ">
          <div className="text-center">
            <div className="font-primary leading-[1]  tracking-widest mb-5 text-[#abacaa] ">
              WE AT AETERNUS
            </div>
            <h2 className="text-[max(2.4rem,min(4.21053vw,4.4rem))] font-bold font-subtitle leading-[1.3] ">
              We create maps and routes, obituaries, providing services to your
              deceased loved ones' grave.
            </h2>
            <p className="mb-5 font-cursive leading-[1.2] text-[max(1.5rem,min(6.77083vw,4.5rem))] text-[#ffc500]">
              A path to peace and efficiency.
            </p>
          </div>
        </div>
      </div>
      <PictureCarousel />
      <HomeServices />
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
            <p className="mb-5 animate-textShow font-primary uppercase tracking-widest text-[#abacaa]">
              {item.description}
            </p>
            <h1 className="mb-2 text-[max(3.5rem,min(5.20833vw,5.3rem))] font-bold animate-textShow2 font-title leading-[1.3] text-white">
              {item.name}
            </h1>
            <p className="mb-5 animate-textShow font-cursive lowercase text-[max(3.5rem,min(7.8125vw,5rem))] text-[#ffc500]">
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
    name: "Biñan City Cemetery",
    description: "Welcome to",
    imgPath: "http://localhost:5000/public/binan-city-4.jpg",
    subtitle: "a place of peace",
  },
  {
    name: "Helping Families Connect, Honor, Locate, & Remember",
    description: "Aeternus • A Cemetery Mapping and Information System",
    imgPath: "http://localhost:5000/public/slide-1.jpg",
    subtitle: "",
  },
  {
    name: "Guiding Families Locating their Deceased Loved Ones Grave Plot",
    description: "Aeternus • A Cemetery Mapping and Information System",
    imgPath: "http://localhost:5000/public/slide-2.jpg",
    subtitle: "",
  },
  {
    name: "Explore our Cemetary Interactive Map",
    description: "Aeternus • A Cemetery Mapping and Information System",
    imgPath: "http://localhost:5000/public/cmis-plot-example-2.jpg",
    subtitle: "",
  },
];

export default Home;
