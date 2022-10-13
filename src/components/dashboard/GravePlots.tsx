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

import { FilterMatchMode } from "primereact";
import { TabTitle } from "../../utils/GenerateFunctions";
import GraveShowerModal from "../map/GraveShowerModal";

interface IFilter {
  global?: any;
  name?: any;
}

const GravePlots: React.FC = () => {
  TabTitle("Aeternus – Grave Plots Table");
  let emptyGravePlot: IGravePlotData = {
    id: "",
    lot_address: "",
    status: { id: "", name: "" },
    southWest: ["", ""],
    northEast: ["", ""],
  };

  const [allDeceased, setAllDeceased] = useState<Array<IDeceasedData>>([]);
  const [allGravePlots, setAllGravePlots] = useState<Array<IGravePlotData>>([]);

  const [gravePlot, setGravePlot] = useState<IGravePlotData>(emptyGravePlot);
  const [obituaryDialog, setObituaryDialog] = useState(false);
  const [graveMapDialog, setGraveMapDialog] = useState(false);
  const [gravePlotDialog, setGravePlotDialog] = useState(false);
  const [deceasedProfileDialog, setDeceasedProfileDialog] = useState(false);

  const [deleteDeceasedDialog, setDeleteDeceasedDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [selectedGravePlot, setSelectedGravePlot] = useState<IGravePlotData[]>(
    []
  );
  const [submitted, setSubmitted] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState<IFilter | null>(null);
  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  const [showDeceasedPhoto, setShowDeceasedPhoto] = useState(false);
  const [showDeceasedPhoto2, setShowDeceasedPhoto2] = useState(false);

  const statuses = [
    { name: "Available", id: "6320c2735dcc565b5c2ab179" },
    { name: "Reserved", id: "6320c2735dcc565b5c2ab17a" },
    { name: "Occupied", id: "6320c2735dcc565b5c2ab17b" },
  ];

  const retrieveAllGravePlots = () => {
    GravePlot.getAll()
      .then((response: any) => {
        setAllGravePlots(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveAllGravePlots();
    initFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setShowDeceasedPhoto(false);
    setShowDeceasedPhoto2(true);
    setGravePlot(emptyGravePlot);
    setSubmitted(false);
    setGravePlotDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setGravePlotDialog(false);
    setGraveMapDialog(false);
    setDeceasedProfileDialog(false);
  };

  const hideDeleteDeceasedDialog = () => {
    setDeleteDeceasedDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  // const saveDeceased = () => {
  //   setSubmitted(true);

  //   if (deceased.first_name.trim()) {
  //     let _deceased = { ...deceased };
  //     console.log(_deceased.id);
  //     console.log(_deceased);

  //     if (_deceased.id) {
  //       Deceased.updateDeceased(_deceased.id, _deceased)
  //         .then((response) => {
  //           console.log(response.data);
  //           toast.current.show({
  //             severity: "success",
  //             summary: "Successful",
  //             detail: "Deceased Updated",
  //             life: 3000,
  //           });
  //           retrieveAllDeceased();
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //           toast.current.show({
  //             severity: "error",
  //             summary: "Error!",
  //             detail: "There is an error updating the deceased information.",
  //             life: 3000,
  //           });
  //         });
  //     } else {
  //       let formData = new FormData();
  //       formData.append("first_name", _deceased.first_name);
  //       formData.append("middle_name", _deceased.middle_name);
  //       formData.append("last_name", _deceased.last_name);
  //       formData.append("profile_picture", _deceased.profile_picture);
  //       formData.append("birth_date", _deceased.birth_date);
  //       formData.append("death_date", _deceased.death_date);
  //       formData.append("obituary", _deceased.obituary);
  //       formData.append("grave_plot", _deceased.grave_plot._id);

  //       Deceased.createDeceased(formData)
  //         .then((response) => {
  //           console.log(response.data);
  //           toast.current.show({
  //             severity: "success",
  //             summary: "Successful",
  //             detail: "Deceased Created",
  //             life: 3000,
  //           });
  //           retrieveAllDeceased();
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //           toast.current.show({
  //             severity: "error",
  //             summary: "Error!",
  //             detail: "There is an error creating the deceased information.",
  //             life: 3000,
  //           });
  //         });
  //     }

  //     setGravePlotDialog(false);
  //     setGravePlot(emptyGravePlot);
  //   }
  // };

  const editGravePlot = (graveplot: IGravePlotData) => {
    setGravePlot({ ...graveplot });
    setGravePlotDialog(true);
  };

  const viewGravePlotLocation = (graveplot: IGravePlotData) => {
    setGravePlot({ ...graveplot });
    setGraveMapDialog(true);
  };

  const confirmDeleteGravePlot = (graveplot: IGravePlotData) => {
    setGravePlot(graveplot);
    setDeleteDeceasedDialog(true);
  };

  const deleteGravePlot = () => {
    let _graveplot = { ...gravePlot };

    if (_graveplot.id) {
      GravePlot.remove(_graveplot.id)
        .then((response) => {
          console.log(response.data);
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Grave Plot deleted",
            life: 3000,
          });
          retrieveAllGravePlots();
        })
        .catch((e) => {
          console.log(e);
          toast.current.show({
            severity: "error",
            summary: "Error!",
            detail: "There is an error deleting the grave plot.",
            life: 3000,
          });
        });
    }

    retrieveAllGravePlots();
    setGravePlot(_graveplot);
    setDeleteDeceasedDialog(false);
    setGravePlot(emptyGravePlot);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedGravePlot = () => {
    let index: any[] = [];
    for (let i = 0; i < selectedGravePlot.length; i++) {
      index.push(selectedGravePlot[i].id);
    }

    setDeleteProductsDialog(false);

    if (index) {
      index.forEach((e) => {
        GravePlot.remove(e)
          .then((response) => {
            console.log(response.data);
            retrieveAllGravePlots();
          })
          .catch((e) => {
            console.log(e);
            toast.current.show({
              severity: "error",
              summary: "Error!",
              detail: "There is an error deleting the grave plot.",
              life: 3000,
            });
          });
      });

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Grave Plot deleted",
        life: 3000,
      });
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
    console.log(_filters);
    console.log(value);
  };

  const onInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _graveplots = { ...gravePlot };
    // @ts-ignore
    _graveplots[`${name}`] = val;
    setGravePlot(_graveplots);
    console.log(_graveplots);
  };

  const onDropDownChange = (e: DropdownChangeParams) => {
    let _graveplot = { ...gravePlot };

    _graveplot.status["name"] = e.value;
    _graveplot.status.id = _graveplot.status.name;
    setGravePlot(_graveplot);
    console.log(_graveplot.status.id);
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
            disabled={!selectedGravePlot || !selectedGravePlot.length}
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

  const lotAddressTemplate = (rowData: IGravePlotData) => {
    return (
      <>
        <span className="p-column-title">Lot Address</span>
        {rowData.lot_address}
      </>
    );
  };
  const statusBodyTemplate = (rowData: IGravePlotData) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span className="capitalize">{rowData.status.name}</span>
      </>
    );
  };
  // const southWestBodyTemplate = (rowData: IGravePlotData) => {
  //   return (
  //     <>
  //       <span className="p-column-title">South West</span>
  //       {rowData.southWest}
  //     </>
  //   );
  // };
  // const northEastBodyTemplate = (rowData: IGravePlotData) => {
  //   return (
  //     <>
  //       <span className="p-column-title">North East</span>
  //       {rowData.northEast}
  //     </>
  //   );
  // };

  const openMapTemplate = (rowData: IGravePlotData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-map"
          className="p-button-rounded p-button-primary"
          onClick={() => viewGravePlotLocation(rowData)}
          tooltip="Open grave plot location"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData: IGravePlotData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editGravePlot(rowData)}
          placeholder="Top"
          tooltip="Edit deceased detail information"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteGravePlot(rowData)}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h5 className="m-0">Manage Deceased Information</h5>

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

  const deceasedDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      {/* <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveDeceased}
      /> */}
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
        onClick={deleteGravePlot}
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
        onClick={deleteSelectedGravePlot}
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
          value={allGravePlots}
          selection={selectedGravePlot}
          onSelectionChange={(e) => setSelectedGravePlot(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} deceased"
          globalFilter={globalFilterValue}
          header={header}
          responsiveLayout="scroll"
          emptyMessage="No grave plots found 🪦"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="lot_address"
            header="Lot Address"
            body={lotAddressTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          {/* <Column
            field="southWest"
            header="South West"
            body={southWestBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            field="northEast"
            header="North East"
            body={northEastBodyTemplate}
            sortable
            style={{ minWidth: "6rem" }}
          ></Column> */}
          <Column
            field="openMap"
            header="Open Lot"
            sortable
            style={{ minWidth: "5rem" }}
            body={openMapTemplate}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={gravePlotDialog}
        style={{ width: "450px" }}
        header="Deceased Details"
        modal
        maximizable
        className="p-fluid"
        footer={deceasedDialogFooter}
        onHide={hideDialog}
      >
        <div className="field col">
          <label htmlFor="name">Lot Address</label>
          <InputText
            id="Lot Address"
            value={gravePlot.lot_address}
            onChange={(e) => onInputChange(e, "lot_address")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !gravePlot.lot_address,
            })}
          />
          {submitted && !gravePlot.lot_address && (
            <small className="p-error">Lot Address is required.</small>
          )}
        </div>
        <div className="field col">
          <label htmlFor="name">Status</label>
          <Dropdown
            optionValue="id"
            value={gravePlot.status.name}
            options={statuses}
            onChange={onDropDownChange}
            placeholder="Select Status"
            optionLabel="name"
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
          {gravePlot && (
            <span>
              Are you sure you want to delete <b>{gravePlot.lot_address}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={graveMapDialog}
        style={{ width: "600px" }}
        header="Grave Map"
        modal
        maximizable
        className="p-fluid"
        onHide={hideDialog}
      >
        <GraveShowerModal
          southWest={gravePlot.southWest}
          northEast={gravePlot.northEast}
          name={gravePlot.lot_address}
        />
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
          {gravePlot && (
            <span>
              Are you sure you want to delete the selected grave plot?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default GravePlots;
