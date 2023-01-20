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
import UserService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const ContactUs: React.FC = () => {
  TabTitle("Aeternus – Contact Us");
  let navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useRef<any>(null);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    const currentUser = UserService.getCurrentUser();

    UserService.login(username, password).then(
      () => {
        if (currentUser?.roles?.includes("ROLE_ADMIN")) {
          navigate("/dashboard/home");
        } else {
          navigate("/dashboard/user-profile");
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
        toast.current.show({
          severity: "error",
          summary: "Error!",
          detail: resMessage,
          life: 10000,
        });
      }
    );
  };

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
      <div className="padding-samp4 bg-[#FFC500]  ">
        <div className="max-w-[152rem] mx-auto ">
          <div className="px-[0] rounded-[8px] border border-solid bg-white border-[#ddd]">
            {/* <div className="form-box-icon">
              <svg
                className=""
                width="739"
                height="608"
                viewBox="0 0 739 608"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M87.9171 249.883C86.5453 248.511 85.2062 247.106 83.8997 245.635C83.7037 245.439 83.5404 245.211 83.3771 245.015C82.2666 243.74 81.1561 242.499 80.0782 241.192C80.0455 241.159 80.0129 241.126 79.9802 241.094C63.3877 220.738 54.3731 195.546 54.3731 168.917C54.3731 142.32 63.3877 117.128 79.9476 96.7725C79.9803 96.7399 80.0129 96.6746 80.0456 96.6419C81.0908 95.3349 82.2013 94.0933 83.3119 92.819C83.5079 92.6229 83.6712 92.3943 83.8671 92.1982C85.1736 90.7605 86.5127 89.3556 87.8845 87.9832C89.2563 86.6109 90.6608 85.2712 92.1306 83.9643C92.3266 83.7682 92.5226 83.6049 92.7512 83.4415C94.025 82.3306 95.2988 81.2197 96.5726 80.1414C96.6053 80.1087 96.638 80.1087 96.6706 80.0761C117.019 63.4775 142.234 54.4597 168.854 54.4597C195.473 54.4597 220.688 63.4775 241.037 80.0761C241.07 80.1087 241.102 80.1087 241.135 80.1414C242.441 81.2197 243.715 82.2979 244.956 83.4415C245.152 83.6049 245.348 83.8009 245.577 83.9643C247.014 85.2712 248.419 86.6109 249.823 87.9832L319.458 157.644L358 119.088L288.365 49.4276C222.485 -16.4759 115.29 -16.4759 49.4096 49.4276C-16.4699 115.331 -16.4699 222.566 49.4096 288.47C49.9975 289.058 50.4875 289.712 50.8467 290.43C55.1255 295.887 87.9183 328.006 119.176 358L157.587 319.575L87.9171 249.883Z"
                  fill="black"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M152.602 146.214C152.342 146.412 152.083 146.642 151.824 146.84C151.435 147.17 151.046 147.5 150.657 147.862C150.333 148.159 150.009 148.489 149.685 148.819C149.36 149.148 149.036 149.478 148.745 149.808C148.388 150.204 148.064 150.599 147.74 150.995C147.545 151.259 147.319 151.523 147.124 151.786C139.313 162.569 140.48 178.364 150.3 188.356L218.754 258L257 219.089L188.546 149.445C178.726 139.453 163.168 138.266 152.602 146.213L152.602 146.214Z"
                  fill="black"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M590.031 148.974C579.398 138.342 562.058 138.342 551.425 148.974L231 469.395L269.605 508L589.997 187.613C600.662 176.948 600.662 159.641 590.03 148.975L590.031 148.974Z"
                  fill="black"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M309 168.701L239.091 98.7907C219.876 79.5748 194.66 70 169.445 70C144.229 70 119.013 79.6075 99.7979 98.7907C61.4007 137.189 61.4007 199.693 99.7979 238.09L169.707 308L208.399 269.306L138.491 199.396C130.031 190.936 125.473 179.688 125.67 167.72C125.834 157.588 129.408 148.078 135.835 140.438C135.933 140.306 136.031 140.208 136.13 140.077C136.425 139.716 136.753 139.356 137.081 139.028C137.212 138.897 137.343 138.732 137.474 138.601L137.704 138.372C137.966 138.077 138.261 137.814 138.523 137.519L139.31 136.732C139.409 136.634 139.474 136.568 139.573 136.47C139.737 136.339 139.901 136.208 140.032 136.044C140.36 135.749 140.688 135.453 141.016 135.158C141.147 135.027 141.278 134.929 141.442 134.83C149.082 128.436 158.591 124.862 168.691 124.698C180.659 124.501 191.906 129.059 200.366 137.519L270.274 207.43L309 168.701Z"
                  fill="black"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M668.999 169.046C668.999 142.87 658.795 118.228 640.218 99.7218C621.675 81.2162 596.981 71 570.752 71C544.522 71 519.83 81.1836 501.285 99.7218L181 419.351L219.593 457.864L539.878 138.235C556.884 121.264 584.586 121.264 601.593 138.235C618.6 155.207 618.599 182.852 601.593 199.824L281.341 519.486L319.934 558L640.219 238.371C658.796 219.832 669 195.223 669 169.047L668.999 169.046Z"
                  fill="black"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M689.61 49.3911C623.759 -16.4637 516.609 -16.4637 450.757 49.3911L131 369.166L169.525 407.693L489.249 87.9517C510.862 66.3377 539.592 54.453 570.151 54.453C600.71 54.453 629.44 66.3377 651.053 87.9517C672.666 109.566 684.55 138.298 684.55 168.858C684.55 199.419 672.666 228.151 651.053 249.765L331.363 569.473L369.888 608L689.612 288.259C755.463 222.404 755.463 115.248 689.612 49.3928L689.61 49.3911Z"
                  fill="black"
                ></path>
              </svg>
            </div> */}
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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                <Form>
                  <div className="mt-8 w-full m-auto">
                    <div className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <div className="row">
                            <div className="column-test max-w-full my-3">
                              <Field
                                id="first_name"
                                name="first_name"
                                type="text"
                                autoComplete="first_name"
                                placeholder="First Name*"
                                required
                                className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                              />
                              <ErrorMessage
                                name="first_name"
                                component="p"
                                className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                              />
                            </div>
                            <div className="column-test max-w-full my-3">
                              <Field
                                id="last_name"
                                name="last_name"
                                type="text"
                                autoComplete="last_name"
                                placeholder="Last Name*"
                                required
                                className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                              />
                              <ErrorMessage
                                name="last_name"
                                component="p"
                                className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="column-test max-w-full my-3">
                              <Field
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Email Address*"
                                required
                                className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                              />
                              <ErrorMessage
                                name="email"
                                component="p"
                                className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                              />
                            </div>
                            <div className="column-test max-w-full my-3">
                              <Field
                                id="telephone"
                                name="telephone"
                                type="text"
                                autoComplete="contact_number"
                                placeholder="Telephone*"
                                required
                                className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                              />
                              <ErrorMessage
                                name="telephone"
                                component="p"
                                className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="column-test2 max-w-full my-3">
                              <Field
                                id="message"
                                name="message"
                                as="textarea"
                                autoComplete="message"
                                placeholder="Message"
                                required
                                rows="10"
                                className="appearance-none font-primary2 block w-full px-6 py-2 border border-gray-400 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                              />
                              <ErrorMessage
                                name="message"
                                component="p"
                                className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="center justify-center content-center text-center m-0 flex">
                          <button
                            type="submit"
                            className="w-[20%]  flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-md font-primary text-black bg-[#ffc500] hover:bg-[#9b7b0c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffc500]"
                          >
                            SUBMIT
                          </button>
                        </div>
                        <div className="text-black opacity-40 max-w-[700px] margin-disclaimer text-[max(0.92105rem,min(0.72105vw,1rem))]">
                          <p className="mb-8">
                            Aeternus: Cemetery Mapping and Information values
                            your privacy. We will never give, sell, rent or
                            otherwise share your email or personal information
                            with any other organization.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
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
