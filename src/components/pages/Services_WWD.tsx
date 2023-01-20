import React from "react";
import "../components.css";

const Services_WWD: React.FC = () => {
  return (
    <div className="md:padding-samp4 padding-samp41 bg-[#fff]">
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
                <h3 className="text-center text-[#282828] font-subtitle  text-[max(1.2rem,min(2.5vw,3.5rem))] mt-0 mr-0 ml-0 mb-[0.4rem]">
                  Cemetery Mapping
                </h3>
                <div className="mt-[0.4rem] text-[#282828] mr-0 ml-0 mb-0 text-center font-gilroy_regular  text-[max(0.6rem,min(2.54737vw,2.5473rem))]  md:text-[max(0.6rem,min(1.44737vw,1.2rem))]">
                  <p>
                    Visualise your cemetery burial plot maps with a full,
                    stunning overview. The graphic interface allows for easy
                    interaction with every, individual plot – at a glance.
                  </p>
                </div>
                <div className="steps__step__link">
                  <a
                    href="/"
                    className="text-[#282828] font-primary2 text-[max(0.6rem,min(2.54737vw,2.5473rem))]  md:text-[max(0.6rem,min(1.44737vw,1.2rem))] block decoration-transparent"
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

export default Services_WWD;
