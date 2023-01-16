import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeParams } from "primereact/multiselect";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";

import "./dashboard.scss";
import IGravePlotData from "../../types/graveplot.type";

import { FilterMatchMode, Password } from "primereact";
import { TabTitle } from "../../utils/GenerateFunctions";
import IUser from "../../types/user.type";
import UserService, { deleteUser } from "../../services/auth.service";

interface IFilter {
  global?: any;
  name?: any;
}

const UserTable: React.FC = () => {
  TabTitle("Aeternus – User Table");

  let emptyUser: IUser = {
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    address: "",
    contact_no: "",
    email: "",
    password: "",
    roles: [],
  };

  const [allUsers, setAllUsers] = useState<Array<IUser>>([]);

  const [user, setUser] = useState<IUser>(emptyUser);
  const [userDialog, setUserDialog] = useState(false);
  const [pwDialog, setPwDialog] = useState(false);

  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteSelectedUserDialog, setSelectedUserDialog] = useState(false);

  const [selectedUser, setSelectedUser] = useState<IUser[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState<IFilter | null>(null);
  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  const [selectedRole, setSelectedRole] = useState<Array<string> | undefined>(
    []
  );

  const roles = [
    { name: "admin", role: "ROLE_ADMIN" },
    { name: "user", role: "ROLE_USER" },
    { name: "moderator", role: "ROLE_MODERATOR" },
  ];

  const retrieveAllUsers = () => {
    UserService.getAllUsers()
      .then((response: any) => {
        setAllUsers(response?.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveAllUsers();
    initFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
    setUser(emptyUser);
    setSelectedRole([]);
    setPwDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const hideDeleteSelectedUserDialog = () => {
    setSelectedUserDialog(false);
  };

  const saveUser = () => {
    setSubmitted(true);

    if (user.first_name.trim() && user.last_name.trim()) {
      let _user = { ...user };
      _user.roles = selectedRole;

      if (_user.id) {
        UserService.updateUser(_user.id, _user)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "User Updated",
              life: 3000,
            });
            retrieveAllUsers();
            console.log(_user);
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail:
                "There is an error updating the user information." + e.message,
              life: 3000,
            });
          });
        setUserDialog(false);
        setUser(emptyUser);
      } else {
        UserService.register(_user)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "User Created",
              life: 3000,
            });
            retrieveAllUsers();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error creating the user information. " + e,
              life: 5000,
            });
          });
        setUserDialog(false);
        setUser(emptyUser);
      }
    }
  };

  const saveUserPW = () => {
    setSubmitted(true);
    let _user = { ...user };

    if (_user.id) {
      UserService.adminChangePW(_user.id, _user.password)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "User Password Updated",
            life: 3000,
          });
          retrieveAllUsers();
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
  };

  const editUser = (user: IUser) => {
    setSelectedRole(user.roles);
    setUser({ ...user });
    setUserDialog(true);
  };

  const editPassword = (user: IUser) => {
    setUser({ ...user });
    setPwDialog(true);
  };

  const confirmDeleteUser = (user: IUser) => {
    setUser(user);
    setDeleteUserDialog(true);
  };

  const deleteUser = () => {
    let _user = { ...user };

    console.log("test");
    console.log(_user);

    if (_user.id) {
      UserService.deleteUser(_user.id)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "User deleted",
            life: 3000,
          });
          retrieveAllUsers();
        })
        .catch((e) => {
          console.log(e);
          toast.current.show({
            severity: "error",
            summary: "Error!",
            detail: "There is an error deleting the user.",
            life: 3000,
          });
        });
    }

    retrieveAllUsers();
    setDeleteUserDialog(false);
    setUser(emptyUser);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setSelectedUserDialog(true);
  };

  const deleteSelectedUser = () => {
    let index: any[] = [];
    for (let i = 0; i < selectedUser.length; i++) {
      index.push(selectedUser[i].id);
    }

    setSelectedUserDialog(false);

    if (index) {
      index.forEach((e) => {
        UserService.deleteUser(e)
          .then((response) => {
            retrieveAllUsers();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error deleting the User.",
              life: 3000,
            });
          });
      });

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "User deleted",
        life: 3000,
      });

      setSelectedUser([]);
    }
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue("");
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
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

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedUser || !selectedUser.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const firstNameBodyTemplate = (rowData: IUser) => {
    return (
      <>
        <span className="p-column-title">First Name</span>
        {rowData.first_name}
      </>
    );
  };

  const lastNameBodyTemplate = (rowData: IUser) => {
    return (
      <>
        <span className="p-column-title">Last Name</span>
        {rowData.last_name}
      </>
    );
  };

  const userNameBodyTemplate = (rowData: IUser) => {
    return (
      <>
        <span className="p-column-title">Username</span>
        {rowData.username}
      </>
    );
  };

  const addressBodyTemplate = (rowData: IUser) => {
    return (
      <>
        <span className="p-column-title">Address</span>
        {rowData.address}
      </>
    );
  };

  const contactNoBodyTemplate = (rowData: IUser) => {
    return (
      <>
        <span className="p-column-title">Contact Number</span>
        {rowData.contact_no}
      </>
    );
  };

  const emailBodyTemplate = (rowData: IUser) => {
    return (
      <>
        <span className="p-column-title">Email</span>
        {rowData.email}
      </>
    );
  };

  const rolesBodyTemplate = (rowData: IUser) => {
    return (
      <>
        <span className="p-column-title">Role(s)</span>
        {/* <span className="uppercase">{rowData.roles}</span> */}
        {rowData.roles &&
          rowData.roles.map((role: string, index: number) => (
            <li className="px-3 uppercase" key={index}>
              ROLE_{role}
            </li>
          ))}
      </>
    );
  };

  const actionBodyTemplate = (rowData: IUser) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-user-edit"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editUser(rowData)}
          placeholder="Top"
          tooltip="Edit user information"
        />

        <Button
          icon="pi pi-key"
          className="p-button-rounded p-button-danger mr-2"
          onClick={() => editPassword(rowData)}
          placeholder="Top"
          tooltip="Edit password"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteUser(rowData)}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h5 className="m-0">Manage Registered Users</h5>

        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={globalFilterValue}
            onInput={onGlobalFilterChange}
            placeholder="Search..."
          />
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            className="p-button-outlined mx-2"
            onClick={clearFilter}
          />
        </span>
      </div>
    );
  };

  const userDialogFooter = (
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
        onClick={saveUser}
      />
    </>
  );

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

  const deleteSelectedUserFooterDialog = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteSelectedUserDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedUser}
      />
    </>
  );

  const deleteUserFooterDialog = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteUserDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteUser}
      />
    </>
  );

  const header = renderHeader();

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={allUsers}
          selection={selectedUser}
          onSelectionChange={(e) => setSelectedUser(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          globalFilter={globalFilterValue}
          header={header}
          responsiveLayout="scroll"
          emptyMessage="No users found 👤"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="first_name"
            header="First Name"
            filter
            filterPlaceholder="Search by first name..."
            body={firstNameBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="last_name"
            header="Last Name"
            filter
            filterPlaceholder="Search by last name..."
            body={lastNameBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="username"
            header="Username"
            filter
            filterPlaceholder="Search by username..."
            body={userNameBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="address"
            header="Address"
            body={addressBodyTemplate}
            sortable
            filter
            filterPlaceholder="Search by address..."
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="contact_no"
            header="Contact Number"
            body={contactNoBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="email"
            header="Email"
            body={emailBodyTemplate}
            sortable
            filter
            filterPlaceholder="Search by email..."
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="roles"
            header="Roles"
            body={rolesBodyTemplate}
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "15rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={userDialog}
        style={{ width: "450px" }}
        header="User Details"
        modal
        maximizable
        className="p-fluid"
        footer={userDialogFooter}
        onHide={hideDialog}
      >
        <div className="field col">
          <label htmlFor="name">First Name</label>
          <InputText
            id="first_name"
            value={user.first_name}
            onChange={(e) => onInputChange(e, "first_name")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !user.first_name,
            })}
          />
          {submitted && !user.first_name && (
            <small className="p-error">First Name is required.</small>
          )}
        </div>

        <div className="field col">
          <label htmlFor="name">Last Name</label>
          <InputText
            id="last_name"
            value={user.last_name}
            onChange={(e) => onInputChange(e, "last_name")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !user.last_name,
            })}
          />
          {submitted && !user.last_name && (
            <small className="p-error">Last Name is required.</small>
          )}
        </div>

        <div className="field col">
          <label htmlFor="name">Username</label>
          <InputText
            id="username"
            value={user.username}
            onChange={(e) => onInputChange(e, "username")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !user.username,
            })}
          />
          {submitted && !user.username && (
            <small className="p-error">Username is required.</small>
          )}
        </div>

        <div className="field col">
          <label htmlFor="name">Address</label>
          <InputText
            id="address"
            value={user.address}
            onChange={(e) => onInputChange(e, "address")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !user.address,
            })}
          />
          {submitted && !user.address && (
            <small className="p-error">Address is required.</small>
          )}
        </div>

        <div className="field col">
          <label htmlFor="name">Contact Number</label>
          <InputText
            id="contact_no"
            value={user.contact_no}
            onChange={(e) => onInputChange(e, "contact_no")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !user.contact_no,
            })}
          />
          {submitted && !user.contact_no && (
            <small className="p-error">Contact Number is required.</small>
          )}
        </div>

        <div className="field col">
          <label htmlFor="name">Email</label>
          <InputText
            id="email"
            value={user.email}
            onChange={(e) => onInputChange(e, "email")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !user.email,
            })}
          />
          {submitted && !user.email && (
            <small className="p-error">Email is required.</small>
          )}
        </div>

        <div className="field col">
          <label htmlFor="name">Password</label>
          <Password
            id="username"
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

        <div className="field">
          <label>Roles</label>
          <MultiSelect
            value={selectedRole}
            options={roles}
            onChange={(e) => setSelectedRole(e.value)}
            placeholder="Select a Role"
            maxSelectedLabels={3}
            optionLabel="role"
            optionValue="name"
            display="chip"
          />
        </div>
      </Dialog>

      <Dialog
        visible={pwDialog}
        style={{ width: "450px" }}
        header="Force Change Password"
        modal
        maximizable
        className="p-fluid"
        footer={pwDialogFooter}
        onHide={hideDialog}
      >
        <div className="field col">
          <label htmlFor="name">Password</label>
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
      </Dialog>

      <Dialog
        visible={deleteUserDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteUserFooterDialog}
        onHide={hideDeleteUserDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {user && (
            <span>
              Are you sure you want to delete{" "}
              <b>
                {user.first_name} {user.last_name}
              </b>
              ?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteSelectedUserDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteSelectedUserFooterDialog}
        onHide={hideDeleteSelectedUserDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {user && (
            <span>Are you sure you want to delete the selected user?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default UserTable;
