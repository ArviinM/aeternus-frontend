import React, { useState, useEffect, ChangeEvent, useRef } from "react";

import UserService, { getCurrentUser } from "../../services/auth.service";
import classNames from "classnames";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import "./dashboard.scss";
import { TabTitle } from "../../utils/GenerateFunctions";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
import IUser from "../../types/user.type";
import { Toast } from "primereact/toast";

const DashboardUserProfile: React.FC = () => {
  TabTitle("Aeternus – User Profile");
  let emptyUser: IUser = {
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    address: "",
    contact_no: "",
    email: "",
    password: "",
    newPassword: "",
    roles: [],
  };

  const currentUser = getCurrentUser();
  const [pwDialog, setPwDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [user, setUser] = useState<IUser>(emptyUser);
  const toast = useRef<any>(null);

  useEffect(() => {
    retrieveCurrentUser();
  }, []);

  const hideDialog = () => {
    setPwDialog(false);
  };

  const onInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...user };
    // @ts-ignore
    _user[`${name}`] = val;
    setUser(_user);
  };

  const retrieveCurrentUser = () => {
    setUser(UserService.getCurrentUser());
  };

  const saveUserPW = () => {
    setSubmitted(true);

    if (user.password.trim() && user.newPassword?.trim()) {
      let _user = { ...user };
      if (_user.id) {
        console.log(_user);
        UserService.changePassword(_user.id, _user.password, _user.newPassword)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "User Password Updated",
              life: 3000,
            });
            console.log(_user);
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail:
                "There is an error updating the user password. " + e.message,
              life: 3000,
            });
          });
      }
      setPwDialog(false);
      setUser(emptyUser);
    }
  };

  const pwDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveUserPW}
      />
    </>
  );

  const changeUserPW = (user: IUser) => {
    setUser({ ...user });
    setPwDialog(true);
  };

  return (
    <div>
      <Toast ref={toast} />
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
        <div>
          <Button
            icon="pi pi-key"
            label="Change Password"
            className="my-3 p-button-danger"
            onClick={() => changeUserPW(user)}
          />
        </div>
      </div>

      <Dialog
        visible={pwDialog}
        style={{ width: "450px" }}
        header="Change Password"
        modal
        maximizable
        className="p-fluid"
        footer={pwDialogFooter}
        onHide={hideDialog}
      >
        <div className="field col">
          <label htmlFor="name">Old Password</label>
          <Password
            id="password"
            value={user.password}
            onChange={(e) => onInputChange(e, "password")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !user.password,
            })}
          />
          {submitted && !user.password && (
            <small className="p-error">Password is required.</small>
          )}
        </div>
        <div className="field col">
          <label htmlFor="name">New Password</label>
          <Password
            id="newPassword"
            value={user.newPassword}
            onChange={(e) => onInputChange(e, "newPassword")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !user.newPassword,
            })}
          />
          {submitted && !user.newPassword && (
            <small className="p-error">New Password is required.</small>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default DashboardUserProfile;
