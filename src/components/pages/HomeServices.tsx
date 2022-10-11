import React from "react";
import "../components.css";

const HomeServices: React.FC = () => {
  return (
    <div className="padding-samp4 bg-[#ffc500]">
      <div className="widget-container2 ">
        <div className="mx-auto max-w-[152rem] pt-0 ">
          <div className="steps2 ">
            <div className="steps_step steps--odd">
              <div className="">
                <img
                  className="steps__step__img aspect-square w-[max(5rem,min(10.41667vw,12rem))]"
                  src="https://cdn.f1connect.net/media/159672/r/200x200/memorial-arrangements.png,%20https://cdn.f1connect.net/media/159672/r/400x400/memorial-arrangements.png"
                  alt="icon"
                ></img>
              </div>
              <div className="m-0 p-0">
                <h3 className="text-center text-[#282828] font-subtitle font-bold text-[max(1.2rem,min(2.5vw,3.5rem))] mt-0 mr-0 ml-0 mb-[0.4rem]">
                  Cemetery Mapping
                </h3>
                <div className="mt-[0.4rem] mr-0 ml-0 mb-0 text-center font-secondary font-bold text-[max(0.6rem,min(1.44737vw,1.2rem))]">
                  <p>
                    Visualise your cemetery burial plot maps with a full,
                    stunning overview. The graphic interface allows for easy
                    interaction with every, individual plot – at a glance.
                  </p>
                </div>
                <div className="steps__step__link">
                  <a
                    href="/"
                    className="text-black font-bold font-primary text-[max(0.6rem,min(1.44737vw,1.2rem))] block decoration-transparent"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="steps_step steps--odd">
              <div className="">
                <img
                  className="steps__step__img aspect-square w-[max(5rem,min(10.41667vw,12rem))]"
                  src="https://cdn.f1connect.net/media/159552/r/200x200/holding-hands.png,%20https://cdn.f1connect.net/media/159552/r/400x400/holding-hands.png"
                  alt="icon"
                ></img>
              </div>
              <div className="m-0 p-0">
                <h3 className="text-center text-[#282828] font-subtitle font-bold text-[max(1.2rem,min(2.5vw,3.5rem))] mt-0 mr-0 ml-0 mb-[0.4rem]">
                  24/7/365 Care
                </h3>
                <div className="mt-[0.4rem] mr-0 ml-0 mb-0 text-center font-secondary font-bold text-[max(0.6rem,min(1.44737vw,1.2rem))]">
                  <p>
                    For generations we have stood by our commitment to caring
                    for our community. We're here for you anytime you need us.
                  </p>
                </div>
                <div className="steps__step__link">
                  <a
                    href="/"
                    className="text-black font-bold font-primary text-[max(0.6rem,min(1.44737vw,1.2rem))] block decoration-transparent"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="steps_step steps--odd">
              <div className="">
                <img
                  className="steps__step__img aspect-square w-[max(5rem,min(10.41667vw,12rem))]"
                  src="https://cdn.f1connect.net/media/159671/r/200x200/signature-services.png,%20https://cdn.f1connect.net/media/159671/r/400x400/signature-services.png"
                  alt="icon"
                ></img>
              </div>
              <div className="m-0 p-0">
                <h3 className="text-center text-[#282828] font-subtitle font-bold text-[max(1.2rem,min(2.5vw,3.5rem))] mt-0 mr-0 ml-0 mb-[0.4rem]">
                  Virtual Appointments
                </h3>
                <div className="mt-[0.4rem] mr-0 ml-0 mb-0 text-center font-secondary font-bold text-[max(0.6rem,min(1.44737vw,1.2rem))]">
                  <p>
                    All arrangements can now be made remotely. We'll work
                    together however you feel comfortable, whether it's by
                    phone, video conference or email.
                  </p>
                </div>
                <div className="steps__step__link">
                  <a
                    href="/"
                    className="text-black font-bold font-primary text-[max(0.6rem,min(1.44737vw,1.2rem))] block decoration-transparent"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeServices;
