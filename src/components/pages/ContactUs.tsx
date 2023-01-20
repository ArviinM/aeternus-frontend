/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { TabTitle } from "../../utils/GenerateFunctions";
import CemMap from "../map/CemMap";

import "../components.css";
import "./home.scss";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import UserService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import { Toast } from "primereact/toast";

const ContactUs: React.FC = () => {
  TabTitle("Aeternus – Contact Us");
  const toast = useRef<any>(null);
  const [state, handleSubmit] = useForm("xqkoagal");

  return (
    <div className="font-sans text-center bg-white -z-50 ">
      <Toast ref={toast} className="text-left" />
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
      <div className="padding-samp4 bg-[#FFC500]  ">
        <div className="max-w-[152rem] mx-auto ">
          <div className="px-[0] rounded-[8px] border border-solid bg-white border-[#ddd]">
            <div className="max-w-[112rem] w-[83.333%] relative mx-auto ">
              <div className="text-center ">
                <div className="eyebrow leading-[1] font-primary uppercase mt-8">
                  <p>Email Us</p>
                </div>
                <h2 className="capitalize text-[max(2.4rem,min(4.21053vw,4.4rem))] font-subtitle leading-[1.5] text-[#282828]">
                  Send A Note
                </h2>
                <div className="font-gilroy_medium leading-[1.4] text-[max(1.6rem,min(1.77632vw,0.8rem))] text-[#828282] mb-5">
                  <p>
                    Reach out by filling out the form below. We promise to be
                    responsive and quickly address any questions or concerns you
                    may have.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mt-8 w-full m-auto">
                  <div className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <div className="row">
                          <div className="column-test max-w-full my-3">
                            <input
                              id="first_name"
                              name="first_name"
                              type="text"
                              autoComplete="first_name"
                              placeholder="First Name*"
                              required
                              className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            />
                            <ValidationError
                              prefix="First Name"
                              field="first_name"
                              errors={state.errors}
                              className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                            />
                          </div>
                          <div className="column-test max-w-full my-3">
                            <input
                              id="last_name"
                              name="last_name"
                              type="text"
                              autoComplete="last_name"
                              placeholder="Last Name*"
                              required
                              className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            />
                            <ValidationError
                              prefix="Last Name"
                              field="last_name"
                              errors={state.errors}
                              className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column-test max-w-full my-3">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              placeholder="Email Address*"
                              required
                              className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            />
                            <ValidationError
                              prefix="Email"
                              field="email"
                              errors={state.errors}
                              className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                            />
                          </div>
                          <div className="column-test max-w-full my-3">
                            <input
                              id="telephone"
                              name="telephone"
                              type="text"
                              autoComplete="contact_number"
                              placeholder="Telephone*"
                              required
                              className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            />
                            <ValidationError
                              prefix="Telephone"
                              field="telephone"
                              errors={state.errors}
                              className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="column-test2 max-w-full my-3">
                            <textarea
                              id="message"
                              name="message"
                              autoComplete="message"
                              placeholder="Message"
                              rows={10}
                              className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="center justify-center content-center text-center m-0 flex">
                        <button
                          disabled={state.submitting}
                          type="submit"
                          className="w-[20%]  flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-md font-primary text-black bg-[#ffc500] hover:bg-[#9b7b0c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc500]"
                          onClick={() => {
                            if (state.succeeded) {
                              console.log(state);
                              return toast.current.show({
                                severity: "success",
                                summary: "Success",
                                detail:
                                  "Great! You have successfully sent an email!",
                                life: 10000,
                              });
                            } else {
                              console.log(state);
                              return toast.current.show({
                                severity: "error",
                                summary: "Error!",
                                detail:
                                  "There's a problem with the details you provided.",
                                life: 10000,
                              });
                            }
                          }}
                        >
                          SUBMIT
                        </button>
                      </div>
                      <div className="text-black opacity-40 max-w-[700px] margin-disclaimer text-[max(0.92105rem,min(0.72105vw,1rem))]">
                        <p className="mb-8">
                          Aeternus: Cemetery Mapping and Information values your
                          privacy. We will never give, sell, rent or otherwise
                          share your email or personal information with any
                          other organization.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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
    name: "We're here for you",
    description: "",
    imgPath: "http://localhost:5000/public/contact-us.jpg",
    subtitle: "Anytime, day or night",
  },
];

export default ContactUs;
