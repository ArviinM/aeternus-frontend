import React from "react";
import "./modal.css";

import LeafletModal from "../map/LeafletModal";

const CemMapModal: React.FC<{ closeModal: any }> = ({ closeModal }) => {
  return (
    <div className="relative z-[500] overflow-hidden">
      <div className="home-hero-guided-modal">
        <div className="home-hero-guided-modal-controls" id="controls">
          <div className="home-hero-guided-modal-controls-inside">
            <button
              className="btn-close home-hero-guided-modal-close text-black text-[1.5rem]"
              onClick={() => closeModal(false)}
            >
              Close
              <span className="btn-close-logo">&#10006;</span>
            </button>
          </div>
        </div>
        <div className="home-hero-guided-modal-container" id="content">
          <div className="home-hero-guided-modal-container-content">
            <div className="w-full" id="inner">
              <div className="hero-orbits-header" id="header text">
                <div className="text-left">
                  <div className="page-intro-eyebrow text-[max(1rem,min(1.77632vw,1.6rem))]">
                    Lost a loved one?
                  </div>
                  <h1 className="text-[#282828] font-title text-[max(2.4rem,min(4.21053vw,4.4rem))]">
                    Locate a Grave
                  </h1>
                  <div className="mt-[max(0.5rem,min(0.5208vw,1rem))] text-[#828282] text-[max(2.2rem,min(1.77632vw,2.8rem))]">
                    Explore our cemetery map
                  </div>
                </div>
              </div>
              <div id="map" className="w-auto h-[80%]">
                <LeafletModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CemMapModal;
