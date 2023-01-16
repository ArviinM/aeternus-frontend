/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

import { TabTitle } from "../../utils/GenerateFunctions";
import CemMap from "../map/CemMap";

import "../components.css";
import "./home.scss";
import "primeicons/primeicons.css";
import WordCarousel1 from "./WordCarousel1";
import HomeServices from "./HomeServices";

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
      <div className="padding-samp4 bg-white text-gray-900  ">
        <div className="w-[83%] max-w-[126rem] mx-auto ">
          <div className="text-center">
            <div className="font-primary leading-[1]  tracking-widest mb-5 text-[#abacaa] ">
              OUR PURPOSE
            </div>
            <h2 className="text-[max(2.4rem,min(3.21053vw,3.4rem))] font-canela_medium ">
              Since 2022, we started a vision on how we innovate the current
              systems of big cemeteries around the Philippines. We have been
              honored to deliver the convenience experience around the{" "}
              <span className="font-canela_medium_italic">
                {" "}
                community of Biñan City Cemetery
              </span>
              . We exist to serve the unique needs of every family. Learn our
              story. Lean on us. And let our expertise lead you through the best
              experience possible.
            </h2>
            <p className="font-cursive leading-[1.2] text-[max(2.0rem,min(6.77083vw,5.0rem))] font-medium text-[#ffc500]">
              Words we live by
            </p>
          </div>
        </div>
      </div>
      <WordCarousel1 />
      <HomeServices />
      <div className="padding-samp4 bg-white text-gray-900  ">
        <div className="w-[83%] max-w-[126rem] mx-auto ">
          <div className="text-center">
            {/* <div className="font-primary leading-[1]  tracking-widest mb-5 text-[#abacaa] ">
              OUR PURPOSE
            </div> */}
            <h2 className="text-[max(2.8rem,min(4.21053vw,3.8rem))] font-subtitle ">
              OUR TEAM
            </h2>
            <p className="font-cursive -mt-10 leading-[1.2] text-[max(2.0rem,min(6.77083vw,5.0rem))] font-medium text-[#ffc500]">
              Meet our Aeternus staff
            </p>
            <p className="font-gilroy_medium leading-[1.4] text-[max(1.6rem,min(1.77632vw,0.8rem))] max-w-6xl text-center m-auto text-[#828282]">
              We're members of the local and outside community who developed to
              innovate small to big scale cemeteries to take better of mapping
              and information systems. We're committed on the vision we want to
              share to the world.
            </p>
          </div>
        </div>
        <div className="pt-[max(3rem,min(3.255vw,6rem))] mx-auto ">
          <div className="staff">
            <div className="justify-center staff_slider keen_slider">
              <div className="staff_member keen-slider__slide mx-3">
                <a className="staff__member__inner cursor-pointer">
                  <div>
                    <div className="staff__member__img">
                      <img
                        className="h-full max-w-full object-cover m-auto grayscale"
                        alt="arvin_m"
                        src="http://localhost:5000/public/staff/arvin_m.jpg"
                      />
                    </div>
                  </div>
                  <div className="staff__member__content bg-[#ffc500] ">
                    <p>Arvin Rhen A. Medina</p>
                  </div>
                </a>
              </div>
              <div className="staff_member keen-slider__slide mx-3">
                <a className="staff__member__inner">
                  <div>
                    <div className="staff__member__img">
                      <img
                        className="h-full max-w-full object-cover m-auto"
                        alt="victor"
                        src="http://localhost:5000/public/staff/victor.jpg"
                      />
                    </div>
                  </div>
                  <div className="staff__member__content bg-[#ffc500] ">
                    <p>Victor E. Casco</p>
                  </div>
                </a>
              </div>
              <div className="staff_member keen-slider__slide mx-3">
                <a className="staff__member__inner">
                  <div>
                    <div className="staff__member__img">
                      <img
                        className="h-full max-w-full object-cover m-auto grayscale"
                        alt="louis"
                        src="http://localhost:5000/public/staff/louis.jpg"
                      />
                    </div>
                  </div>
                  <div className="staff__member__content bg-[#ffc500] ">
                    <p>Celerino Louis M. De Ocampo</p>
                  </div>
                </a>
              </div>
              <div className="staff_member keen-slider__slide mx-3">
                <a className="staff__member__inner">
                  <div>
                    <div className="staff__member__img">
                      <img
                        className="h-full max-w-full object-cover m-auto grayscale"
                        alt="mark"
                        src="http://localhost:5000/public/staff/mark.jpg"
                      />
                    </div>
                  </div>
                  <div className="staff__member__content bg-[#ffc500] ">
                    <p>Mark N. Magallanes</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
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
