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
import GravePlot from "../../services/graveplot.service";
import UserServiceRequest from "../../services/service_request.service";
import IUserServiceRequest from "../../types/service_request.type";

interface IFilter {
  global?: any;
  name?: any;
}

const ServiceRequestTable: React.FC = () => {
  TabTitle("Aeternus – User Service Request Table");

  let currentUser = UserService.getCurrentUser();

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
    grave_block: "",
    grave_lot: "",
    grave_plot: {
      id: "",
      block: {
        id: "",
        name: [],
      },
      lot: [],
    },
  };

  let emptyUserReq: IUserServiceRequest = {
    id: "",
    service: [],
    user: { id: "", username: "" },
    request: { id: "", name: "" },
    graveplot: { id: "", block: { id: "", name: "" }, lot: "" },
    createdAt: "",
    updatedAt: "",
  };

  const [allUserRequest, setAllUserRequest] = useState<
    Array<IUserServiceRequest>
  >([]);
  const [userService, setUserService] =
    useState<IUserServiceRequest>(emptyUserReq);

  const [selectedRequestService, setSelectedRequestService] = useState<
    IUserServiceRequest[]
  >([]);

  const [userServiceDialog, setUserServiceDialog] = useState(false);
  const [requestDialog, setRequestDialog] = useState(false);

  const [allGravePlots, setAllGravePlots] = useState<Array<IGravePlotData>>([]);

  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteSelectedUserDialog, setSelectedUserDialog] = useState(false);

  const [selectedUser, setSelectedUser] = useState<IUser[]>([]);

  const [submitted, setSubmitted] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState<IFilter | null>(null);
  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  const [allBlocks, setAllBlocks] = useState<Array<any>>([]);
  const [disabled, setDisabled] = useState(true);
  const [selectedService, setSelectedService] = useState<Array<string>>([]);

  const service = [
    { name: "Plot Grass Cutting" },
    { name: "Plot Cleaning" },
    { name: "Plot Watering" },
  ];

  const blocks = [
    { name: "1", id: "63c7ad8efb9fe79294b6287c" },
    { name: "2", id: "63c7ad8efb9fe79294b6287d" },
    { name: "3", id: "63c7ad8efb9fe79294b6287e" },
    { name: "4", id: "63c7ad8efb9fe79294b6287f" },
  ];

  const request = [
    { name: "Finished", id: "63c7ad8efb9fe79294b6286a" },
    { name: "Pending", id: "63c7ad8efb9fe79294b6286c" },
    { name: "Denied", id: "63c7ad8efb9fe79294b6286b" },
  ];

  // const retrieveAllUserServiceRequest = () => {
  //   const getCurrentUser = UserService.getCurrentUser();

  //   UserServiceRequest.getAllUserServiceRequest(getCurrentUser.id)
  //     .then((response: any) => {
  //       setAllUserRequest(response?.data);
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //     });
  // };

  const retrieveAllServiceRequest = () => {
    UserServiceRequest.getAllServiceRequest()
      .then((response: any) => {
        setAllUserRequest(response?.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const retrieveAllGravePlots = () => {
    GravePlot.getAll()
      .then((response: any) => {
        setAllGravePlots(response?.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // retrieveAllUserServiceRequest();
    retrieveAllServiceRequest();
    retrieveAllGravePlots();
    initFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setSubmitted(false);
    setUserServiceDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserServiceDialog(false);
    setUserService(emptyUserReq);
    setSelectedService([]);
    setRequestDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const hideDeleteSelectedUserDialog = () => {
    setSelectedUserDialog(false);
  };

  const saveUser = () => {
    setSubmitted(true);

    if (userService.service) {
      let _userService = { ...userService };

      console.log(_userService);
      if (_userService.id) {
        UserServiceRequest.updateUserServiceRequest(_userService.id, {
          request: { id: _userService.request.id },
        })
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Request Status changed!",
              life: 5000,
            });
            // retrieveAllUserServiceRequest();
            retrieveAllServiceRequest();
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
      } else {
        let __userService = {
          service: selectedService,
          user: { id: _userService.id },
          request: { id: "63c7ad8efb9fe79294b6286c" },
          graveplot: { id: _userService.graveplot.id },
        };

        UserServiceRequest.createUserServiceRequest(__userService)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "User Service Created",
              life: 3000,
            });
            retrieveAllServiceRequest();
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
      }
      setRequestDialog(false);
      setUserServiceDialog(false);
      setUserService(emptyUserReq);
    }
  };

  // const editUserServiceRequest = (service: IUserServiceRequest) => {
  //   setUserService({ ...service });
  //   setUserServiceDialog(true);
  // };

  const confirmDeleteUser = (service: IUserServiceRequest) => {
    setUserService(service);
    setDeleteUserDialog(true);
  };

  const editRequestStatus = (service: IUserServiceRequest) => {
    setUserService({ ...service });
    setRequestDialog(true);
  };

  const deleteUser = () => {
    let _userService = { ...userService };

    if (_userService.id) {
      UserServiceRequest.deleteUserServiceRequest(_userService.id)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Service Request Deleted!",
            life: 3000,
          });
          // retrieveAllUserServiceRequest();
          retrieveAllServiceRequest();
        })
        .catch((e) => {
          console.log(e);
          toast.current.show({
            severity: "error",
            summary: "Error!",
            detail: "There is an error deleting the requested service.",
            life: 3000,
          });
        });
    }

    // retrieveAllUserServiceRequest();
    retrieveAllServiceRequest();
    setDeleteUserDialog(false);
    setUserService(emptyUserReq);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setSelectedUserDialog(true);
  };

  const deleteSelectedUser = () => {
    let index: any[] = [];
    for (let i = 0; i < selectedRequestService.length; i++) {
      index.push(selectedRequestService[i].id);
    }

    setSelectedUserDialog(false);

    if (index) {
      index.forEach((e) => {
        UserServiceRequest.deleteUserServiceRequest(e)
          .then((response) => {
            // retrieveAllUserServiceRequest();
            retrieveAllServiceRequest();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error deleting the service request.",
              life: 3000,
            });
          });
      });

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Service Request deleted",
        life: 3000,
      });

      setSelectedRequestService([]);
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

  const onDropDownChange = (e: DropdownChangeParams) => {
    let _userService = { ...userService };

    _userService.graveplot.block["name"] = e.value;
    _userService.graveplot.id = _userService.graveplot.block.name;
    setUserService(_userService);
    console.log(_userService.graveplot.id);

    GravePlot.getBlocks(_userService.graveplot.id)
      .then((response: any) => {
        setAllBlocks(response?.data);
        console.log(response?.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });

    setDisabled(false);
  };

  const onDropDownChange2 = (e: DropdownChangeParams) => {
    let _userService = { ...userService };

    _userService.graveplot.lot = e.value;
    _userService.graveplot.id = _userService.graveplot.lot;
    setUserService(_userService);
    console.log(_userService.graveplot.id);
  };

  const onDropDownChange3 = (e: DropdownChangeParams) => {
    let _userService = { ...userService };

    _userService.request.name = e.value;
    _userService.request.id = _userService.request.name;
    setUserService(_userService);
    console.log(_userService.request.id);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          {/* <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          /> */}
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedRequestService || !selectedRequestService.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        /> */}
      </React.Fragment>
    );
  };

  const userRequestBodyTemplate = (rowData: IUserServiceRequest) => {
    return (
      <>
        <span className="p-column-title">User Name</span>
        {/* {rowData.service.map((e) => (
          <li>{e}</li>
        ))} */}
        {rowData.user.username}
      </>
    );
  };

  const serviceBodyTemplate = (rowData: IUserServiceRequest) => {
    return (
      <>
        <span className="p-column-title">Type of Service</span>
        {rowData.service.map((e) => (
          <li>{e}</li>
        ))}
      </>
    );
  };

  const gravePlotBodyTemplate = (rowData: IUserServiceRequest) => {
    return (
      <>
        <span className="p-column-title">Grave Plot</span>
        Block {rowData.graveplot.block.name} Lot {rowData.graveplot.lot}
      </>
    );
  };

  const requestBodyTemplate = (rowData: IUserServiceRequest) => {
    return (
      <>
        <span className="p-column-title">Request Status</span>
        {rowData.request.name}
      </>
    );
  };

  const formatDate = (value: Date) => {
    return value.toLocaleString();
  };

  const updateDateTemplate = (rowData: IUserServiceRequest) => {
    let date = new Date(rowData.updatedAt);
    return (
      <>
        <span className="p-column-title">Updated Date</span>
        {formatDate(date)}
      </>
    );
  };

  const createdDateTemplate = (rowData: IUserServiceRequest) => {
    let date = new Date(rowData.createdAt);
    return (
      <>
        <span className="p-column-title">Created Date</span>
        {formatDate(date)}
      </>
    );
  };

  const actionBodyTemplate = (rowData: IUserServiceRequest) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editRequestStatus(rowData)}
          placeholder="Top"
          tooltip="Edit Request Status"
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
        <h5 className="m-0">Your Recent Service Requests</h5>

        {/* <span className="block mt-2 md:mt-0 p-input-icon-left">
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
        </span> */}
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

  const requestFooterDialog = (
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
          value={allUserRequest}
          selection={selectedRequestService}
          onSelectionChange={(e) => setSelectedRequestService(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          globalFilter={globalFilterValue}
          header={header}
          responsiveLayout="scroll"
          emptyMessage="No service requests found 👤"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="username"
            header="Username"
            filter
            filterPlaceholder="Search by username..."
            body={userRequestBodyTemplate}
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="service"
            header="Service"
            body={serviceBodyTemplate}
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="graveplot"
            header="Grave Plot"
            body={gravePlotBodyTemplate}
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="request"
            header="Request Status"
            body={requestBodyTemplate}
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="new_updates"
            header="Date of Service Update"
            body={updateDateTemplate}
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="requested_date"
            header="Date of Requested Service"
            body={createdDateTemplate}
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={userServiceDialog}
        style={{ width: "450px" }}
        header="Request a Service"
        modal
        maximizable
        className="p-fluid"
        footer={userDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label>Services</label>
          <MultiSelect
            value={selectedService}
            options={service}
            onChange={(e) => setSelectedService(e.value)}
            placeholder="Select a Service"
            maxSelectedLabels={3}
            optionLabel="name"
            optionValue="name"
            display="chip"
          />
        </div>

        <div className="field">
          <label>Grave Block</label>

          <Dropdown
            optionValue={"id"}
            value={userService.graveplot.block.name}
            options={blocks}
            onChange={onDropDownChange}
            placeholder="Select a Grave Plot"
            optionLabel={"name"}
          />
        </div>

        {disabled ? (
          <div className="field">
            <label>Grave Lot</label>

            <Dropdown
              optionValue={"id"}
              value={userService.graveplot.lot}
              options={allBlocks}
              onChange={onDropDownChange2}
              placeholder="Select a Grave Plot"
              optionLabel={"lot"}
              disabled={true}
            />
          </div>
        ) : (
          <div className="field">
            <label>Grave Lot</label>

            <Dropdown
              optionValue={"id"}
              value={userService.graveplot.lot}
              options={allBlocks}
              onChange={onDropDownChange2}
              placeholder="Select a Grave Plot"
              optionLabel={"lot"}
            />
          </div>
        )}
      </Dialog>

      <Dialog
        visible={requestDialog}
        style={{ width: "450px" }}
        header="Request Status"
        modal
        maximizable
        className="p-fluid"
        footer={requestFooterDialog}
        onHide={hideDialog}
      >
        <div className="field">
          <label>Change Request Status</label>

          <Dropdown
            optionValue={"id"}
            value={userService.request.name}
            options={request}
            onChange={onDropDownChange3}
            placeholder="Select a Request"
            optionLabel={"name"}
          />
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
          {userService && (
            <span>
              Are you sure you want to delete or cancel this service request?
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
          {userService && (
            <span>
              Are you sure you want to delete or cancel the selected service
              request?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ServiceRequestTable;
