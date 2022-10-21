import React, { useState, useEffect } from "react";
import Deceased from "../../services/deceased.service";
import GravePlot from "../../services/graveplot.service";
import User from "../../services/auth.service";

import IDeceasedData from "../../types/deceased.type";
import IGravePlotData from "../../types/graveplot.type";
import IUser from "../../types/user.type";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import "./dashboard.scss";
import { TabTitle } from "../../utils/GenerateFunctions";

const DashboardHome: React.FC = () => {
  TabTitle("Aeternus – Dashboard");
  const [allDeceased, setAllDeceased] = useState<Array<IDeceasedData>>([]);
  const [allGravePlots, setAllGravePlots] = useState<Array<IGravePlotData>>([]);
  const [allUsers, setAllUsers] = useState<Array<IUser>>([]);

  const retrieveAllDeceased = () => {
    Deceased.getAllDeceased()
      .then((response: any) => {
        setAllDeceased(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const retrieveAllGravePlots = () => {
    GravePlot.getAll()
      .then((response: any) => {
        setAllGravePlots(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const retrieveAllUsers = () => {
    User.getAllUsers()
      .then((response: any) => {
        setAllUsers(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveAllDeceased();
    retrieveAllGravePlots();
    retrieveAllUsers();
  }, []);

  return (
    <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
      <div className="">
        <div className="card mb-0">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-600 font-medium mb-3">
                Deceased
              </span>
              <div className="text-900 font-medium text-xl">
                {allDeceased.length}
              </div>
            </div>
            <div
              className="flex items-center justify-center bg-blue-100 rounded-lg"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-database text-blue-500 text-xl" />
            </div>
          </div>
          <div className="inline">
            <span className="text-green-500 font-medium">
              {allDeceased.length} new{" "}
            </span>
            <span className="text-gray-600">since last data</span>
          </div>
        </div>
      </div>
      <div className="">
        <div className="card mb-0">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-600 font-medium mb-3">
                Grave Plots
              </span>
              <div className="text-900 font-medium text-xl">
                {allGravePlots.length}
              </div>
            </div>
            <div
              className="flex items-center justify-center bg-orange-100 rounded-lg"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-map-marker text-orange-500 text-xl" />
            </div>
          </div>
          <div className="inline">
            <span className="text-green-500 font-medium">
              {allGravePlots.length} new{" "}
            </span>
            <span className="text-gray-600">since last data</span>
          </div>
        </div>
      </div>
      <div className="">
        <div className="card mb-0">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-600 font-medium mb-3">
                Users
              </span>
              <div className="text-900 font-medium text-xl">
                {allUsers.length}
              </div>
            </div>
            <div
              className="flex items-center justify-center bg-cyan-100 rounded-lg"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-users text-cyan-500 text-xl" />
            </div>
          </div>
          <div className="inline">
            <span className="text-green-500 font-medium">
              {allUsers.length}{" "}
            </span>
            <span className="text-gray-600">newly registered</span>
          </div>
        </div>
      </div>
      <div className="">
        <div className="card mb-0">
          <div className="flex justify-between mb-3">
            <div>
              <span className="block text-gray-600 font-medium mb-3">
                Comments
              </span>
              <div className="text-900 font-medium text-xl">152 Unread</div>
            </div>
            <div
              className="flex items-center justify-center bg-purple-100 rounded-lg"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-comment text-purple-500 text-xl" />
            </div>
          </div>
          <div className="inline">
            <span className="text-green-500 font-medium">85 </span>
            <span className="text-gray-600">responded</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
