import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";

import "./dashboard.scss";
import IGravePlotData from "../../types/graveplot.type";

import { FilterMatchMode } from "primereact";
import { TabTitle } from "../../utils/GenerateFunctions";
import UserService from "../../services/auth.service";
import GravePlot from "../../services/graveplot.service";
import UserServiceRequest from "../../services/service_request.service";
import IUserServiceRequest from "../../types/service_request.type";

interface IFilter {
  global?: any;
  name?: any;
}

const UserServiceRequestTable: React.FC = () => {
  TabTitle("Aeternus – User Service Request Table");

  let currentUser = UserService.getCurrentUser();

  let emptyUserReq: IUserServiceRequest = {
    id: "",
    service: [],
    user: { id: "", username: "" },
    request: { id: "", name: "" },
    graveplot: { id: "", block: { id: "", name: "" }, lot: "" },
    remarks: "",
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
  const [allGravePlots, setAllGravePlots] = useState<Array<IGravePlotData>>([]);

  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteSelectedUserDialog, setSelectedUserDialog] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState<IFilter | null>(null);
  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  const [allBlocks, setAllBlocks] = useState<Array<any>>([]);
  const [disabled, setDisabled] = useState(true);
  const [selectedService, setSelectedService] = useState<Array<string>>([]);
  const [selectedGrave, setSelectedGrave] = useState<any>(null);

  const [remarksDialog, setRemarksDialog] = useState(false);

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

  const retrieveAllUserServiceRequest = () => {
    const getCurrentUser = UserService.getCurrentUser();

    UserServiceRequest.getAllUserServiceRequest(getCurrentUser.id)
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
    retrieveAllUserServiceRequest();
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
    setRemarksDialog(false);
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
      //let _userService = { ...userService };

      let _userService = {
        service: selectedService,
        user: { id: currentUser.id },
        request: { id: "63ce783984ffd5d19cdb89de" },
        graveplot: { id: userService.graveplot },
        remarks: "",
      };

      UserServiceRequest.createUserServiceRequest(_userService)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "User Service Created",
            life: 3000,
          });
          retrieveAllUserServiceRequest();
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
      setUserServiceDialog(false);
      setUserService(emptyUserReq);
      setSelectedGrave(null);
      setSelectedRequestService([]);
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
          retrieveAllUserServiceRequest();
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

    retrieveAllUserServiceRequest();
    setDeleteUserDialog(false);
    setUserService(emptyUserReq);
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
            retrieveAllUserServiceRequest();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error deleting the Service Request.",
              life: 3000,
            });
          });
      });

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Service Request deleted!",
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

  const onDropDownChange3 = (e: DropdownChangeParams) => {
    let _userService = { ...userService };

    _userService.graveplot = e.value;
    setSelectedGrave(e.value);

    setUserService(_userService);
    console.log(_userService);
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

  const viewRemarksDialog = (obituary: IUserServiceRequest) => {
    setUserService({ ...obituary });
    setRemarksDialog(true);
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

  const remarksTemplate = (rowData: IUserServiceRequest) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-book"
          className="p-button-rounded p-button-primary"
          onClick={() => viewRemarksDialog(rowData)}
        />
      </div>
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
        {/* <Button
          icon="pi pi-user-edit"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editUserServiceRequest(rowData)}
          placeholder="Top"
          tooltip="Edit user information"
        /> */}

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
            field="remarks"
            header="Remarks"
            style={{ minWidth: "5rem" }}
            body={remarksTemplate}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={remarksDialog}
        style={{ width: "600px" }}
        header="Remarks"
        modal
        maximizable
        className="p-fluid"
        onHide={hideDialog}
      >
        <p className="whitespace-pre-line">{userService.remarks}</p>
      </Dialog>

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
          <label>Owned Grave</label>
          <Dropdown
            optionValue={"id"}
            value={selectedGrave}
            options={currentUser.grave_name}
            onChange={onDropDownChange3}
            placeholder="Select a Grave Plot"
            optionLabel={"name"}
          />
        </div>

        {/* <div className="field">
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
        )} */}
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

export default UserServiceRequestTable;
