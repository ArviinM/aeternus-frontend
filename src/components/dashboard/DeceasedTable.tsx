import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar, CalendarChangeParams } from "primereact/calendar";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import Deceased from "../../services/deceased.service";
import GravePlot from "../../services/graveplot.service";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import "./dashboard.scss";

import IDeceasedData from "../../types/deceased.type";
import IGravePlotData from "../../types/graveplot.type";
import { InputTextarea } from "primereact/inputtextarea";

import { FilterMatchMode, FilterOperator } from "primereact";
import { TabTitle } from "../../utils/GenerateFunctions";

interface IFilter {
  global?: any;
  name?: any;
  birth_date?: any;
  death_date?: any;
}

const DeceasedTable: React.FC = () => {
  TabTitle("Aeternus – Deceased Table");
  let emptyDeceased: IDeceasedData = {
    id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    profile_picture: "",
    birth_date: undefined,
    death_date: undefined,
    obituary: "",
    grave_plot: {
      _id: "",
      block: { id: "", name: "" },
      lot: "",
      status: { id: "", name: "" },
      southWest: ["", ""],
      northEast: ["", ""],
      lot_owner: {
        id: "",
        first_name: "",
        last_name: "",
        username: "",
        address: "",
        contact_no: "",
        email: "",
      },
    },
  };

  const blocks = [
    { name: "1", id: "63c7ad8efb9fe79294b6287c" },
    { name: "2", id: "63c7ad8efb9fe79294b6287d" },
    { name: "3", id: "63c7ad8efb9fe79294b6287e" },
    { name: "4", id: "63c7ad8efb9fe79294b6287f" },
  ];

  const [allDeceased, setAllDeceased] = useState<Array<IDeceasedData>>([]);
  const [allGravePlots, setAllGravePlots] = useState<Array<IGravePlotData>>([]);
  const [lotOwnerDialog, setLotOwnerDialog] = useState(false);
  const [allBlocks, setAllBlocks] = useState<Array<any>>([]);

  const [disabled, setDisabled] = useState(true);

  const [deceased, setDeceased] = useState<IDeceasedData>(emptyDeceased);
  const [oldDeceased, oldSetDeceased] = useState<IDeceasedData>(emptyDeceased);
  const [obituaryDialog, setObituaryDialog] = useState(false);
  const [deceasedDialog, setDeceasedDialog] = useState(false);
  const [deceasedProfileDialog, setDeceasedProfileDialog] = useState(false);

  const [deleteDeceasedDialog, setDeleteDeceasedDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [selectedDeceased, setSelectedDeceased] = useState<IDeceasedData[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState<IFilter | null>(null);
  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  const [showDeceasedPhoto, setShowDeceasedPhoto] = useState(false);
  const [showDeceasedPhoto2, setShowDeceasedPhoto2] = useState(false);

  const retrieveAllDeceased = () => {
    Deceased.getAllDeceased()
      .then((response: any) => {
        setAllDeceased(response?.data);
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

  const checkAvailable = () => {
    GravePlot.checkAllAvailable()
      .then((response: any) => {
        //setAllGravePlots(response?.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const checkLotOwner = () => {
    GravePlot.checkLotOwnerReserved()
      .then((response: any) => {
        //setAllGravePlots(response?.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveAllDeceased();
    retrieveAllGravePlots();
    checkAvailable();
    checkLotOwner();
    initFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setShowDeceasedPhoto(false);
    setShowDeceasedPhoto2(true);
    setDeceased(emptyDeceased);
    setSubmitted(false);
    setDeceasedDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setDeceasedDialog(false);
    setObituaryDialog(false);
    setDeceasedProfileDialog(false);
    setDeceased(emptyDeceased);
    setLotOwnerDialog(false);
  };

  const hideDeleteDeceasedDialog = () => {
    setDeleteDeceasedDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveDeceased = () => {
    setSubmitted(true);

    if (deceased.first_name.trim()) {
      let _deceased = { ...deceased };

      if (_deceased.id) {
        Deceased.updateDeceased(_deceased.id, _deceased)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Deceased Updated",
              life: 3000,
            });
            retrieveAllDeceased();
            checkAvailable();
            checkLotOwner();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error updating the deceased information.",
              life: 3000,
            });
          });
      } else {
        let formData = new FormData();
        formData.append("first_name", _deceased.first_name);
        formData.append("middle_name", _deceased.middle_name);
        formData.append("last_name", _deceased.last_name);
        formData.append("profile_picture", _deceased.profile_picture);
        formData.append("birth_date", _deceased.birth_date);
        formData.append("death_date", _deceased.death_date);
        formData.append("obituary", _deceased.obituary);
        formData.append("grave_plot", _deceased.grave_plot._id);

        Deceased.createDeceased(formData)
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Deceased Created",
              life: 3000,
            });
            retrieveAllDeceased();
            checkAvailable();
            checkLotOwner();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error creating the deceased information.",
              life: 3000,
            });
          });
      }

      setDeceasedDialog(false);
      setDeceased(emptyDeceased);
    }
  };

  const saveDeceasedProfilePicture = () => {
    setSubmitted(true);

    let _deceased = { ...deceased };

    if (deceased.id) {
      let formData = new FormData();
      formData.append("profile_picture", _deceased.profile_picture);

      Deceased.updateDeceasedPhoto(deceased.id, formData)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Deceased Updated",
            life: 3000,
          });
          retrieveAllDeceased();
          checkAvailable();
          checkLotOwner();
        })
        .catch((e) => {
          console.log(e);
          toast.current.show({
            severity: "error",
            summary: "Error!",
            detail: "There is an error updating the deceased information.",
            life: 3000,
          });
        });
    }
    setDeceasedProfileDialog(false);
    setDeceased(emptyDeceased);
  };

  const viewObituary = (obituary: IDeceasedData) => {
    setDeceased({ ...obituary });
    setObituaryDialog(true);
  };

  const viewLotOwner = (deceased: IDeceasedData) => {
    setDeceased({ ...deceased });
    setLotOwnerDialog(true);
  };

  const editDeceased = (deceased: IDeceasedData) => {
    setShowDeceasedPhoto(true);
    setShowDeceasedPhoto2(false);
    setDeceased({ ...deceased });
    setDeceasedDialog(true);
    oldSetDeceased({ ...deceased });
  };

  const editDeceasedProfilePicture = (deceased: IDeceasedData) => {
    setDeceased({ ...deceased });
    setDeceasedProfileDialog(true);
  };

  const confirmDeleteDeceased = (deceased: IDeceasedData) => {
    setDeceased(deceased);
    setDeleteDeceasedDialog(true);
  };

  const deleteDeceased = () => {
    let _deceased = { ...deceased };

    if (deceased.id) {
      Deceased.deleteOneDeceased(deceased.id)
        .then((response) => {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Deceased deleted",
            life: 3000,
          });
          retrieveAllDeceased();
          checkAvailable();
          checkLotOwner();
        })
        .catch((e) => {
          console.log(e);
          toast.current.show({
            severity: "error",
            summary: "Error!",
            detail: "There is an error deleting the deceased information.",
            life: 3000,
          });
        });
    }

    retrieveAllDeceased();
    setDeceased(_deceased);
    setDeleteDeceasedDialog(false);
    setDeceased(emptyDeceased);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedDeceased = () => {
    let index: any[] = [];
    for (let i = 0; i < selectedDeceased.length; i++) {
      index.push(selectedDeceased[i].id);
    }

    setDeleteProductsDialog(false);

    if (index) {
      index.forEach((e) => {
        Deceased.deleteOneDeceased(e)
          .then((response) => {
            console.log(response?.data);
            retrieveAllDeceased();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error deleting the deceased information.",
              life: 3000,
            });
          });
      });

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Deceased deleted",
        life: 3000,
      });
    }
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      birth_date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      death_date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
    });
    setGlobalFilterValue("");
    retrieveAllDeceased();
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
    let _deceased = { ...deceased };
    // @ts-ignore
    _deceased[`${name}`] = val;
    setDeceased(_deceased);
    console.log(_deceased);
  };

  const onFileChange = (e: any) => {
    let _deceased = { ...deceased };
    _deceased["profile_picture"] = e.target.files[0];
    setDeceased(_deceased);
  };

  const onCalendarBirthChange = (e: CalendarChangeParams) => {
    let _deceased = { ...deceased };
    _deceased["birth_date"] = e.value;
    setDeceased(_deceased);
  };

  const onCalendarDeathChange = (e: CalendarChangeParams) => {
    let _deceased = { ...deceased };
    _deceased["death_date"] = e.value;
    setDeceased(_deceased);
  };

  const onDropDownChange = (e: DropdownChangeParams) => {
    let _deceased = { ...deceased };

    _deceased.grave_plot.block["name"] = e.value;
    _deceased.grave_plot._id = _deceased.grave_plot.block.name;
    setDeceased(_deceased);
    console.log(_deceased.grave_plot._id);

    GravePlot.getBlocks(_deceased.grave_plot._id)
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
    let _deceased = { ...deceased };

    _deceased.grave_plot.lot = e.value;
    _deceased.grave_plot._id = _deceased.grave_plot.lot;
    setDeceased(_deceased);
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
            disabled={!selectedDeceased || !selectedDeceased.length}
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

  const firstNameBodyTemplate = (rowData: IDeceasedData) => {
    return (
      <>
        <span className="p-column-title">First Name</span>
        {rowData.first_name}
      </>
    );
  };
  const middleNameBodyTemplate = (rowData: IDeceasedData) => {
    return (
      <>
        <span className="p-column-title">Middle Name</span>
        {rowData.middle_name}
      </>
    );
  };
  const lastNameBodyTemplate = (rowData: IDeceasedData) => {
    return (
      <>
        <span className="p-column-title">Last Name</span>
        {rowData.last_name}
      </>
    );
  };

  const imageBodyTemplate = (rowData: IDeceasedData) => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <img
          src={rowData.profile_picture}
          alt={rowData.profile_picture}
          className="shadow-2"
          width="100"
        />
      </>
    );
  };

  const lotOwnerTemplate = (rowData: IDeceasedData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-info"
          className="p-button-rounded p-button-primary"
          onClick={() => viewLotOwner(rowData)}
          tooltip="Open lot owner information"
        />
      </div>
    );
  };

  const formatDate = (value: Date) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const birthDateTemplate = (rowData: IDeceasedData) => {
    let date = new Date(rowData.birth_date);
    return (
      <>
        <span className="p-column-title">Birth Date</span>
        {formatDate(date)}
      </>
    );
  };

  const deathDateTemplate = (rowData: IDeceasedData) => {
    let date = new Date(rowData.death_date);
    return (
      <>
        <span className="p-column-title">Death Date</span>
        {formatDate(date)}
      </>
    );
  };

  const graveBlockTemplate = (rowData: IDeceasedData) => {
    return <>{rowData.grave_plot.block.name}</>;
  };

  const graveLotTemplate = (rowData: IDeceasedData) => {
    return <>{rowData.grave_plot.lot}</>;
  };

  const obituaryTemplate = (rowData: IDeceasedData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-book"
          className="p-button-rounded p-button-primary"
          onClick={() => viewObituary(rowData)}
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData: IDeceasedData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => {
            oldSetDeceased(rowData);
            editDeceased(rowData);
          }}
          placeholder="Top"
          tooltip="Edit deceased detail information"
        />
        <Button
          icon="pi pi-image"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => editDeceasedProfilePicture(rowData)}
          placeholder="Top"
          tooltip="Edit deceased profile image"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteDeceased(rowData)}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h5 className="m-0">Manage Deceased Information</h5>

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

  const deceasedDialogFooter = (
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
        onClick={saveDeceased}
      />
    </>
  );

  const deceasedDialogProfilePictureFooter = (
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
        onClick={saveDeceasedProfilePicture}
      />
    </>
  );

  const deleteDeceasedDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDeceasedDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteDeceased}
      />
    </>
  );

  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedDeceased}
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
          value={allDeceased}
          selection={selectedDeceased}
          onSelectionChange={(e) => setSelectedDeceased(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} deceased"
          globalFilter={globalFilterValue}
          header={header}
          responsiveLayout="scroll"
          emptyMessage="No deceased found 🪦"
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
            filterPlaceholder="Search by first name"
            body={firstNameBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="middle_name"
            header="Middle Name"
            filter
            filterPlaceholder="Search by middle name"
            body={middleNameBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="last_name"
            header="Last Name"
            filter
            filterPlaceholder="Search by last name"
            body={lastNameBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="image"
            header="Image"
            exportable={false}
            body={imageBodyTemplate}
          ></Column>
          <Column
            field="birth_date"
            header="Birth Date"
            filterField="birth_date"
            style={{ minWidth: "3rem" }}
            body={birthDateTemplate}
          ></Column>
          <Column
            field="death_date"
            header="Death Date"
            filterField="death_date"
            style={{ minWidth: "3rem" }}
            body={deathDateTemplate}
          ></Column>
          <Column
            field="block.name"
            header="Grave Block"
            exportable={false}
            style={{ minWidth: "2rem" }}
            body={graveBlockTemplate}
          ></Column>
          <Column
            field="lot"
            header="Grave Lot"
            exportable={false}
            style={{ minWidth: "2rem" }}
            body={graveLotTemplate}
          ></Column>
          <Column
            field="openLotOwner"
            header="Lot Owner"
            exportable={false}
            style={{ minWidth: "2rem" }}
            body={lotOwnerTemplate}
          ></Column>
          <Column
            field="obituary"
            header="Obituary"
            style={{ minWidth: "5rem" }}
            body={obituaryTemplate}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={obituaryDialog}
        style={{ width: "600px" }}
        header="Obituary"
        modal
        maximizable
        className="p-fluid"
        onHide={hideDialog}
      >
        <p className="whitespace-pre-line">{deceased.obituary}</p>
      </Dialog>

      <Dialog
        visible={lotOwnerDialog}
        style={{ width: "600px" }}
        header="Lot Owner Details"
        modal
        maximizable
        className="p-fluid"
        onHide={hideDialog}
      >
        <p className="whitespace-pre-line">
          <span className="font-bold">Owner:</span>{" "}
          {deceased.grave_plot.lot_owner.first_name}{" "}
          {deceased.grave_plot.lot_owner.last_name}
        </p>
        <p className="whitespace-pre-line">
          <span className="font-bold">Username:</span>{" "}
          {deceased.grave_plot.lot_owner.username}
        </p>
        <p className="whitespace-pre-line">
          <span className="font-bold">Contact Number:</span>{" "}
          {deceased.grave_plot.lot_owner.contact_no}
        </p>
        <p className="whitespace-pre-line">
          <span className="font-bold">Email:</span>{" "}
          {deceased.grave_plot.lot_owner.email}
        </p>
        <p className="whitespace-pre-line">
          <span className="font-bold">Address:</span>{" "}
          {deceased.grave_plot.lot_owner.address}
        </p>
      </Dialog>

      <Dialog
        visible={deceasedProfileDialog}
        style={{ width: "450px" }}
        header="Deceased Photo"
        modal
        maximizable
        className="p-fluid"
        footer={deceasedDialogProfilePictureFooter}
        onHide={hideDialog}
      >
        <input
          className="p-button block w-full"
          type="file"
          name="profile_picture"
          id="profile_picture"
          // value={gravePlotPhoto}
          onChange={onFileChange}
          accept="image/*"
        />
      </Dialog>

      <Dialog
        visible={deceasedDialog}
        style={{ width: "450px" }}
        header="Deceased Details"
        modal
        maximizable
        className="p-fluid"
        footer={deceasedDialogFooter}
        onHide={hideDialog}
      >
        {showDeceasedPhoto && (
          <img
            src={deceased.profile_picture}
            alt={deceased.profile_picture}
            width="150"
            className="mt-0 mx-auto mb-5 block shadow-2"
          />
        )}
        {showDeceasedPhoto2 && (
          <input
            className="p-button block w-full text-base "
            type="file"
            name="photoImg"
            id="photoImg"
            // value={gravePlotPhoto}
            onChange={onFileChange}
            accept="image/*"
            required
          />
        )}

        <div className="field col">
          <label htmlFor="name">First Name</label>
          <InputText
            id="First Name"
            value={deceased.first_name}
            onChange={(e) => onInputChange(e, "first_name")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !deceased.first_name,
            })}
          />
          {submitted && !deceased.first_name && (
            <small className="p-error">First Name is required.</small>
          )}
        </div>
        <div className="field col">
          <label htmlFor="name">Middle Name </label>
          <InputText
            id="Middle Name"
            value={deceased.middle_name}
            onChange={(e) => onInputChange(e, "middle_name")}
            autoFocus
            className={classNames({
              "p-invalid": submitted && !deceased.middle_name,
            })}
          />
        </div>
        <div className="field col">
          <label htmlFor="name">Last Name</label>
          <InputText
            id="Last Name"
            value={deceased.last_name}
            onChange={(e) => onInputChange(e, "last_name")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !deceased.last_name,
            })}
          />
          {submitted && !deceased.last_name && (
            <small className="p-error">Last Name is required.</small>
          )}
        </div>
        <div className="field">
          <label>Birth Date</label>
          <Calendar
            id="icon"
            dateFormat="MM dd, yy"
            value={new Date(deceased.birth_date)}
            onChange={onCalendarBirthChange}
            showIcon
            required
            className={classNames({
              "p-invalid": submitted && !deceased.birth_date,
            })}
          />
        </div>
        <div className="field">
          <label>Death Date</label>
          <Calendar
            id="icon"
            dateFormat="MM dd, yy"
            value={new Date(deceased.death_date)}
            onChange={onCalendarDeathChange}
            showIcon
            required
            className={classNames({
              "p-invalid": submitted && !deceased.death_date,
            })}
          />
        </div>
        <div className="field">
          <label>Grave Block</label>

          <Dropdown
            optionValue={"id"}
            value={deceased.grave_plot.block.name}
            options={blocks}
            onChange={onDropDownChange}
            placeholder="Select a Grave Plot"
            optionLabel={"name"}
            required
            className={classNames({
              "p-invalid": submitted && !deceased.grave_plot.block.name,
            })}
          />
        </div>
        {disabled ? (
          <div className="field">
            <label>Grave Lot</label>

            <Dropdown
              optionValue={"id"}
              value={deceased.grave_plot.lot}
              options={allBlocks}
              onChange={onDropDownChange2}
              placeholder="Select a Grave Plot"
              optionLabel={"lot"}
              disabled={true}
              required
              className={classNames({
                "p-invalid": submitted && !deceased.grave_plot.lot,
              })}
            />
          </div>
        ) : (
          <div className="field">
            <label>Grave Lot</label>

            <Dropdown
              optionValue={"id"}
              value={deceased.grave_plot.lot}
              options={allBlocks}
              onChange={onDropDownChange2}
              placeholder="Select a Grave Plot"
              optionLabel={"lot"}
              required
              className={classNames({
                "p-invalid": submitted && !deceased.grave_plot.lot,
              })}
            />
          </div>
        )}

        <div className="field">
          <label htmlFor="description">Obituary</label>
          <InputTextarea
            id="Obituary"
            value={deceased.obituary}
            onChange={(e: any) => onInputChange(e, "obituary")}
            required
            rows={20}
            cols={20}
            className={classNames({
              "p-invalid": submitted && !deceased.obituary,
            })}
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteDeceasedDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDeceasedDialogFooter}
        onHide={hideDeleteDeceasedDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {deceased && (
            <span>
              Are you sure you want to delete{" "}
              <b>
                {deceased.first_name} {deceased.last_name}
              </b>
              ?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {deceased && (
            <span>Are you sure you want to delete the selected deceased?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default DeceasedTable;
