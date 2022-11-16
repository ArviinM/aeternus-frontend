import React, { useState, useEffect } from "react";

import { getCurrentUser } from "../../services/auth.service";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import "./dashboard.scss";
import { TabTitle } from "../../utils/GenerateFunctions";

const DashboardUserProfile: React.FC = () => {
  TabTitle("Aeternus – User Profile");

  const currentUser = getCurrentUser();

  useEffect(() => {}, []);

  return (
    <div>
      <div className="surface-0 p-4 shadow-2 border-round">
        <div className="text-3xl font-medium mb-3">
          Hello, {currentUser.username}! 🙌🏻
        </div>
        <div className="text-2xl font-medium mb-5">
          Here's your profile information 📖
        </div>
        <div className="border-2 border-dashed border-300">
          <div className="font-medium text-lg my-2 mx-8">
            👤 You are: {currentUser.first_name} {currentUser.last_name}
          </div>
          <div className="font-medium text-lg my-2 mx-8">
            📱 Your number is: {currentUser.contact_no}
          </div>
          <div className="font-medium text-lg my-2 mx-8">
            🗺️ Your address is: {currentUser.address}
          </div>
          <div className="font-medium text-lg my-2 mx-8">
            🪪 Your email is: {currentUser.email}
          </div>
          <div className="font-medium text-lg my-2 mx-8">
            🤖 Your current role (is/are):{" "}
            {currentUser.roles &&
              currentUser.roles.map((role: string, index: number) => (
                <li className="px-3" key={index}>
                  {role}
                </li>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserProfile;
